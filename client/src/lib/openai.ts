// This file contains utility functions for document generation
// The actual OpenAI API calls are handled on the server side

export interface DocumentGenerationRequest {
  type: string;
  state: string;
  formData: Record<string, any>;
}

export interface DocumentGenerationResponse {
  documentId: number;
  content: string;
  title: string;
}

export async function generateDocument(request: DocumentGenerationRequest): Promise<DocumentGenerationResponse> {
  // For GitHub Pages deployment, we'll generate a sample document
  // In production, this would connect to OpenAI API
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const documentTypes: Record<string, string> = {
    employment: "Employment Contract",
    nda: "Non-Disclosure Agreement", 
    lease: "Lease Agreement",
    purchase: "Purchase Agreement",
    service: "Service Agreement",
    partnership: "Partnership Agreement",
    consulting: "Consulting Agreement",
    contractor: "Independent Contractor Agreement"
  };

  const title = documentTypes[request.type] || "Legal Document";
  
  // Generate sample content based on form data
  const content = generateSampleDocument(request);
  
  return {
    documentId: Math.floor(Math.random() * 10000),
    title,
    content
  };
}

function generateSampleDocument(request: DocumentGenerationRequest): string {
  const { type, state, formData } = request;
  
  if (type === "employment") {
    return `# EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on ${formData.startDate || '[START DATE]'} between **${formData.employerName || '[EMPLOYER NAME]'}** ("Company") and **${formData.employeeName || '[EMPLOYEE NAME]'}** ("Employee").

## 1. POSITION AND DUTIES

Employee is hired as **${formData.jobTitle || '[JOB TITLE]'}** and agrees to perform duties assigned by the Company.

## 2. COMPENSATION

Employee will receive an annual salary of **${formData.salary || '[SALARY AMOUNT]'}** paid in accordance with Company's standard payroll practices.

## 3. BENEFITS

The Company will provide the following benefits:
${formData.benefits || '- Health insurance\n- Paid time off\n- 401(k) retirement plan'}

## 4. WORK SCHEDULE

Employment type: **${formData.workSchedule || 'Full-time'}**

## 5. TERMINATION

${formData.terminationClause || 'Either party may terminate this agreement with two weeks written notice.'}

## 6. STATE COMPLIANCE

This agreement complies with ${state} employment laws and regulations.

**EMPLOYER:**                    **EMPLOYEE:**

_________________________        _________________________
${formData.employerName || '[EMPLOYER NAME]'}              ${formData.employeeName || '[EMPLOYEE NAME]'}

Date: _________________         Date: _________________`;
  }
  
  if (type === "nda") {
    return `# NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is effective ${formData.effectiveDate || '[EFFECTIVE DATE]'} between **${formData.party1Name || '[DISCLOSING PARTY]'}** ("Disclosing Party") and **${formData.party2Name || '[RECEIVING PARTY]'}** ("Receiving Party").

## 1. CONFIDENTIAL INFORMATION

Confidential Information includes: ${formData.confidentialInfo || 'Trade secrets, business plans, customer lists, and proprietary information.'}

## 2. DURATION

This agreement shall remain in effect for **${formData.duration || '2 years'}** from the effective date.

## 3. EXCEPTIONS

The following information is not considered confidential:
${formData.exceptions || '- Information already in public domain\n- Information independently developed\n- Information received from third parties'}

## 4. STATE COMPLIANCE

This agreement is governed by the laws of ${state}.

**DISCLOSING PARTY:**           **RECEIVING PARTY:**

_________________________       _________________________
${formData.party1Name || '[DISCLOSING PARTY]'}            ${formData.party2Name || '[RECEIVING PARTY]'}

Date: _________________        Date: _________________`;
  }
  
  // Default template for other document types
  return `# ${type.toUpperCase()} AGREEMENT

This agreement is entered into between the parties and complies with ${state} law.

## Terms and Conditions

[Document content will be generated based on your specific requirements and state regulations.]

**PARTY 1:**                    **PARTY 2:**

_________________________       _________________________

Date: _________________        Date: _________________`;
}

export async function downloadDocument(documentId: number): Promise<void> {
  const response = await fetch(`/api/documents/${documentId}/download`, {
    method: 'POST',
  });

  if (!response.ok) {
    console.warn('Failed to track document download');
  }
}

export function generatePDF(content: string, title: string): void {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  // Convert markdown to HTML for printing
  const formattedContent = content
    .replace(/^# (.*$)/gm, '<h1 style="text-align: center; text-transform: uppercase; font-size: 18px; margin: 2em 0 1em 0;">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 style="font-size: 16px; margin: 1.5em 0 1em 0;">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 style="font-size: 14px; margin: 1em 0 0.5em 0;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
    .replace(/(<li>.*?<\/li>)/gms, '<ul style="margin: 1em 0; padding-left: 2em;">$1</ul>')
    .replace(/\n\n/g, '</p><p style="margin-bottom: 1em; text-align: justify;">')
    .replace(/^(?!<[h|u|l])/gm, '<p style="margin-bottom: 1em; text-align: justify;">')
    .replace(/$(?![<\/])/gm, '</p>');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          font-family: 'Times New Roman', serif;
          line-height: 1.6;
          margin: 1in;
          color: #000;
        }
        h1, h2, h3 {
          color: #000;
        }
        ul {
          list-style-type: disc;
        }
        li {
          margin-bottom: 0.5em;
        }
        .signature-line {
          border-bottom: 1px solid #000;
          width: 200px;
          margin: 2em 0 0.5em 0;
        }
        .date-line {
          border-bottom: 1px solid #000;
          width: 150px;
          display: inline-block;
          margin-left: 2em;
        }
        @media print {
          body { margin: 0.5in; }
        }
      </style>
    </head>
    <body>
      ${formattedContent}
    </body>
    </html>
  `);

  printWindow.document.close();
  
  // Wait for content to load then trigger print
  setTimeout(() => {
    printWindow.print();
  }, 250);
}
