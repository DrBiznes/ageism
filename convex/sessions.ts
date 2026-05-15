import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export const create = mutation({
  args: {},
  handler: async (ctx) => {
    let code = generateCode();
    while (
      await ctx.db
        .query("sessions")
        .withIndex("by_code", (q) => q.eq("code", code))
        .first()
    ) {
      code = generateCode();
    }
    const sessionId = await ctx.db.insert("sessions", {
      code,
      status: "lobby",
    });
    return { sessionId, code };
  },
});

export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_code", (q) => q.eq("code", code.toUpperCase()))
      .first();
  },
});

export const get = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    return await ctx.db.get(sessionId);
  },
});

export const advance = mutation({
  args: { sessionId: v.id("sessions"), status: v.string() },
  handler: async (ctx, { sessionId, status }) => {
    const patch: Record<string, unknown> = { status };
    if (status === "activity1-round1") patch.round1StartTime = Date.now();
    if (status === "activity1-round2") patch.round2StartTime = Date.now();
    await ctx.db.patch(sessionId, patch);
  },
});
