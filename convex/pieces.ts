import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pieces").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    source: v.string(),
    date: v.string(),
    url: v.string(),
    category: v.union(v.literal("By Me"), v.literal("About Me")),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("pieces", args);
  },
});

export const remove = mutation({
  args: { id: v.id("pieces") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("pieces"),
    title: v.string(),
    source: v.string(),
    date: v.string(),
    url: v.string(),
    category: v.union(v.literal("By Me"), v.literal("About Me")),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});
