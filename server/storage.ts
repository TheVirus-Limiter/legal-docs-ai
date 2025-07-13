import { 
  users, 
  documents, 
  documentTemplates, 
  stateRequirements, 
  blogPosts,
  type User, 
  type InsertUser,
  type Document,
  type InsertDocument,
  type DocumentTemplate,
  type InsertDocumentTemplate,
  type StateRequirement,
  type InsertStateRequirement,
  type BlogPost,
  type InsertBlogPost
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDocument(document: InsertDocument): Promise<Document>;
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByType(type: string): Promise<Document[]>;
  updateDocumentDownloadCount(id: number): Promise<void>;
  
  getDocumentTemplates(): Promise<DocumentTemplate[]>;
  getDocumentTemplate(type: string): Promise<DocumentTemplate | undefined>;
  createDocumentTemplate(template: InsertDocumentTemplate): Promise<DocumentTemplate>;
  
  getStateRequirements(state: string, documentType: string): Promise<StateRequirement | undefined>;
  createStateRequirement(requirement: InsertStateRequirement): Promise<StateRequirement>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  incrementBlogPostViews(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documents: Map<number, Document>;
  private documentTemplates: Map<number, DocumentTemplate>;
  private stateRequirements: Map<string, StateRequirement>;
  private blogPosts: Map<number, BlogPost>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.documentTemplates = new Map();
    this.stateRequirements = new Map();
    this.blogPosts = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize document templates
    const templates: InsertDocumentTemplate[] = [
      {
        type: 'employment',
        name: 'Employment Contract',
        description: 'Comprehensive employment agreements with benefits, termination clauses, and state compliance.',
        fields: {
          companyName: { type: 'text', required: true, label: 'Company Name' },
          employeeName: { type: 'text', required: true, label: 'Employee Name' },
          position: { type: 'text', required: true, label: 'Position/Job Title' },
          employmentType: { type: 'select', required: true, label: 'Employment Type', options: ['full-time', 'part-time', 'contract', 'temporary'] },
          salary: { type: 'text', required: true, label: 'Salary/Rate' },
          payPeriod: { type: 'select', required: true, label: 'Pay Period', options: ['annual', 'monthly', 'hourly'] },
          startDate: { type: 'date', required: true, label: 'Start Date' },
          additionalRequirements: { type: 'textarea', required: false, label: 'Additional Requirements' }
        },
        aiPrompt: 'Generate a comprehensive employment contract for {companyName} hiring {employeeName} as {position}. Include salary of {salary} paid {payPeriod}, starting {startDate}. Employment type: {employmentType}. State: {state}. Additional requirements: {additionalRequirements}. Include standard clauses for benefits, confidentiality, termination, and state-specific labor law compliance.',
        estimatedTime: 5
      },
      {
        type: 'nda',
        name: 'Non-Disclosure Agreement',
        description: 'Protect confidential information with mutual or one-way non-disclosure agreements.',
        fields: {
          disclosingParty: { type: 'text', required: true, label: 'Disclosing Party' },
          receivingParty: { type: 'text', required: true, label: 'Receiving Party' },
          ndaType: { type: 'select', required: true, label: 'NDA Type', options: ['mutual', 'one-way'] },
          purpose: { type: 'textarea', required: true, label: 'Purpose of Disclosure' },
          duration: { type: 'select', required: true, label: 'Duration', options: ['1-year', '2-years', '3-years', '5-years', 'indefinite'] },
          penalties: { type: 'textarea', required: false, label: 'Specific Penalties' }
        },
        aiPrompt: 'Generate a {ndaType} non-disclosure agreement between {disclosingParty} and {receivingParty}. Purpose: {purpose}. Duration: {duration}. State: {state}. Include standard confidentiality clauses, return of materials, and enforcement provisions. Penalties: {penalties}',
        estimatedTime: 3
      },
      {
        type: 'service',
        name: 'Service Agreement',
        description: 'Professional service contracts for consultants, freelancers, and service providers.',
        fields: {
          serviceProvider: { type: 'text', required: true, label: 'Service Provider' },
          client: { type: 'text', required: true, label: 'Client' },
          serviceDescription: { type: 'textarea', required: true, label: 'Service Description' },
          fee: { type: 'text', required: true, label: 'Fee' },
          paymentTerms: { type: 'select', required: true, label: 'Payment Terms', options: ['net-15', 'net-30', 'upfront', '50-50-split'] },
          duration: { type: 'text', required: true, label: 'Project Duration' },
          deliverables: { type: 'textarea', required: true, label: 'Deliverables' }
        },
        aiPrompt: 'Generate a service agreement between {serviceProvider} and {client}. Services: {serviceDescription}. Fee: {fee} with {paymentTerms} payment terms. Duration: {duration}. Deliverables: {deliverables}. State: {state}. Include liability limitations, intellectual property clauses, and termination provisions.',
        estimatedTime: 4
      }
    ];

    templates.forEach(template => this.createDocumentTemplate(template));

    // Initialize blog posts
    const posts: InsertBlogPost[] = [
      {
        title: 'Employment Contract Essentials: What Every Employer Needs to Know',
        slug: 'employment-contract-essentials',
        excerpt: 'Learn the key components of legally compliant employment contracts and avoid common mistakes that could cost your business.',
        content: 'Full article content about employment contracts...',
        category: 'Employment Law',
        tags: ['employment', 'contracts', 'hr', 'compliance'],
        readTime: 5,
        featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      {
        title: 'LLC vs Corporation: Choosing the Right Business Structure',
        slug: 'llc-vs-corporation-business-structure',
        excerpt: 'Compare the pros and cons of different business structures to make the best choice for your startup or existing business.',
        content: 'Full article content about business structures...',
        category: 'Business Formation',
        tags: ['llc', 'corporation', 'business', 'legal-structure'],
        readTime: 7,
        featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f'
      },
      {
        title: 'GDPR Compliance for Small Businesses: A Practical Guide',
        slug: 'gdpr-compliance-small-businesses',
        excerpt: 'Navigate GDPR requirements and create compliant privacy policies that protect your business and customers.',
        content: 'Full article content about GDPR compliance...',
        category: 'Data Privacy',
        tags: ['gdpr', 'privacy', 'compliance', 'data-protection'],
        readTime: 6,
        featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c'
      }
    ];

    posts.forEach(post => this.createBlogPost(post));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentId++;
    const document: Document = { 
      ...insertDocument, 
      id, 
      createdAt: new Date(),
      downloadCount: 0,
      state: insertDocument.state || null,
      userId: insertDocument.userId || null
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getDocumentsByType(type: string): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(doc => doc.type === type);
  }

  async updateDocumentDownloadCount(id: number): Promise<void> {
    const document = this.documents.get(id);
    if (document) {
      document.downloadCount = (document.downloadCount || 0) + 1;
      this.documents.set(id, document);
    }
  }

  async getDocumentTemplates(): Promise<DocumentTemplate[]> {
    return Array.from(this.documentTemplates.values());
  }

  async getDocumentTemplate(type: string): Promise<DocumentTemplate | undefined> {
    return Array.from(this.documentTemplates.values()).find(template => template.type === type);
  }

  async createDocumentTemplate(insertTemplate: InsertDocumentTemplate): Promise<DocumentTemplate> {
    const id = this.currentId++;
    const template: DocumentTemplate = { ...insertTemplate, id, popularity: 0 };
    this.documentTemplates.set(id, template);
    return template;
  }

  async getStateRequirements(state: string, documentType: string): Promise<StateRequirement | undefined> {
    const key = `${state}-${documentType}`;
    return this.stateRequirements.get(key);
  }

  async createStateRequirement(insertRequirement: InsertStateRequirement): Promise<StateRequirement> {
    const id = this.currentId++;
    const requirement: StateRequirement = { 
      ...insertRequirement, 
      id, 
      lastUpdated: new Date() 
    };
    const key = `${requirement.state}-${requirement.documentType}`;
    this.stateRequirements.set(key, requirement);
    return requirement;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.category === category)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      publishedAt: new Date(),
      views: 0,
      tags: insertPost.tags || null,
      featuredImage: insertPost.featuredImage || null
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async incrementBlogPostViews(id: number): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.views = (post.views || 0) + 1;
      this.blogPosts.set(id, post);
    }
  }
}

export const storage = new MemStorage();
