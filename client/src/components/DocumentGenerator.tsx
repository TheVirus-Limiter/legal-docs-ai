import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, FileText, Clock, Users } from "lucide-react";
import { StateSelector } from "./StateSelector";
import { DocumentPreview } from "./DocumentPreview";
import { generateDocument } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { staticTemplates } from "@/lib/static-data";
import type { DocumentTemplate } from "@shared/schema";

const formSchema = z.object({
  documentType: z.string().min(1, "Please select a document type"),
  state: z.string().min(2, "Please select a state"),
  formData: z.record(z.any()),
});

type FormData = z.infer<typeof formSchema>;

export function DocumentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [generatedDoc, setGeneratedDoc] = useState<{ id: number; title: string; content: string } | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const templates = staticTemplates as DocumentTemplate[];
  const templatesLoading = false;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: "",
      state: "",
      formData: {},
    },
  });

  const generateMutation = useMutation({
    mutationFn: generateDocument,
    onSuccess: (data) => {
      setGeneratedDoc(data);
      toast({
        title: "Document Generated Successfully",
        description: "Your document is ready for review and download.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onDocumentTypeSelect = (templateType: string) => {
    const template = templates?.find(t => t.type === templateType);
    if (template) {
      setSelectedTemplate(template);
      form.setValue("documentType", templateType);
      // Reset form data when template changes
      form.setValue("formData", {});
    }
  };

  const onSubmit = (data: FormData) => {
    if (!selectedTemplate) return;
    
    generateMutation.mutate({
      type: data.documentType,
      state: data.state,
      formData: data.formData,
    });
  };

  const renderFormFields = () => {
    if (!selectedTemplate) return null;

    const fields = selectedTemplate.fields as Record<string, any>;
    
    return Object.entries(fields).map(([fieldKey, fieldConfig]) => (
      <FormField
        key={fieldKey}
        control={form.control}
        name={`formData.${fieldKey}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldConfig.label}</FormLabel>
            <FormControl>
              {fieldConfig.type === 'textarea' ? (
                <Textarea
                  placeholder={`Enter ${fieldConfig.label.toLowerCase()}...`}
                  {...field}
                  className="min-h-[100px]"
                />
              ) : fieldConfig.type === 'select' ? (
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${fieldConfig.label.toLowerCase()}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldConfig.options?.map((option: string) => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={fieldConfig.type}
                  placeholder={`Enter ${fieldConfig.label.toLowerCase()}...`}
                  {...field}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  if (templatesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Document Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Choose Document Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates?.map((template) => (
              <div
                key={template.id}
                onClick={() => onDocumentTypeSelect(template.type)}
                className={`group cursor-pointer border rounded-lg p-6 transition-all hover:border-blue-600 hover:shadow-md ${
                  selectedTemplate?.type === template.type 
                    ? 'border-blue-600 bg-blue-50 shadow-md' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center mb-3">
                  <FileText className="text-blue-600 text-xl mr-3" />
                  <h4 className="font-semibold">{template.name}</h4>
                </div>
                <p className="text-sm text-neutral-600 mb-3">{template.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Free</span>
                  <div className="flex items-center text-xs text-neutral-500">
                    <Clock className="w-3 h-3 mr-1" />
                    ~{template.estimatedTime} min
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDocumentTypeSelect(template.type);
                    // Scroll to the form section after selection
                    setTimeout(() => {
                      const formSection = document.querySelector('[data-form-section]');
                      if (formSection) {
                        formSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  Generate Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* State Selection and Form */}
      {selectedTemplate && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-form-section>
            {/* State Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Your State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <StateSelector
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Label className="block text-sm font-medium text-neutral-700 mb-2">
                      Business Type (Optional)
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select business type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LLC">LLC</SelectItem>
                        <SelectItem value="Corporation">Corporation</SelectItem>
                        <SelectItem value="Partnership">Partnership</SelectItem>
                        <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">
                    <i className="fas fa-info-circle mr-2"></i>
                    We'll automatically include state-specific legal requirements and compliance clauses.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Document Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormFields()}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={generateMutation.isPending}
                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                    size="lg"
                  >
                    {generateMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Document...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Document with AI
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-neutral-700 hover:bg-gray-50"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      )}

      {/* Document Preview Modal */}
      {generatedDoc && (
        <DocumentPreview
          documentId={generatedDoc.id}
          title={generatedDoc.title}
          content={generatedDoc.content}
          onClose={() => setGeneratedDoc(null)}
        />
      )}
    </div>
  );
}
