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
      },
      {
        type: 'partnership',
        name: 'Partnership Agreement',
        description: 'Comprehensive business partnership agreements defining roles, profit sharing, and decision-making.',
        fields: {
          partner1Name: { type: 'text', required: true, label: 'Partner 1 Name' },
          partner2Name: { type: 'text', required: true, label: 'Partner 2 Name' },
          businessName: { type: 'text', required: true, label: 'Business Name' },
          businessPurpose: { type: 'textarea', required: true, label: 'Business Purpose' },
          partner1Contribution: { type: 'text', required: true, label: 'Partner 1 Investment' },
          partner2Contribution: { type: 'text', required: true, label: 'Partner 2 Investment' },
          profitSplit: { type: 'select', required: true, label: 'Profit Distribution', options: ['50-50', '60-40', '70-30', 'based-on-investment'] },
          managementStructure: { type: 'textarea', required: true, label: 'Management & Decision Making' }
        },
        aiPrompt: 'Generate a partnership agreement for {businessName} between {partner1Name} and {partner2Name}. Business purpose: {businessPurpose}. Contributions: {partner1Name} investing {partner1Contribution}, {partner2Name} investing {partner2Contribution}. Profit split: {profitSplit}. Management: {managementStructure}. State: {state}. Include dissolution procedures, dispute resolution, and liability provisions.',
        estimatedTime: 6
      },
      {
        type: 'lease',
        name: 'Commercial Lease Agreement',
        description: 'Commercial property lease agreements with rent terms, maintenance responsibilities, and renewal options.',
        fields: {
          landlordName: { type: 'text', required: true, label: 'Landlord Name' },
          tenantName: { type: 'text', required: true, label: 'Tenant Name' },
          propertyAddress: { type: 'textarea', required: true, label: 'Property Address' },
          leaseTermMonths: { type: 'text', required: true, label: 'Lease Term (months)' },
          monthlyRent: { type: 'text', required: true, label: 'Monthly Rent' },
          securityDeposit: { type: 'text', required: true, label: 'Security Deposit' },
          allowedUse: { type: 'textarea', required: true, label: 'Permitted Use of Property' },
          maintenanceResponsibility: { type: 'select', required: true, label: 'Maintenance Responsibility', options: ['tenant', 'landlord', 'shared'] }
        },
        aiPrompt: 'Generate a commercial lease agreement between {landlordName} (landlord) and {tenantName} (tenant) for property at {propertyAddress}. Lease term: {leaseTermMonths} months at {monthlyRent}/month. Security deposit: {securityDeposit}. Permitted use: {allowedUse}. Maintenance responsibility: {maintenanceResponsibility}. State: {state}. Include standard clauses for insurance, alterations, and termination.',
        estimatedTime: 5
      },
      {
        type: 'llc',
        name: 'LLC Operating Agreement',
        description: 'Limited Liability Company operating agreements defining member rights, profit distribution, and governance.',
        fields: {
          companyName: { type: 'text', required: true, label: 'LLC Name' },
          member1Name: { type: 'text', required: true, label: 'Member 1 Name' },
          member1Percentage: { type: 'text', required: true, label: 'Member 1 Ownership %' },
          member2Name: { type: 'text', required: false, label: 'Member 2 Name (if applicable)' },
          member2Percentage: { type: 'text', required: false, label: 'Member 2 Ownership %' },
          businessPurpose: { type: 'textarea', required: true, label: 'Business Purpose' },
          managementStructure: { type: 'select', required: true, label: 'Management Structure', options: ['member-managed', 'manager-managed'] },
          capitalContribution: { type: 'text', required: true, label: 'Initial Capital Contribution' }
        },
        aiPrompt: 'Generate an LLC Operating Agreement for {companyName}. Members: {member1Name} ({member1Percentage}% ownership){member2Name ? ", " + member2Name + " (" + member2Percentage + "% ownership)" : ""}. Business purpose: {businessPurpose}. Management: {managementStructure}. Initial capital: {capitalContribution}. State: {state}. Include provisions for meetings, distributions, transfers, and dissolution.',
        estimatedTime: 7
      },
      {
        type: 'privacy',
        name: 'Privacy Policy',
        description: 'GDPR and CCPA compliant privacy policies for websites and mobile applications.',
        fields: {
          companyName: { type: 'text', required: true, label: 'Company/Website Name' },
          websiteUrl: { type: 'text', required: true, label: 'Website URL' },
          contactEmail: { type: 'text', required: true, label: 'Contact Email' },
          dataCollected: { type: 'textarea', required: true, label: 'Types of Data Collected' },
          dataUsage: { type: 'textarea', required: true, label: 'How Data is Used' },
          thirdPartyServices: { type: 'textarea', required: false, label: 'Third-party Services (Google Analytics, etc.)' },
          cookieUsage: { type: 'select', required: true, label: 'Cookie Usage', options: ['essential-only', 'analytics', 'marketing', 'all-types'] }
        },
        aiPrompt: 'Generate a privacy policy for {companyName} ({websiteUrl}). Contact: {contactEmail}. Data collected: {dataCollected}. Data usage: {dataUsage}. Third-party services: {thirdPartyServices}. Cookie usage: {cookieUsage}. Include GDPR and CCPA compliance, user rights, data retention, and security measures. Make it compliant with {state} and federal privacy laws.',
        estimatedTime: 5
      },
      {
        type: 'terms',
        name: 'Terms of Service',
        description: 'Website and app terms of service agreements protecting your business and defining user responsibilities.',
        fields: {
          companyName: { type: 'text', required: true, label: 'Company Name' },
          websiteUrl: { type: 'text', required: true, label: 'Website/App URL' },
          serviceDescription: { type: 'textarea', required: true, label: 'Service Description' },
          contactInfo: { type: 'text', required: true, label: 'Contact Information' },
          governingLaw: { type: 'text', required: true, label: 'Governing Law State' },
          prohibitedUses: { type: 'textarea', required: true, label: 'Prohibited Uses' },
          liabilityLimitation: { type: 'select', required: true, label: 'Liability Limitation', options: ['standard', 'maximum', 'minimal'] }
        },
        aiPrompt: 'Generate terms of service for {companyName} ({websiteUrl}). Services: {serviceDescription}. Contact: {contactInfo}. Governing law: {governingLaw}. Prohibited uses: {prohibitedUses}. Liability limitation: {liabilityLimitation}. Include user obligations, intellectual property rights, termination clauses, and dispute resolution procedures.',
        estimatedTime: 4
      },
      {
        type: 'contractor',
        name: 'Independent Contractor Agreement',
        description: 'Contractor agreements distinguishing independent contractors from employees with proper tax classifications.',
        fields: {
          companyName: { type: 'text', required: true, label: 'Company Name' },
          contractorName: { type: 'text', required: true, label: 'Contractor Name' },
          workDescription: { type: 'textarea', required: true, label: 'Work Description' },
          paymentAmount: { type: 'text', required: true, label: 'Payment Amount' },
          paymentSchedule: { type: 'select', required: true, label: 'Payment Schedule', options: ['per-project', 'hourly', 'monthly', 'milestone-based'] },
          workLocation: { type: 'select', required: true, label: 'Work Location', options: ['remote', 'on-site', 'hybrid'] },
          projectDuration: { type: 'text', required: true, label: 'Project Duration' },
          equipmentProvision: { type: 'select', required: true, label: 'Equipment/Tools Provided By', options: ['contractor', 'company', 'shared'] }
        },
        aiPrompt: 'Generate an independent contractor agreement between {companyName} and {contractorName}. Work: {workDescription}. Payment: {paymentAmount} on {paymentSchedule} basis. Duration: {projectDuration}. Location: {workLocation}. Equipment: {equipmentProvision}. State: {state}. Include proper contractor classification, intellectual property rights, and tax responsibility clauses.',
        estimatedTime: 5
      },
      {
        type: 'vendor',
        name: 'Vendor/Supplier Agreement',
        description: 'Supply agreements for ongoing vendor relationships with quality standards and delivery terms.',
        fields: {
          buyerCompany: { type: 'text', required: true, label: 'Buyer Company' },
          vendorCompany: { type: 'text', required: true, label: 'Vendor/Supplier Company' },
          productsServices: { type: 'textarea', required: true, label: 'Products/Services Supplied' },
          pricingStructure: { type: 'textarea', required: true, label: 'Pricing Structure' },
          deliveryTerms: { type: 'textarea', required: true, label: 'Delivery Terms' },
          qualityStandards: { type: 'textarea', required: true, label: 'Quality Standards' },
          paymentTerms: { type: 'select', required: true, label: 'Payment Terms', options: ['net-15', 'net-30', 'net-60', 'cod', 'prepaid'] },
          contractDuration: { type: 'text', required: true, label: 'Contract Duration' }
        },
        aiPrompt: 'Generate a vendor agreement between {buyerCompany} (buyer) and {vendorCompany} (supplier). Products/Services: {productsServices}. Pricing: {pricingStructure}. Delivery: {deliveryTerms}. Quality standards: {qualityStandards}. Payment terms: {paymentTerms}. Duration: {contractDuration}. State: {state}. Include warranties, liability, force majeure, and termination provisions.',
        estimatedTime: 6
      },
      {
        type: 'consulting',
        name: 'Consulting Agreement',
        description: 'Professional consulting contracts with defined scope, deliverables, and intellectual property rights.',
        fields: {
          consultantName: { type: 'text', required: true, label: 'Consultant Name' },
          clientCompany: { type: 'text', required: true, label: 'Client Company' },
          consultingScope: { type: 'textarea', required: true, label: 'Consulting Scope' },
          hourlyRate: { type: 'text', required: true, label: 'Hourly Rate' },
          estimatedHours: { type: 'text', required: true, label: 'Estimated Hours' },
          projectTimeline: { type: 'text', required: true, label: 'Project Timeline' },
          expenses: { type: 'select', required: true, label: 'Expense Reimbursement', options: ['included', 'reimbursable', 'not-covered'] },
          deliverables: { type: 'textarea', required: true, label: 'Expected Deliverables' }
        },
        aiPrompt: 'Generate a consulting agreement between {consultantName} and {clientCompany}. Scope: {consultingScope}. Rate: {hourlyRate} for approximately {estimatedHours} hours. Timeline: {projectTimeline}. Expenses: {expenses}. Deliverables: {deliverables}. State: {state}. Include confidentiality, intellectual property ownership, and professional standards clauses.',
        estimatedTime: 5
      },
      {
        type: 'purchase',
        name: 'Purchase Agreement',
        description: 'Asset purchase agreements for business acquisitions, equipment purchases, and property transfers.',
        fields: {
          buyerName: { type: 'text', required: true, label: 'Buyer Name' },
          sellerName: { type: 'text', required: true, label: 'Seller Name' },
          assetDescription: { type: 'textarea', required: true, label: 'Asset/Property Description' },
          purchasePrice: { type: 'text', required: true, label: 'Purchase Price' },
          paymentTerms: { type: 'textarea', required: true, label: 'Payment Terms' },
          closingDate: { type: 'date', required: true, label: 'Closing Date' },
          warranties: { type: 'textarea', required: true, label: 'Seller Warranties' },
          conditions: { type: 'textarea', required: false, label: 'Conditions Precedent' }
        },
        aiPrompt: 'Generate a purchase agreement between {buyerName} (buyer) and {sellerName} (seller) for {assetDescription}. Purchase price: {purchasePrice}. Payment terms: {paymentTerms}. Closing date: {closingDate}. Warranties: {warranties}. Conditions: {conditions}. State: {state}. Include title transfer, risk allocation, and closing procedures.',
        estimatedTime: 6
      },
      {
        type: 'license',
        name: 'Software License Agreement',
        description: 'Software licensing agreements for commercial software, SaaS platforms, and intellectual property licensing.',
        fields: {
          licensorName: { type: 'text', required: true, label: 'Licensor (Software Owner)' },
          licenseeName: { type: 'text', required: true, label: 'Licensee (User/Company)' },
          softwareName: { type: 'text', required: true, label: 'Software/Product Name' },
          licenseType: { type: 'select', required: true, label: 'License Type', options: ['perpetual', 'subscription', 'trial', 'enterprise'] },
          licenseScope: { type: 'textarea', required: true, label: 'License Scope & Restrictions' },
          licenseFee: { type: 'text', required: true, label: 'License Fee' },
          supportIncluded: { type: 'select', required: true, label: 'Support Included', options: ['basic', 'premium', 'enterprise', 'none'] },
          dataRights: { type: 'textarea', required: true, label: 'Data Ownership & Rights' }
        },
        aiPrompt: 'Generate a software license agreement between {licensorName} (licensor) and {licenseeName} (licensee) for {softwareName}. License type: {licenseType}. Scope: {licenseScope}. Fee: {licenseFee}. Support: {supportIncluded}. Data rights: {dataRights}. State: {state}. Include usage restrictions, intellectual property protection, and liability limitations.',
        estimatedTime: 5
      },
      {
        type: 'franchise',
        name: 'Franchise Agreement',
        description: 'Franchise agreements for business expansion with brand licensing, operational standards, and fee structures.',
        fields: {
          franchisorName: { type: 'text', required: true, label: 'Franchisor Name' },
          franchiseeName: { type: 'text', required: true, label: 'Franchisee Name' },
          franchiseBrand: { type: 'text', required: true, label: 'Franchise Brand/System' },
          territoryDescription: { type: 'textarea', required: true, label: 'Territory Description' },
          franchiseFee: { type: 'text', required: true, label: 'Initial Franchise Fee' },
          royaltyRate: { type: 'text', required: true, label: 'Ongoing Royalty Rate (%)' },
          termLength: { type: 'text', required: true, label: 'Franchise Term (years)' },
          trainingRequirements: { type: 'textarea', required: true, label: 'Training Requirements' }
        },
        aiPrompt: 'Generate a franchise agreement between {franchisorName} (franchisor) and {franchiseeName} (franchisee) for {franchiseBrand}. Territory: {territoryDescription}. Initial fee: {franchiseFee}. Royalty: {royaltyRate}%. Term: {termLength} years. Training: {trainingRequirements}. State: {state}. Include operational standards, marketing requirements, and termination procedures.',
        estimatedTime: 8
      },
      {
        type: 'distribution',
        name: 'Distribution Agreement',
        description: 'Product distribution agreements for wholesalers, retailers, and sales representatives.',
        fields: {
          supplierName: { type: 'text', required: true, label: 'Supplier/Manufacturer' },
          distributorName: { type: 'text', required: true, label: 'Distributor Name' },
          products: { type: 'textarea', required: true, label: 'Products to Distribute' },
          territory: { type: 'textarea', required: true, label: 'Distribution Territory' },
          exclusivity: { type: 'select', required: true, label: 'Exclusivity', options: ['exclusive', 'non-exclusive', 'limited-exclusive'] },
          minimumOrders: { type: 'text', required: true, label: 'Minimum Order Requirements' },
          commission: { type: 'text', required: true, label: 'Commission/Markup Rate' },
          marketingSupport: { type: 'textarea', required: true, label: 'Marketing Support Provided' }
        },
        aiPrompt: 'Generate a distribution agreement between {supplierName} (supplier) and {distributorName} (distributor) for {products}. Territory: {territory}. Exclusivity: {exclusivity}. Minimum orders: {minimumOrders}. Commission: {commission}. Marketing support: {marketingSupport}. State: {state}. Include performance standards, inventory requirements, and termination clauses.',
        estimatedTime: 6
      },
      {
        type: 'loan',
        name: 'Business Loan Agreement',
        description: 'Commercial loan agreements with repayment terms, interest rates, and security provisions.',
        fields: {
          lenderName: { type: 'text', required: true, label: 'Lender Name' },
          borrowerName: { type: 'text', required: true, label: 'Borrower Name' },
          loanAmount: { type: 'text', required: true, label: 'Loan Amount' },
          interestRate: { type: 'text', required: true, label: 'Interest Rate (%)' },
          repaymentTerm: { type: 'text', required: true, label: 'Repayment Term' },
          paymentSchedule: { type: 'select', required: true, label: 'Payment Schedule', options: ['monthly', 'quarterly', 'balloon', 'interest-only'] },
          collateral: { type: 'textarea', required: true, label: 'Collateral/Security' },
          loanPurpose: { type: 'textarea', required: true, label: 'Loan Purpose' }
        },
        aiPrompt: 'Generate a business loan agreement between {lenderName} (lender) and {borrowerName} (borrower). Amount: {loanAmount} at {interestRate}% interest. Term: {repaymentTerm} with {paymentSchedule} payments. Collateral: {collateral}. Purpose: {loanPurpose}. State: {state}. Include default provisions, acceleration clauses, and lender protections.',
        estimatedTime: 7
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
