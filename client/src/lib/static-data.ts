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