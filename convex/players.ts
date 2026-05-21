import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

const MAX_GROUPS = 5;
type Role = "early-career" | "mid-career" | "senior";
const ROLE_CYCLE: Role[] = ["early-career", "early-career", "mid-career"];

// Keep in sync with the same function in PlayerPage.tsx.
// First MAX_GROUPS joiners are seniors (each anchors a group).
// After that, roles repeat early-career, early-career, mid-career.
export function determineRole(joinerIndex: number): Role {
  if (joinerIndex < MAX_GROUPS) return "senior";
  return ROLE_CYCLE[(joinerIndex - MAX_GROUPS) % ROLE_CYCLE.length];
}

async function reassignGroups(ctx: MutationCtx, sessionId: Id<"sessions">) {
  const session = await ctx.db.get(sessionId);
  if (!session || session.status !== "lobby") return;

  const players = await ctx.db
    .query("players")
    .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
    .collect();
  players.sort((a, b) => a._creationTime - b._creationTime);

  if (players.length === 0) return;

  const seniors = players.filter((p) => p.role === "senior");
  const earlies = players.filter((p) => p.role === "early-career");
  const mids = players.filter((p) => p.role === "mid-career");

  const G = Math.min(
    MAX_GROUPS,
    Math.max(seniors.length, Math.ceil(players.length / 6), 1),
  );

  const roster: (typeof players)[] = Array.from({ length: G }, () => []);

  const pickGroup = (role: Role): number => {
    let bestIdx = 0;
    let bestRoleCount = Infinity;
    let bestSize = Infinity;
    for (let i = 0; i < G; i++) {
      const roleCount = roster[i].filter((p) => p.role === role).length;
      const size = roster[i].length;
      if (
        roleCount < bestRoleCount ||
        (roleCount === bestRoleCount && size < bestSize)
      ) {
        bestIdx = i;
        bestRoleCount = roleCount;
        bestSize = size;
      }
    }
    return bestIdx;
  };

  // Seniors: one per group first, then distribute any extras evenly.
  for (let i = 0; i < Math.min(seniors.length, G); i++) {
    roster[i].push(seniors[i]);
  }
  for (const s of seniors.slice(G)) roster[pickGroup("senior")].push(s);

  for (const e of earlies) roster[pickGroup("early-career")].push(e);
  for (const m of mids) roster[pickGroup("mid-career")].push(m);

  for (let g = 0; g < G; g++) {
    for (const p of roster[g]) {
      if (p.groupNumber !== g + 1) {
        await ctx.db.patch(p._id, { groupNumber: g + 1 });
      }
    }
  }
}

export const join = mutation({
  args: {
    sessionId: v.id("sessions"),
    name: v.string(),
    avatar: v.string(),
    joinToken: v.string(),
  },
  handler: async (ctx, { sessionId, name, avatar, joinToken }) => {
    const existing = await ctx.db
      .query("players")
      .withIndex("by_token", (q) => q.eq("joinToken", joinToken))
      .first();

    if (existing && existing.sessionId === sessionId) {
      await ctx.db.patch(existing._id, { name, avatar });
      return existing._id;
    }

    const all = await ctx.db
      .query("players")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    const role = determineRole(all.length);

    const playerId = await ctx.db.insert("players", {
      sessionId,
      name,
      avatar,
      role,
      groupNumber: 1,
      joinToken,
    });

    await reassignGroups(ctx, sessionId);

    return playerId;
  },
});

export const getByToken = query({
  args: { joinToken: v.string(), sessionId: v.optional(v.id("sessions")) },
  handler: async (ctx, { joinToken, sessionId }) => {
    const players = await ctx.db
      .query("players")
      .withIndex("by_token", (q) => q.eq("joinToken", joinToken))
      .collect();
    if (sessionId) return players.find((p) => p.sessionId === sessionId) ?? null;
    return players[0] ?? null;
  },
});

export const list = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    return await ctx.db
      .query("players")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
  },
});

export const revealGroups = mutation({
  args: {
    sessionId: v.id("sessions"),
    scenarioAssignments: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { sessionId, scenarioAssignments }) => {
    await reassignGroups(ctx, sessionId);

    const players = await ctx.db
      .query("players")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    const groupNumbers = Array.from(
      new Set(
        players
          .map((p) => p.groupNumber)
          .filter((n): n is number => n != null),
      ),
    ).sort((a, b) => a - b);

    const defaultScenarios = ["A", "B", "C", "D", "E"];

    for (let i = 0; i < groupNumbers.length; i++) {
      const scenarioId =
        scenarioAssignments?.[i] ?? defaultScenarios[i % defaultScenarios.length];
      await ctx.db.insert("groups", {
        sessionId,
        groupNumber: groupNumbers[i],
        scenarioId,
      });
    }

    await ctx.db.patch(sessionId, { status: "activity1-groups" });
  },
});

export const listGroups = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    return await ctx.db
      .query("groups")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
  },
});
