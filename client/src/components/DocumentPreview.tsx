import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Edit3, Save, X } from "lucide-react";
import { generatePDF, downloadDocument } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

interface DocumentPreviewProps {
  documentId: number;
  title: string;
  content: string;
  onClose: () => void;
}

export function DocumentPreview({ documentId, title, content, onClose }: DocumentPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    try {
      await downloadDocument(documentId);
      generatePDF(editedContent, title);
      toast({
        title: "Document Downloaded",
        description: "Your document has been prepared for download.",
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Failed to prepare document for download.",
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    toast({
      title: "Changes Saved",
      description: "Your document has been updated.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSaveEdit} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </>
            )}
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-[600px] border-0 resize-none focus:ring-0 font-mono text-sm"
                placeholder="Edit your document content..."
              />
            ) : (
              <div className="p-8 font-serif leading-relaxed">
                <div 
                  className="whitespace-pre-wrap"
                  style={{ fontFamily: 'Times New Roman, serif' }}
                  dangerouslySetInnerHTML={{ 
                    __html: editedContent
                      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-black mb-4 mt-6">$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-black mb-3 mt-5">$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-black mb-2 mt-4">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-black">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                      .replace(/^\- (.*$)/gm, '<li class="leading-relaxed mb-1 ml-4">$1</li>')
                      .replace(/^(\d+)\. (.*$)/gm, '<li class="leading-relaxed mb-1 ml-4">$2</li>')
                      .replace(/(<li.*?>.*?<\/li>)/gms, '<ul class="list-disc list-inside mb-3 space-y-1">$1</ul>')
                      .replace(/\n\n/g, '</p><p class="mb-3 leading-relaxed">')
                      .replace(/^(?!<[h|u|l])/gm, '<p class="mb-3 leading-relaxed">')
                      .replace(/$(?![<\/])/gm, '</p>')
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </div>
  );
}
