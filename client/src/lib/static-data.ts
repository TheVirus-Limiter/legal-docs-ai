// Static data for GitHub Pages deployment
export const staticTemplates = [
  {
    type: "employment",
    name: "Employment Contract",
    description: "Comprehensive employment agreements with salary, benefits, and terms of employment.",
    fields: {
      employeeName: { type: "text", required: true, label: "Employee Name" },
      employerName: { type: "text", required: true, label: "Employer/Company Name" },
      jobTitle: { type: "text", required: true, label: "Job Title" },
      startDate: { type: "date", required: true, label: "Start Date" },
      salary: { type: "text", required: true, label: "Annual Salary" },
      benefits: { type: "textarea", required: true, label: "Benefits Package" },
      workSchedule: { type: "select", required: true, label: "Work Schedule", options: ["full-time", "part-time", "contract"] },
      terminationClause: { type: "textarea", required: true, label: "Termination Conditions" }
    },
    estimatedTime: 5,
    id: 1,
    popularity: 0
  },
  {
    type: "nda",
    name: "Non-Disclosure Agreement",
    description: "Protect confidential information and trade secrets with comprehensive NDA templates.",
    fields: {
      party1Name: { type: "text", required: true, label: "Disclosing Party Name" },
      party2Name: { type: "text", required: true, label: "Receiving Party Name" },
      effectiveDate: { type: "date", required: true, label: "Effective Date" },
      confidentialInfo: { type: "textarea", required: true, label: "Definition of Confidential Information" },
      duration: { type: "text", required: true, label: "Duration of Agreement" },
      exceptions: { type: "textarea", required: true, label: "Exceptions to Confidentiality" }
    },
    estimatedTime: 3,
    id: 2,
    popularity: 0
  },
  {
    type: "service",
    name: "Service Agreement",
    description: "Professional service contracts for consultants, freelancers, and service providers.",
    fields: {
      clientName: { type: "text", required: true, label: "Client Name" },
      providerName: { type: "text", required: true, label: "Service Provider Name" },
      serviceDescription: { type: "textarea", required: true, label: "Services to be Provided" },
      paymentTerms: { type: "text", required: true, label: "Payment Terms" },
      deliverables: { type: "textarea", required: true, label: "Expected Deliverables" },
      timeline: { type: "text", required: true, label: "Project Timeline" }
    },
    estimatedTime: 4,
    id: 3,
    popularity: 0
  },
  {
    type: "lease",
    name: "Commercial Lease Agreement",
    description: "Commercial property lease agreements for offices, retail spaces, and warehouses.",
    fields: {
      landlordName: { type: "text", required: true, label: "Landlord Name" },
      tenantName: { type: "text", required: true, label: "Tenant Name" },
      propertyAddress: { type: "textarea", required: true, label: "Property Address" },
      leaseTerms: { type: "text", required: true, label: "Lease Term (months/years)" },
      monthlyRent: { type: "text", required: true, label: "Monthly Rent Amount" },
      securityDeposit: { type: "text", required: true, label: "Security Deposit" },
      usageRestrictions: { type: "textarea", required: true, label: "Property Usage Restrictions" },
      maintenanceResponsibilities: { type: "textarea", required: true, label: "Maintenance Responsibilities" }
    },
    estimatedTime: 7,
    id: 4,
    popularity: 0
  },
  {
    type: "llc",
    name: "LLC Operating Agreement",
    description: "Limited liability company formation documents and operating agreements.",
    fields: {
      companyName: { type: "text", required: true, label: "Company Name" },
      member1Name: { type: "text", required: true, label: "Member 1 Name" },
      member1Percentage: { type: "text", required: true, label: "Member 1 Ownership %" },
      member2Name: { type: "text", required: false, label: "Member 2 Name" },
      member2Percentage: { type: "text", required: false, label: "Member 2 Ownership %" },
      businessPurpose: { type: "textarea", required: true, label: "Business Purpose" },
      managementStructure: { type: "select", required: true, label: "Management Structure", options: ["member-managed", "manager-managed"] },
      capitalContribution: { type: "text", required: true, label: "Total Capital Contribution" }
    },
    estimatedTime: 6,
    id: 5,
    popularity: 0
  },
  {
    type: "privacy",
    name: "Privacy Policy",
    description: "GDPR and CCPA compliant privacy policies for websites and applications.",
    fields: {
      companyName: { type: "text", required: true, label: "Company Name" },
      websiteUrl: { type: "text", required: true, label: "Website URL" },
      contactEmail: { type: "text", required: true, label: "Contact Email" },
      dataCollected: { type: "textarea", required: true, label: "Data Collected" },
      dataUsage: { type: "textarea", required: true, label: "How Data is Used" },
      thirdPartyServices: { type: "textarea", required: true, label: "Third-Party Services" },
      cookieUsage: { type: "select", required: true, label: "Cookie Usage", options: ["analytics", "marketing", "essential", "all"] }
    },
    estimatedTime: 5,
    id: 6,
    popularity: 0
  },
  {
    type: "terms",
    name: "Terms of Service",
    description: "Website and application terms of service agreements for user compliance.",
    fields: {
      companyName: { type: "text", required: true, label: "Company Name" },
      websiteUrl: { type: "text", required: true, label: "Website/Service URL" },
      serviceDescription: { type: "textarea", required: true, label: "Service Description" },
      userObligations: { type: "textarea", required: true, label: "User Obligations" },
      prohibitedActivities: { type: "textarea", required: true, label: "Prohibited Activities" },
      paymentTerms: { type: "textarea", required: false, label: "Payment Terms (if applicable)" },
      terminationConditions: { type: "textarea", required: true, label: "Termination Conditions" }
    },
    estimatedTime: 5,
    id: 7,
    popularity: 0
  },
  {
    type: "contractor",
    name: "Independent Contractor Agreement",
    description: "Freelance and independent contractor agreements with clear terms and deliverables.",
    fields: {
      contractorName: { type: "text", required: true, label: "Contractor Name" },
      clientName: { type: "text", required: true, label: "Client Name" },
      projectDescription: { type: "textarea", required: true, label: "Project Description" },
      deliverables: { type: "textarea", required: true, label: "Deliverables" },
      paymentAmount: { type: "text", required: true, label: "Payment Amount" },
      paymentSchedule: { type: "select", required: true, label: "Payment Schedule", options: ["milestone", "hourly", "fixed", "monthly"] },
      deadline: { type: "date", required: true, label: "Project Deadline" },
      intellectualProperty: { type: "textarea", required: true, label: "Intellectual Property Rights" }
    },
    estimatedTime: 4,
    id: 8,
    popularity: 0
  }
];

