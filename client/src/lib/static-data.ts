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
  }
];

export const staticBlogPosts = [
  {
    id: 1,
    title: "Employment Contract Essentials: What Every Business Owner Should Know",
    slug: "employment-contract-essentials",
    excerpt: "Learn the key components of effective employment contracts and how to protect your business while ensuring fair treatment of employees.",
    content: "Employment contracts are the foundation of any successful business relationship...",
    category: "Employment Law",
    tags: ["employment", "contracts", "business"],
    publishedAt: new Date().toISOString(),
    views: 1250,
    readTime: 8
  },
  {
    id: 2,
    title: "NDA Best Practices for Startups and Small Businesses",
    slug: "nda-best-practices-startups",
    excerpt: "Discover how to protect your intellectual property with well-crafted non-disclosure agreements that actually hold up in court.",
    content: "Non-disclosure agreements (NDAs) are crucial for protecting sensitive business information...",
    category: "Intellectual Property",
    tags: ["nda", "intellectual-property", "startups"],
    publishedAt: new Date().toISOString(),
    views: 950,
    readTime: 6
  }
];