import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateDocumentSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all document templates
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getDocumentTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Get specific template
  app.get("/api/templates/:type", async (req, res) => {
    try {
      const template = await storage.getDocumentTemplate(req.params.type);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  // Generate document with AI
  app.post("/api/generate-document", async (req, res) => {
    try {
      // Check if OpenAI is available
      if (!openai) {
        return res.status(503).json({ 
          message: "OpenAI service is not available. Please contact support to enable AI document generation." 
        });
      }

      const validatedData = generateDocumentSchema.parse(req.body);
      const { type, state, formData } = validatedData;

      // Get template for this document type
      const template = await storage.getDocumentTemplate(type);
      if (!template) {
        return res.status(404).json({ message: "Document template not found" });
      }

      // Get state-specific requirements if available
      const stateRequirements = await storage.getStateRequirements(state, type);
      
      // Prepare AI prompt with form data
      let prompt = template.aiPrompt;
      Object.keys(formData).forEach(key => {
        prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), formData[key] || '');
      });
      prompt = prompt.replace(/{state}/g, state);

      // Add state-specific requirements to prompt
      if (stateRequirements) {
        prompt += `\n\nState-specific requirements for ${state}: ${JSON.stringify(stateRequirements.requirements)}`;
      }

      prompt += "\n\nGenerate a professional, legally formatted document. Include proper headers, clauses, and formatting. Return the complete document text.";

      // Call OpenAI API
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional legal document generator. Create comprehensive, well-formatted legal documents that comply with state laws and industry standards. Use proper legal language and formatting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.3
      });

      const generatedContent = response.choices[0].message.content;

      if (!generatedContent) {
        return res.status(500).json({ message: "Failed to generate document content" });
      }

      // Save document to storage
      const document = await storage.createDocument({
        type,
        title: `${template.name} - ${formData.companyName || formData.disclosingParty || formData.serviceProvider || 'Document'}`,
        content: generatedContent,
        formData,
        state: state || null,
        userId: req.headers['user-id'] as string || null
      });

      res.json({
        documentId: document.id,
        content: generatedContent,
        title: document.title
      });

    } catch (error) {
      console.error('Document generation error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to generate document" });
    }
  });

  // Get generated document
  app.get("/api/documents/:id", async (req, res) => {
    try {
      const document = await storage.getDocument(parseInt(req.params.id));
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document" });
    }
  });

  // Download document (track downloads)
  app.post("/api/documents/:id/download", async (req, res) => {
    try {
      const document = await storage.getDocument(parseInt(req.params.id));
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      await storage.updateDocumentDownloadCount(document.id);
      res.json({ message: "Download tracked successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to track download" });
    }
  });

  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const { category } = req.query;
      let posts;
      if (category) {
        posts = await storage.getBlogPostsByCategory(category as string);
      } else {
        posts = await storage.getBlogPosts();
      }
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Get specific blog post
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Increment view count
      await storage.incrementBlogPostViews(post.id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Get US states list
  app.get("/api/states", async (req, res) => {
    const states = [
      { code: 'AL', name: 'Alabama' },
      { code: 'AK', name: 'Alaska' },
      { code: 'AZ', name: 'Arizona' },
      { code: 'AR', name: 'Arkansas' },
      { code: 'CA', name: 'California' },
      { code: 'CO', name: 'Colorado' },
      { code: 'CT', name: 'Connecticut' },
      { code: 'DE', name: 'Delaware' },
      { code: 'FL', name: 'Florida' },
      { code: 'GA', name: 'Georgia' },
      { code: 'HI', name: 'Hawaii' },
      { code: 'ID', name: 'Idaho' },
      { code: 'IL', name: 'Illinois' },
      { code: 'IN', name: 'Indiana' },
      { code: 'IA', name: 'Iowa' },
      { code: 'KS', name: 'Kansas' },
      { code: 'KY', name: 'Kentucky' },
      { code: 'LA', name: 'Louisiana' },
      { code: 'ME', name: 'Maine' },
      { code: 'MD', name: 'Maryland' },
      { code: 'MA', name: 'Massachusetts' },
      { code: 'MI', name: 'Michigan' },
      { code: 'MN', name: 'Minnesota' },
      { code: 'MS', name: 'Mississippi' },
      { code: 'MO', name: 'Missouri' },
      { code: 'MT', name: 'Montana' },
      { code: 'NE', name: 'Nebraska' },
      { code: 'NV', name: 'Nevada' },
      { code: 'NH', name: 'New Hampshire' },
      { code: 'NJ', name: 'New Jersey' },
      { code: 'NM', name: 'New Mexico' },
      { code: 'NY', name: 'New York' },
      { code: 'NC', name: 'North Carolina' },
      { code: 'ND', name: 'North Dakota' },
      { code: 'OH', name: 'Ohio' },
      { code: 'OK', name: 'Oklahoma' },
      { code: 'OR', name: 'Oregon' },
      { code: 'PA', name: 'Pennsylvania' },
      { code: 'RI', name: 'Rhode Island' },
      { code: 'SC', name: 'South Carolina' },
      { code: 'SD', name: 'South Dakota' },
      { code: 'TN', name: 'Tennessee' },
      { code: 'TX', name: 'Texas' },
      { code: 'UT', name: 'Utah' },
      { code: 'VT', name: 'Vermont' },
      { code: 'VA', name: 'Virginia' },
      { code: 'WA', name: 'Washington' },
      { code: 'WV', name: 'West Virginia' },
      { code: 'WI', name: 'Wisconsin' },
      { code: 'WY', name: 'Wyoming' }
    ];
    res.json(states);
  });

  const httpServer = createServer(app);
  return httpServer;
}
