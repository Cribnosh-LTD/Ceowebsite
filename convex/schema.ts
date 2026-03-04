import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pieces: defineTable({
    title: v.string(),
    source: v.string(),
    date: v.string(),
    url: v.string(),
    category: v.union(v.literal("By Me"), v.literal("About Me")),
    description: v.string(),
    order: v.optional(v.number()),
  }),
});
