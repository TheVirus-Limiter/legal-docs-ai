import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdBanner } from "@/components/AdBanner";
import { FileText, Clock, Users, Star } from "lucide-react";
import type { DocumentTemplate } from "@shared/schema";

export default function DocumentTypes() {
  const { data: templates, isLoading } = useQuery<DocumentTemplate[]>({
    queryKey: ['/api/templates'],
  });

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
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Browse our comprehensive collection of AI-powered legal document templates. 
              Each template is designed for state-specific compliance and professional formatting.
            </p>
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
                        {Math.floor(Math.random() * 1000 + 500)} generated
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                        4.{Math.floor(Math.random() * 3 + 5)}
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
                      <Link href="/" className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Generate Now
                        </Button>
                      </Link>
                      <Button variant="outline" size="default">
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
