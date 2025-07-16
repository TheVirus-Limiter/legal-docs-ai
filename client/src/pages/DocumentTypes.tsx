import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdBanner } from "@/components/AdBanner";
import { FileText, Clock, Users, Star } from "lucide-react";
import { staticTemplates } from "../lib/static-data";
import type { DocumentTemplate } from "@shared/schema";

export default function DocumentTypes() {
  const templates = staticTemplates as DocumentTemplate[];
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading document templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-4">
              Legal Document Templates
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Browse our comprehensive collection of AI-powered legal document templates. 
              Each template is designed for state-specific compliance and professional formatting.
              Generate professional documents in minutes with our expert-vetted templates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">8+ Document Categories</h3>
                <p className="text-sm text-neutral-600">Employment, Business, Real Estate, and more</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">5-Minute Generation</h3>
                <p className="text-sm text-neutral-600">From template selection to PDF download</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">50+ States Supported</h3>
                <p className="text-sm text-neutral-600">State-specific legal requirements included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <AdBanner size="skyscraper" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Employment Law
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Business Formation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Real Estate
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Privacy & Compliance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* In-Content Ad */}
            <div className="mb-8">
              <AdBanner size="rectangle" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates?.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <FileText className="text-blue-600 w-6 h-6 mr-3" />
                        <CardTitle className="text-xl">{template.name}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Free
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-neutral-600">{template.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        ~{template.estimatedTime} min
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Popular template
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                        Professional
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Key Features:</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• State-specific compliance included</li>
                        <li>• Professional legal formatting</li>
                        <li>• Instant PDF generation</li>
                        <li>• Fully customizable</li>
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {
                        // Scroll to generator section on home page
                        window.location.href = '/#generator';
                        setTimeout(() => {
                          const generator = document.getElementById('generator');
                          if (generator) {
                            generator.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      }}>
                        Generate Now
                      </Button>
                      <Button variant="outline" size="default" onClick={() => {
                        alert('Template preview coming soon! Click "Generate Now" to start creating your document.');
                      }}>
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom Ad */}
            <div className="mt-12">
              <AdBanner size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
