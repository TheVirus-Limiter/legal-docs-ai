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
          margin-top: 2em;
          margin-bottom: 1em;
        }
        h1 {
          text-align: center;
          text-transform: uppercase;
          font-size: 18px;
        }
        p {
          margin-bottom: 1em;
          text-align: justify;
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
      ${content.replace(/\n/g, '<br>')}
    </body>
    </html>
  `);

  printWindow.document.close();
  
  // Wait for content to load then trigger print
  setTimeout(() => {
    printWindow.print();
  }, 250);
}
