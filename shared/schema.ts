import { pgTable, text, serial, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'employment', 'nda', 'service', 'lease', 'llc', 'privacy', 'terms', 'will'
  title: text("title").notNull(),
  content: text("content").notNull(),
  formData: jsonb("form_data").notNull(),
  state: text("state"), // US state code
  userId: text("user_id"), // Optional - for tracking
  createdAt: timestamp("created_at").defaultNow().notNull(),
  downloadCount: integer("download_count").default(0),
});

export const documentTemplates = pgTable("document_templates", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  fields: jsonb("fields").notNull(), // JSON schema for form fields
  aiPrompt: text("ai_prompt").notNull(),
  estimatedTime: integer("estimated_time").notNull(), // in minutes
  popularity: integer("popularity").default(0),
});

export const stateRequirements = pgTable("state_requirements", {
  id: serial("id").primaryKey(),
  state: text("state").notNull(),
  documentType: text("document_type").notNull(),
  requirements: jsonb("requirements").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  readTime: integer("read_time").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  views: integer("views").default(0),
  featuredImage: text("featured_image"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  downloadCount: true,
});

export const insertDocumentTemplateSchema = createInsertSchema(documentTemplates).omit({
  id: true,
  popularity: true,
});

export const insertStateRequirementSchema = createInsertSchema(stateRequirements).omit({
  id: true,
  lastUpdated: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
  views: true,
});

// Document generation request schema
export const generateDocumentSchema = z.object({
  type: z.enum([
    'employment', 'nda', 'service', 'partnership', 'lease', 'llc', 
    'privacy', 'terms', 'contractor', 'vendor', 'consulting', 
    'purchase', 'license', 'franchise', 'distribution', 'loan'
  ]),
  state: z.string().min(2).max(2),
  formData: z.record(z.any()),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertDocumentTemplate = z.infer<typeof insertDocumentTemplateSchema>;
export type DocumentTemplate = typeof documentTemplates.$inferSelect;

export type InsertStateRequirement = z.infer<typeof insertStateRequirementSchema>;
export type StateRequirement = typeof stateRequirements.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type GenerateDocumentRequest = z.infer<typeof generateDocumentSchema>;
