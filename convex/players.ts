import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

    const roles = ["early-career", "mid-career", "senior"] as const;
    const role = roles[all.length % 3];

    return await ctx.db.insert("players", {
      sessionId,
      name,
      avatar,
      role,
      joinToken,
    });
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

export const assignGroups = mutation({
  args: {
    sessionId: v.id("sessions"),
    scenarioAssignments: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { sessionId, scenarioAssignments }) => {
    const players = await ctx.db
      .query("players")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    const shuffle = <T>(arr: T[]) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const early = shuffle(players.filter((p) => p.role === "early-career"));
    const mid = shuffle(players.filter((p) => p.role === "mid-career"));
    const senior = shuffle(players.filter((p) => p.role === "senior"));

    const numGroups = Math.min(early.length, mid.length, senior.length);
    const defaultScenarios = ["A", "B", "C", "D", "E"];

    for (let i = 0; i < numGroups; i++) {
      const scenarioId =
        scenarioAssignments?.[i] ?? defaultScenarios[i % defaultScenarios.length];
      await ctx.db.insert("groups", { sessionId, groupNumber: i + 1, scenarioId });
      await ctx.db.patch(early[i]._id, { groupNumber: i + 1 });
      await ctx.db.patch(mid[i]._id, { groupNumber: i + 1 });
      await ctx.db.patch(senior[i]._id, { groupNumber: i + 1 });
    }

    // Extras fill in existing groups as additional early-career
    const extras = [
      ...early.slice(numGroups),
      ...mid.slice(numGroups),
      ...senior.slice(numGroups),
    ];
    for (let i = 0; i < extras.length; i++) {
      await ctx.db.patch(extras[i]._id, { groupNumber: (i % numGroups) + 1 });
    }

    // Advance session status
    const session = await ctx.db.get(sessionId);
    if (session) await ctx.db.patch(sessionId, { status: "activity1-groups" });
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