export const staticBlogPosts = [
  {
    id: 1,
    title: "Employment Contract Essentials: What Every Business Owner Should Know",
    slug: "employment-contract-essentials",
    excerpt: "Learn the key components of effective employment contracts and how to protect your business while ensuring fair treatment of employees.",
    content: "Employment contracts are the foundation of any successful business relationship. A well-crafted employment contract protects both employer and employee interests while establishing clear expectations for the working relationship.\n\n## Key Components of an Employment Contract\n\n### 1. Job Description and Responsibilities\nClearly define the employee's role, duties, and reporting structure. This prevents confusion and sets performance expectations from day one.\n\n### 2. Compensation and Benefits\nSpecify salary, bonuses, health insurance, retirement plans, and other benefits. Include payment schedule and any performance-based incentives.\n\n### 3. Work Schedule and Location\nDefine working hours, remote work policies, and any flexibility arrangements. This is especially important in today's hybrid work environment.\n\n### 4. Termination Clauses\nOutline conditions for termination, notice periods, and severance arrangements. Include both voluntary and involuntary termination scenarios.\n\n### 5. Confidentiality and Non-Compete\nProtect sensitive business information with appropriate confidentiality clauses. Ensure non-compete restrictions are reasonable and enforceable.\n\n## State-Specific Considerations\n\nEmployment laws vary significantly by state. California has strict rules about non-compete agreements, while Texas allows more flexibility. Always consult state-specific requirements when drafting contracts.\n\n## Best Practices\n\n- Use clear, simple language\n- Avoid overly restrictive clauses\n- Include dispute resolution procedures\n- Regular review and updates as laws change\n- Ensure mutual understanding before signing\n\nA comprehensive employment contract sets the foundation for a successful working relationship while protecting your business interests.",
    category: "Employment Law",
    author: "Legal Team",
    tags: ["employment", "contracts", "business"],
    publishedAt: "2024-12-15T10:00:00Z",
    views: 1250
  },
  {
    id: 2,
    title: "NDA Best Practices for Startups and Small Businesses",
    slug: "nda-best-practices-startups",
    excerpt: "Discover how to protect your intellectual property with well-crafted non-disclosure agreements that actually hold up in court.",
    content: "Non-disclosure agreements (NDAs) are crucial for protecting sensitive business information, especially for startups and small businesses that rely heavily on intellectual property and trade secrets.\n\n## When to Use NDAs\n\n### Business Meetings\nUse NDAs before discussing:\n- Business plans and strategies\n- Financial information\n- Customer lists and data\n- Proprietary technology or processes\n\n### Employee Relationships\nProtect sensitive information shared with:\n- New hires during onboarding\n- Contractors and freelancers\n- Consultants and advisors\n- Departing employees\n\n## Key Elements of Effective NDAs\n\n### 1. Clear Definition of Confidential Information\nSpecify exactly what information is considered confidential. Avoid overly broad definitions that could be unenforceable.\n\n### 2. Reasonable Duration\nSet appropriate time limits. Courts may reject overly long restrictions. Typical durations range from 1-5 years depending on the industry.\n\n### 3. Permitted Disclosures\nInclude standard exceptions for:\n- Publicly available information\n- Information known before disclosure\n- Information independently developed\n- Court-ordered disclosures\n\n### 4. Consequences of Breach\nClearly state remedies for violations, including:\n- Monetary damages\n- Injunctive relief\n- Attorney fees\n- Return of confidential materials\n\n## Common Mistakes to Avoid\n\n- Making agreements too broad or vague\n- Setting unreasonable time limits\n- Failing to specify governing law\n- Not requiring return of materials\n- Inadequate consideration for standalone NDAs\n\n## Industry-Specific Considerations\n\nTech startups need stronger protection for algorithms and code, while service businesses may focus more on customer relationships and operational processes.\n\nRemember: A well-drafted NDA protects your business while maintaining professional relationships. Overly restrictive agreements can damage partnerships and may not be enforceable.",
    category: "Intellectual Property",
    author: "IP Legal Team",
    tags: ["nda", "intellectual-property", "startups"],
    publishedAt: "2024-12-10T14:30:00Z",
    views: 950
  },
  {
    id: 3,
    title: "State-by-State Guide to Business Formation Laws",
    slug: "state-business-formation-guide",
    excerpt: "Navigate the complex landscape of business formation requirements across different states with our comprehensive guide.",
    content: "Choosing the right state for business formation can significantly impact your company's success, tax obligations, and operational flexibility.\n\n## Popular Business Formation States\n\n### Delaware\n- Business-friendly court system\n- Strong corporate law precedents\n- Privacy protections for owners\n- No sales tax on intangible property\n\n### Nevada\n- No state income tax\n- Strong privacy protections\n- Flexible corporate structures\n- No franchise tax for LLCs\n\n### Wyoming\n- Lowest fees in the nation\n- Strong asset protection laws\n- No state income tax\n- Minimal reporting requirements\n\n### California\n- Large market access\n- Innovation-friendly environment\n- Higher fees and taxes\n- Strict compliance requirements\n\n## Key Factors to Consider\n\n### 1. Tax Implications\n- State income tax rates\n- Franchise tax requirements\n- Sales tax obligations\n- Property tax considerations\n\n### 2. Regulatory Environment\n- Ease of doing business\n- Industry-specific regulations\n- Employment law requirements\n- Environmental regulations\n\n### 3. Operational Needs\n- Physical presence requirements\n- Meeting and record-keeping rules\n- Annual reporting obligations\n- Registered agent requirements\n\n## LLC vs Corporation by State\n\nSome states favor LLCs with lower fees and simpler requirements, while others offer advantages for corporations through favorable tax treatment or legal protections.\n\n## Ongoing Compliance\n\nRemember that formation is just the beginning. Each state has different requirements for:\n- Annual reports and filings\n- Tax returns and payments\n- License renewals\n- Registered agent maintenance\n\nChoose your formation state carefully based on your business goals, not just initial cost savings.",
    category: "Business Formation",
    author: "Corporate Legal Team",
    tags: ["business-formation", "state-law", "incorporation"],
    publishedAt: "2024-12-08T09:15:00Z",
    views: 2100
  },
  {
    id: 4,
    title: "Remote Work Legal Considerations for Employers",
    slug: "remote-work-legal-considerations",
    excerpt: "Essential legal guidelines for managing remote employees across state lines and ensuring compliance with varying labor laws.",
    content: "The shift to remote work has created new legal challenges for employers, especially when employees work across state lines.\n\n## Multi-State Employment Issues\n\n### Tax Implications\n- State income tax withholding requirements\n- Unemployment insurance obligations\n- Workers' compensation coverage\n- Business license requirements in employee states\n\n### Labor Law Compliance\nDifferent states have varying requirements for:\n- Minimum wage and overtime\n- Meal and rest break requirements\n- Paid sick leave policies\n- Family and medical leave\n\n## Essential Remote Work Policies\n\n### 1. Equipment and Expense Reimbursement\n- Home office setup requirements\n- Internet and phone reimbursement\n- Equipment security and return policies\n- Maintenance and replacement procedures\n\n### 2. Data Security and Privacy\n- VPN and security software requirements\n- Confidential information handling\n- Personal device usage policies\n- Data breach response procedures\n\n### 3. Performance and Time Tracking\n- Clear performance metrics\n- Time tracking requirements\n- Communication expectations\n- Meeting and availability standards\n\n## Workers' Compensation Considerations\n\nRemote work raises questions about:\n- Coverage for home office injuries\n- Defining the workplace\n- Employee safety responsibilities\n- Incident reporting procedures\n\n## Immigration and International Employees\n\nSpecial considerations for:\n- Visa requirements for remote work\n- Tax treaty implications\n- Local employment law compliance\n- Currency and payment processing\n\n## Best Practices\n\n1. **Clear Written Policies**: Document all remote work expectations and requirements\n2. **Regular Legal Reviews**: Stay updated on changing state and federal requirements\n3. **Employee Training**: Ensure all remote workers understand policies and procedures\n4. **Technology Solutions**: Implement proper tools for compliance and communication\n\nStay ahead of evolving remote work regulations to protect your business and support your distributed workforce.",
    category: "Employment Law",
    author: "Employment Legal Team",
    tags: ["remote-work", "employment-law", "compliance"],
    publishedAt: "2024-12-05T11:45:00Z",
    views: 1800
  },
  {
    id: 5,
    title: "GDPR and CCPA Compliance for Small Businesses",
    slug: "gdpr-ccpa-compliance-small-business",
    excerpt: "Navigate data privacy regulations with practical compliance strategies for small businesses operating in multiple jurisdictions.",
    content: "Data privacy regulations like GDPR and CCPA affect businesses of all sizes. Here's how small businesses can achieve compliance without breaking the bank.\n\n## Understanding the Scope\n\n### GDPR (General Data Protection Regulation)\n- Applies to EU residents' data\n- Significant fines for non-compliance\n- Requires explicit consent for data processing\n- Mandates data portability and deletion rights\n\n### CCPA (California Consumer Privacy Act)\n- Covers California residents\n- Applies to businesses meeting specific thresholds\n- Requires disclosure of data collection practices\n- Grants consumers deletion and opt-out rights\n\n## Key Compliance Requirements\n\n### 1. Data Mapping and Inventory\n- Identify all personal data collected\n- Document data processing purposes\n- Track data sharing with third parties\n- Maintain records of processing activities\n\n### 2. Privacy Policies and Notices\n- Clear, accessible privacy policies\n- Cookie consent mechanisms\n- Data collection notifications\n- Regular policy updates\n\n### 3. Consent Management\n- Explicit consent for data processing\n- Easy withdrawal mechanisms\n- Age verification for minors\n- Granular consent options\n\n### 4. Data Subject Rights\nImplement processes for:\n- Access requests\n- Data portability\n- Deletion requests\n- Correction of inaccurate data\n\n## Practical Implementation Steps\n\n### Phase 1: Assessment\n- Conduct data audit\n- Identify compliance gaps\n- Assess third-party vendors\n- Determine applicable regulations\n\n### Phase 2: Policy Development\n- Draft privacy policies\n- Create consent forms\n- Develop internal procedures\n- Train staff on requirements\n\n### Phase 3: Technical Implementation\n- Install consent management tools\n- Set up data request processes\n- Implement security measures\n- Create data deletion procedures\n\n## Cost-Effective Solutions\n\n- Use privacy policy generators\n- Implement free consent management tools\n- Leverage cloud provider compliance features\n- Consider compliance software for growing businesses\n\n## Common Pitfalls\n\n- Assuming small businesses are exempt\n- Using outdated privacy policies\n- Failing to respond to data requests timely\n- Inadequate vendor due diligence\n\nStart with basic compliance and gradually enhance your privacy program as your business grows.",
    category: "Privacy & Compliance",
    author: "Privacy Legal Team",
    tags: ["gdpr", "ccpa", "privacy", "compliance"],
    publishedAt: "2024-12-01T16:20:00Z",
    views: 1650
  }
];