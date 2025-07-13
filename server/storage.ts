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

    // Initialize comprehensive blog posts with full content
    const posts: InsertBlogPost[] = [
      {
        title: 'Employment Contract Essentials: What Every Employer Needs to Know',
        slug: 'employment-contract-essentials',
        excerpt: 'Learn the key components of legally compliant employment contracts and avoid common mistakes that could cost your business.',
        content: `# Employment Contract Essentials: What Every Employer Needs to Know

Employment contracts form the backbone of successful employer-employee relationships. Whether you're hiring your first employee or expanding your team, understanding contract essentials protects your business and ensures legal compliance.

## Why Employment Contracts Matter

Well-drafted employment contracts provide multiple benefits:
- **Legal Protection**: Define rights and responsibilities for both parties
- **Clarity**: Establish clear expectations and performance standards
- **Compliance**: Ensure adherence to federal and state labor laws
- **Risk Mitigation**: Reduce potential for disputes and litigation

## Essential Contract Components

### 1. Job Description and Responsibilities
Every employment contract should clearly define:
- Specific job title and reporting structure
- Detailed list of duties and responsibilities
- Performance expectations and success metrics
- Working hours, schedule, and location requirements

### 2. Compensation Structure
Comprehensive compensation details include:
- Base salary or hourly wage rates
- Payment frequency (weekly, bi-weekly, monthly)
- Overtime policies and calculation methods
- Bonus structure and performance incentives
- Benefits package including health insurance, retirement plans
- Vacation, sick leave, and paid time off policies

### 3. Employment Terms
Clearly specify the nature of employment:
- **At-Will Employment**: Can be terminated by either party with or without cause
- **Fixed-Term Contracts**: Specific start and end dates
- **Probationary Periods**: Initial evaluation timeframes
- **Contract Renewal**: Terms for extending agreements

### 4. Confidentiality and Non-Disclosure
Protect business interests with:
- Trade secret and proprietary information protection
- Client list and customer data confidentiality
- Social media and external communication guidelines
- Post-employment restrictions and non-compete clauses
- Company property return procedures

## State-Specific Legal Requirements

Employment laws vary significantly across states, requiring careful attention to:

### Wage and Hour Laws
- **Minimum Wage**: Federal vs. state minimum wage requirements
- **Overtime Rules**: When overtime applies and calculation methods
- **Break Requirements**: Mandatory rest and meal periods
- **Final Pay**: Timing requirements for final paychecks

### Anti-Discrimination Protections
- **Protected Classes**: Age, race, gender, religion, disability status
- **Harassment Prevention**: Training requirements and reporting procedures
- **Accommodation Duties**: Reasonable accommodations for disabilities
- **Family Leave**: State-specific family and medical leave requirements

### At-Will Employment Variations
While most states follow at-will employment, some have exceptions:
- **Implied Contract**: Performance reviews or handbooks creating contracts
- **Public Policy**: Protection for whistleblowing or jury duty
- **Good Faith**: Requirements for fair dealing in employment decisions

## Common Contract Mistakes and How to Avoid Them

### 1. Vague or Ambiguous Language
**Problem**: Unclear terms lead to disputes and legal vulnerabilities.
**Solution**: Use specific, measurable language for all contract terms.

**Example**:
- **Vague**: "Perform various administrative duties"
- **Specific**: "Manage customer database, process invoices, coordinate scheduling"

### 2. Inadequate Termination Procedures
**Problem**: Unclear termination processes create legal risks.
**Solution**: Define step-by-step termination procedures including:
- Progressive discipline policies
- Performance improvement plans
- Final pay and benefit continuation
- Company property return requirements

### 3. Overlooking State Law Compliance
**Problem**: Federal compliance doesn't ensure state law adherence.
**Solution**: Research and incorporate state-specific requirements for:
- Wage payment timing
- Break and meal period requirements
- Final paycheck delivery timeframes
- Unemployment compensation eligibility

## Technology and Remote Work Considerations

Modern employment contracts must address:
- **Remote Work Policies**: Home office requirements, technology provision
- **Data Security**: Protection of company information on personal devices
- **Communication Expectations**: Response times, availability requirements
- **Technology Monitoring**: Employee privacy vs. company security needs

## Best Practices for Implementation

### 1. Legal Review and Updates
- Annual contract review with employment law attorneys
- Regular updates to reflect changing laws and business needs
- Industry-specific clause incorporation
- Documentation of all contract modifications

### 2. Clear Communication Process
- Provide adequate time for employee review and questions
- Explain key terms and benefits in plain language
- Offer translation services when needed
- Maintain organized records of all signed agreements

### 3. Training and Compliance
- Train managers on contract enforcement
- Establish consistent application procedures
- Monitor compliance with contract terms
- Address violations promptly and fairly

## Conclusion

Employment contracts are fundamental business documents that protect both employers and employees. By including essential components, ensuring state law compliance, and following best practices, businesses create strong foundations for successful employment relationships.

**Important Legal Notice**: This information is provided for educational purposes only and does not constitute legal advice. Employment laws vary by jurisdiction and change frequently. Always consult with qualified employment law attorneys for specific legal guidance related to your business and location.`,
        category: 'Employment Law',
        tags: ['employment', 'contracts', 'hr', 'compliance'],
        readTime: 8,
        featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      {
        title: 'LLC vs Corporation: Choosing the Right Business Structure',
        slug: 'llc-vs-corporation-business-structure',
        excerpt: 'Compare the pros and cons of different business structures to make the best choice for your startup or existing business.',
        content: `# LLC vs Corporation: Choosing the Right Business Structure for Your Business

Selecting the appropriate business structure is one of the most critical decisions entrepreneurs face. The choice between a Limited Liability Company (LLC) and a Corporation affects taxation, liability protection, management flexibility, and future growth opportunities.

## Understanding Business Structure Basics

Business structures determine:
- **Legal Status**: How the law views your business entity
- **Tax Treatment**: How profits and losses are taxed
- **Liability Protection**: Personal asset protection from business debts
- **Management Structure**: How decisions are made and who has authority
- **Funding Options**: Available methods for raising capital

## Limited Liability Company (LLC) Overview

An LLC combines elements of corporations and partnerships, offering flexibility and simplicity for small to medium-sized businesses.

### LLC Advantages

**1. Liability Protection**
- Personal assets protected from business debts and lawsuits
- Members not personally liable for company obligations
- "Corporate veil" protection when properly maintained

**2. Tax Flexibility**
- **Pass-through taxation**: Profits and losses flow to owners' personal returns
- **Tax elections**: Can elect corporate taxation if beneficial
- **No double taxation**: Unlike C-corporations
- **Self-employment tax**: Only on active member distributions

**3. Management Simplicity**
- **Flexible management structure**: Member-managed or manager-managed
- **Minimal formalities**: No required board meetings or shareholder votes
- **Operating agreement**: Customizable governance document
- **Easy profit distribution**: Not required to be proportional to ownership

**4. Operational Benefits**
- **Fewer filing requirements**: Less paperwork than corporations
- **Flexible ownership**: Different classes of membership interests
- **Easy transfer**: Membership interests can be transferred (with restrictions)
- **Perpetual existence**: Can continue beyond original members

### LLC Disadvantages

**1. Self-Employment Tax**
- Active members pay self-employment tax on distributions
- Higher tax burden compared to S-corporation salary/distribution split
- Limited strategies for tax optimization

**2. Limited Growth Potential**
- **Investor preferences**: Many investors prefer corporate structures
- **No stock options**: Cannot offer traditional employee stock options
- **Conversion complexity**: Changing to corporation later involves tax consequences

**3. State Variations**
- **Inconsistent laws**: LLC laws vary significantly by state
- **Limited case law**: Newer entity type with less legal precedent
- **Professional restrictions**: Some professions cannot use LLC structure

## Corporation Overview

Corporations are formal business entities with distinct legal personalities, offering structure and growth potential for larger businesses.

### Corporation Types

**C-Corporation**
- Default corporate taxation
- Double taxation on profits
- Unlimited growth potential
- Preferred by investors

**S-Corporation**
- Pass-through taxation election
- Limited to 100 shareholders
- Restrictions on ownership types
- Tax advantages for active owners

### Corporation Advantages

**1. Growth and Investment**
- **Stock issuance**: Easy to raise capital through stock sales
- **Investor familiarity**: Well-understood structure for funding
- **Employee incentives**: Stock options and equity compensation
- **Perpetual existence**: Continues beyond founder involvement

**2. Tax Benefits (S-Corp)**
- **Salary/distribution split**: Potential self-employment tax savings
- **Pass-through taxation**: Avoid double taxation
- **Tax-free transfers**: Section 351 exchanges
- **Loss deductions**: Shareholders can deduct losses

**3. Credibility and Structure**
- **Professional image**: Enhanced credibility with customers and vendors
- **Formal governance**: Board of directors and shareholder structure
- **Clear ownership**: Stock certificates define ownership interests
- **Succession planning**: Easier transfer of ownership

### Corporation Disadvantages

**1. Complexity and Costs**
- **Formation costs**: Higher initial setup expenses
- **Ongoing requirements**: Board meetings, shareholder votes, annual reports
- **Professional fees**: Increased accounting and legal costs
- **Compliance burden**: More extensive record-keeping requirements

**2. Tax Complications (C-Corp)**
- **Double taxation**: Corporate profits taxed, then shareholder distributions taxed
- **Accumulated earnings**: Penalty for retaining too much profit
- **Limited deductions**: Restrictions on business expense deductions

**3. Operational Restrictions**
- **Formal procedures**: Required for major decisions
- **Limited flexibility**: Standard corporate governance requirements
- **Shareholder agreements**: Complex ownership transfer procedures

## State-by-State Considerations

Different states offer varying advantages for business formation:

### Delaware
- **Advantages**: Business-friendly courts, extensive case law, flexible corporate laws
- **Best for**: Corporations seeking investor funding
- **Disadvantages**: Annual franchise tax, no business presence required

### Nevada
- **Advantages**: No state income tax, strong privacy protections
- **Best for**: Businesses wanting tax advantages and privacy
- **Disadvantages**: High annual fees for some entity types

### Wyoming
- **Advantages**: Low fees, no state income tax, strong LLC protections
- **Best for**: LLCs and small businesses
- **Disadvantages**: Limited business infrastructure

### Home State Formation
- **Advantages**: Lower costs, familiar laws, local attorney access
- **Best for**: Local businesses without multi-state operations
- **Considerations**: May need to register in business operation states

## Decision Framework: Choosing the Right Structure

### Choose LLC When:
- **Small to medium business** with 1-10 owners
- **Tax simplicity** is priority
- **Operational flexibility** is important
- **No immediate plans** for outside investment
- **Professional service** business
- **Real estate investment** activities

### Choose S-Corporation When:
- **Active business owners** want payroll tax savings
- **Planning for growth** but staying under 100 shareholders
- **Want pass-through taxation** with corporate structure
- **Need employee benefit** advantages
- **Operating in one state** primarily

### Choose C-Corporation When:
- **Seeking investor funding** or venture capital
- **Planning rapid growth** and expansion
- **Want to retain earnings** in the business
- **Need employee stock options** and equity compensation
- **Operating internationally** or planning to go public
- **Multiple classes of stock** needed

## Conversion and Changes

### LLC to Corporation
- **Process**: Dissolve LLC, form corporation, transfer assets
- **Tax implications**: Potential gain recognition on asset transfer
- **Timing**: Plan during low-value periods to minimize taxes
- **Benefits**: Access to investment and corporate benefits

### Corporation to LLC
- **Complexity**: More complicated than LLC to corporation conversion
- **Tax consequences**: Potentially significant tax liabilities
- **Reasons**: Simplify operations, reduce compliance burden
- **Professional advice**: Essential due to complexity

## Professional Recommendations

### Industries Favoring LLCs
- **Real estate**: Property holding and development
- **Professional services**: Consulting, law firms, medical practices
- **Small retail**: Local restaurants, shops, service businesses
- **Family businesses**: Closely-held operations

### Industries Favoring Corporations
- **Technology**: Software, biotech, high-growth startups
- **Manufacturing**: Capital-intensive operations
- **Financial services**: Investment firms, banks
- **Franchises**: Multi-location operations

## Conclusion

The choice between LLC and corporation depends on your specific business goals, growth plans, tax situation, and operational preferences. Consider:

- **Current needs**: Tax situation, liability protection, operational complexity
- **Future plans**: Growth expectations, funding needs, exit strategies
- **Professional guidance**: Consult with attorneys and accountants familiar with your industry

**Important Note**: Business structure decisions have long-term implications for taxes, liability, and operations. This information is educational only and not legal or tax advice. Always consult with qualified professionals before making business structure decisions.`,
        category: 'Business Formation',
        tags: ['llc', 'corporation', 'business', 'legal-structure'],
        readTime: 12,
        featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f'
      },
      {
        title: 'GDPR Compliance for Small Businesses: A Practical Guide',
        slug: 'gdpr-compliance-small-businesses',
        excerpt: 'Navigate GDPR requirements and create compliant privacy policies that protect your business and customers.',
        content: `# GDPR Compliance for Small Businesses: A Practical Guide

The General Data Protection Regulation (GDPR) affects any business that processes personal data of EU residents, regardless of the business's location. Small businesses must understand and implement GDPR requirements to avoid significant penalties and protect customer trust.

## Understanding GDPR Basics

### What is GDPR?
The GDPR is a comprehensive data protection regulation that:
- **Protects EU residents**: Applies to processing personal data of EU individuals
- **Global reach**: Affects businesses worldwide that serve EU customers
- **Strict penalties**: Fines up to 4% of annual revenue or €20 million
- **Individual rights**: Grants extensive rights to data subjects

### When GDPR Applies to Your Business
GDPR applies if you:
- **Offer goods or services** to individuals in the EU
- **Monitor behavior** of individuals in the EU
- **Process personal data** of EU residents
- **Have an establishment** in the EU

**Note**: Physical presence in the EU is not required for GDPR to apply.

## Key GDPR Principles

### 1. Lawfulness, Fairness, and Transparency
- **Lawful basis**: Must have legal justification for processing
- **Fair processing**: Cannot process data in ways that are harmful or unexpected
- **Transparency**: Clear information about how data is used

### 2. Purpose Limitation
- **Specific purposes**: Data collected for specified, legitimate purposes
- **No scope creep**: Cannot use data for incompatible purposes
- **Clear communication**: Purposes must be explained to data subjects

### 3. Data Minimization
- **Adequate and relevant**: Only collect necessary data
- **Not excessive**: Avoid collecting more than needed
- **Regular review**: Periodically assess data collection practices

### 4. Accuracy
- **Up-to-date information**: Keep personal data current
- **Correction procedures**: Allow individuals to update their data
- **Regular verification**: Implement processes to maintain accuracy

### 5. Storage Limitation
- **Retention periods**: Don't keep data longer than necessary
- **Deletion procedures**: Securely delete unnecessary data
- **Legal requirements**: Consider legal obligations for retention

### 6. Security
- **Technical measures**: Encryption, access controls, secure systems
- **Organizational measures**: Staff training, policies, procedures
- **Breach preparedness**: Plans for responding to data breaches

## Personal Data Under GDPR

### What Constitutes Personal Data
Personal data includes any information that can identify an individual:
- **Direct identifiers**: Names, addresses, phone numbers, email addresses
- **Indirect identifiers**: IP addresses, device IDs, location data
- **Sensitive data**: Health information, political opinions, religious beliefs
- **Online identifiers**: Social media handles, account numbers

### Special Categories (Sensitive Data)
Extra protection required for:
- **Health data**: Medical records, fitness information
- **Biometric data**: Fingerprints, facial recognition data
- **Political opinions**: Voting preferences, political affiliations
- **Religious beliefs**: Faith-based information
- **Trade union membership**: Labor organization participation

## Individual Rights Under GDPR

### 1. Right to Information
Individuals must be informed about:
- **What data** you collect
- **Why you collect** it
- **How long** you keep it
- **Who you share** it with
- **Their rights** regarding the data

### 2. Right of Access
Data subjects can:
- **Request copies** of their personal data
- **Understand processing** activities
- **Receive information** in a commonly used format
- **Get confirmation** of whether data is being processed

### 3. Right to Rectification
Individuals can:
- **Correct inaccurate** personal data
- **Complete incomplete** data
- **Update outdated** information

### 4. Right to Erasure ("Right to be Forgotten")
Data subjects can request deletion when:
- **Data no longer necessary** for original purpose
- **Consent withdrawn** and no other legal basis exists
- **Data processed unlawfully**
- **Legal obligation** requires deletion

### 5. Right to Restrict Processing
Individuals can limit how you use their data when:
- **Accuracy is contested**
- **Processing is unlawful** but deletion is not wanted
- **Data no longer needed** but required for legal claims
- **Objection to processing** is pending verification

### 6. Right to Data Portability
Data subjects can:
- **Receive personal data** in a structured, machine-readable format
- **Transfer data** to another controller
- **Request direct transfer** when technically feasible

## Implementing GDPR Compliance

### Step 1: Data Audit and Mapping
**Identify Data Processing Activities**:
- What personal data do you collect?
- How do you collect it (website forms, purchases, subscriptions)?
- Why do you process it?
- Where do you store it?
- Who has access to it?
- Do you share it with third parties?

**Create Data Flow Maps**:
- Document data journey from collection to deletion
- Identify all systems and databases containing personal data
- Map data transfers to third parties or other countries

### Step 2: Legal Basis Assessment
**Determine Lawful Basis for Processing**:
- **Consent**: Freely given, specific, informed agreement
- **Contract**: Necessary for contract performance
- **Legal obligation**: Required by law
- **Vital interests**: Protecting someone's life
- **Public task**: Performing official functions
- **Legitimate interests**: Balancing business needs with individual rights

### Step 3: Privacy Policy and Notices
**Create Comprehensive Privacy Policy**:
- **Data collection**: What data you collect and how
- **Processing purposes**: Why you use the data
- **Legal basis**: Justification for processing
- **Retention periods**: How long you keep data
- **Third-party sharing**: Who you share data with
- **Individual rights**: How to exercise GDPR rights
- **Contact information**: How to reach your data protection officer

**Implement Privacy Notices**:
- **Point of collection**: Inform individuals when collecting data
- **Clear language**: Avoid legal jargon
- **Easily accessible**: Prominent placement on website
- **Regular updates**: Keep information current

### Step 4: Consent Management
**Implement Consent Requirements**:
- **Clear and specific**: Explain exactly what you're asking consent for
- **Separate from other terms**: Don't bundle with terms of service
- **Easy withdrawal**: Make it as easy to withdraw as to give consent
- **Record keeping**: Document when and how consent was obtained

**Cookie Consent**:
- **Cookie banner**: Inform about cookie use
- **Granular choices**: Allow users to choose cookie types
- **Non-essential cookies**: Require explicit consent
- **Consent management platform**: Consider using specialized tools

### Step 5: Data Subject Rights Procedures
**Establish Response Processes**:
- **Request handling**: Designate responsible staff
- **Identity verification**: Confirm requester identity
- **Response timeframes**: Generally 30 days, extendable to 60 days
- **Record keeping**: Document all requests and responses

**Create Standard Procedures for**:
- **Access requests**: Providing copies of personal data
- **Deletion requests**: Securely removing data
- **Correction requests**: Updating inaccurate information
- **Portability requests**: Providing data in machine-readable format

### Step 6: Data Security Measures
**Technical Safeguards**:
- **Encryption**: Protect data in transit and at rest
- **Access controls**: Limit who can access personal data
- **Secure systems**: Use updated, secure software and hardware
- **Regular backups**: Ensure data availability and integrity

**Organizational Measures**:
- **Staff training**: Educate employees about GDPR requirements
- **Access policies**: Define who can access what data
- **Incident response**: Prepare for potential data breaches
- **Regular audits**: Monitor compliance and identify improvements

## Data Breach Response

### Breach Notification Requirements
**To Supervisory Authority** (within 72 hours):
- **High risk to rights**: When breach likely to result in harm
- **Breach details**: Nature, categories of data, number of individuals affected
- **Consequences**: Likely consequences of the breach
- **Measures taken**: Steps to address breach and mitigate harm

**To Data Subjects** (without undue delay):
- **High risk**: When breach likely to result in high risk to rights
- **Clear language**: Plain English explanation
- **Advice**: Steps individuals can take to protect themselves
- **Contact information**: How to get more information

### Breach Response Plan
**Immediate Actions**:
1. **Contain the breach**: Stop ongoing data exposure
2. **Assess the risk**: Determine potential harm to individuals
3. **Document everything**: Create detailed incident records
4. **Notify stakeholders**: Inform management and relevant teams

**Investigation and Response**:
1. **Investigate cause**: Identify how breach occurred
2. **Assess scope**: Determine what data was affected
3. **Evaluate obligations**: Decide on notification requirements
4. **Implement fixes**: Address vulnerabilities that caused breach

## Third-Party Vendor Management

### Due Diligence Requirements
**Vendor Assessment**:
- **Data protection capabilities**: Evaluate security measures
- **GDPR compliance**: Confirm vendor understanding and compliance
- **Data processing locations**: Understand where data will be processed
- **Subprocessor use**: Identify any further data sharing

### Data Processing Agreements (DPAs)
**Required Contract Terms**:
- **Processing instructions**: Clear directions for data handling
- **Data security**: Required security measures
- **Breach notification**: Vendor obligations for breach reporting
- **Data subject rights**: Procedures for handling individual requests
- **Audit rights**: Your ability to monitor vendor compliance

## International Data Transfers

### Transfer Mechanisms
**Adequacy Decisions**: EU has determined adequate protection
- **Approved countries**: UK, Switzerland, some others
- **Ongoing assessments**: Status can change

**Standard Contractual Clauses (SCCs)**:
- **EU-approved contracts**: Pre-approved transfer mechanisms
- **Contractual protections**: Binding data protection obligations
- **Regular updates**: Keep current with EU revisions

**Binding Corporate Rules (BCRs)**:
- **Multinational companies**: Internal data transfer rules
- **Regulatory approval**: Must be approved by EU authorities
- **Comprehensive protection**: Cover all group entities

## Compliance Costs and Resources

### Typical Implementation Costs
**Initial Setup**:
- **Legal consultation**: $2,000-$10,000 for small businesses
- **Privacy policy creation**: $500-$3,000
- **System updates**: $1,000-$5,000
- **Staff training**: $500-$2,000

**Ongoing Costs**:
- **Annual compliance review**: $1,000-$3,000
- **Data protection officer**: $30,000-$100,000 annually (if required)
- **Compliance software**: $100-$1,000 monthly
- **Regular training**: $500-$1,500 annually

### Cost-Effective Compliance Strategies
**Prioritize High-Risk Areas**:
- Focus on sensitive data processing
- Address highest-volume data collection
- Implement strongest security for most valuable data

**Leverage Technology**:
- **Automated data discovery**: Identify personal data across systems
- **Consent management platforms**: Streamline consent collection
- **Privacy management software**: Centralize compliance activities

**Staff Training and Awareness**:
- **Regular training sessions**: Keep staff informed about requirements
- **Clear policies**: Provide easy-to-understand guidelines
- **Incident reporting**: Encourage prompt reporting of potential issues

## Common GDPR Mistakes to Avoid

### 1. Assuming GDPR Doesn't Apply
**Mistake**: Thinking GDPR only applies to EU-based businesses
**Reality**: Any business processing EU resident data may be subject to GDPR
**Solution**: Assess your customer base and data processing activities

### 2. Using Blanket Consent
**Mistake**: Getting one consent for all data processing activities
**Reality**: Consent must be specific for each processing purpose
**Solution**: Implement granular consent mechanisms

### 3. Ignoring Data Subject Rights
**Mistake**: Not responding to individual rights requests
**Reality**: Failure to respond can result in significant penalties
**Solution**: Establish clear procedures and train staff

### 4. Inadequate Vendor Management
**Mistake**: Not ensuring vendor GDPR compliance
**Reality**: You remain liable for vendor data processing
**Solution**: Implement thorough vendor assessment and DPAs

### 5. Poor Data Security
**Mistake**: Minimal investment in data protection measures
**Reality**: Data security is fundamental to GDPR compliance
**Solution**: Implement comprehensive technical and organizational measures

## Conclusion

GDPR compliance is an ongoing process that requires regular attention and updates. Small businesses can achieve compliance through systematic implementation of privacy principles, clear policies, and robust data protection measures.

**Key Takeaways**:
- **Start with data audit**: Understand what data you process and why
- **Implement privacy by design**: Build privacy into business processes
- **Train your team**: Ensure staff understand GDPR requirements
- **Monitor and update**: Regularly review and improve compliance measures
- **Seek professional help**: Consult with privacy professionals when needed

**Disclaimer**: This guide provides general information about GDPR compliance and does not constitute legal advice. GDPR requirements can be complex and situation-specific. Always consult with qualified data protection professionals or attorneys for guidance specific to your business circumstances.`,
        category: 'Data Privacy',
        tags: ['gdpr', 'privacy', 'compliance', 'data-protection'],
        readTime: 15,
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
