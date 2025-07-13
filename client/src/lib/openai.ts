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
  const response = await fetch('/api/generate-document', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate document');
  }

  return response.json();
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
