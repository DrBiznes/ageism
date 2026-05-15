import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    code: v.string(),
    status: v.string(),
    round1StartTime: v.optional(v.number()),
    round2StartTime: v.optional(v.number()),
  }).index("by_code", ["code"]),

  players: defineTable({
    sessionId: v.id("sessions"),
    name: v.string(),
    avatar: v.string(),
    role: v.union(
      v.literal("early-career"),
      v.literal("mid-career"),
      v.literal("senior")
    ),
    groupNumber: v.optional(v.number()),
    joinToken: v.string(),
  })
    .index("by_session", ["sessionId"])
    .index("by_token", ["joinToken"]),

  groups: defineTable({
    sessionId: v.id("sessions"),
    groupNumber: v.number(),
    scenarioId: v.string(),
  }).index("by_session", ["sessionId"]),
});
