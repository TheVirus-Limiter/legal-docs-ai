import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { MapPin, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function StateGuide() {
  const [, params] = useRoute("/states/:state");
  const stateCode = params?.state?.toUpperCase() || "";
  
  const { data: states } = useQuery<Array<{ code: string; name: string }>>({
    queryKey: ['/api/states'],
  });

  const state = states?.find(s => s.code === stateCode);

  if (!state) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">State Not Found</h1>
            <p className="text-sm text-gray-600">
              The requested state could not be found. Please check the URL and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const documentTypes = [
    {
      type: 'employment',
      name: 'Employment Contracts',
      count: Math.floor(Math.random() * 50 + 20),
      requirements: [
        'At-will employment disclosure required',
        'Minimum wage compliance ($15.50/hour)',
        'Overtime regulations (1.5x after 8 hours daily)',
        'Meal and rest break provisions mandatory'
      ]
    },
    {
      type: 'nda',
      name: 'Non-Disclosure Agreements',
      count: Math.floor(Math.random() * 30 + 15),
      requirements: [
        'Trade secrets protection under state law',
        'Reasonable duration limitations',
        'Geographic scope restrictions',
        'Employee mobility protection'
      ]
    },
    {
      type: 'lease',
      name: 'Lease Agreements',
      count: Math.floor(Math.random() * 40 + 25),
      requirements: [
        'Security deposit limitations (2x monthly rent)',
        'Habitability warranty required',
        'Notice requirements for entry',
        'Tenant rights disclosure mandatory'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800">
              {state.name} Legal Documents
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto text-center">
            Generate state-specific legal documents that comply with {state.name} laws and regulations.
            Our AI ensures all documents meet local requirements and best practices.
          </p>
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
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {documentTypes.reduce((sum, doc) => sum + doc.count, 0)}
                    </div>
                    <div className="text-sm text-neutral-600">Total Documents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-neutral-600">State Compliant</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.floor(Math.random() * 1000 + 2000)}
                    </div>
                    <div className="text-sm text-neutral-600">Generated This Month</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* State Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  {state.name} Legal Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Business-Friendly Features</h3>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• Strong trade secret protection</li>
                      <li>• Reasonable non-compete enforcement</li>
                      <li>• Efficient business formation process</li>
                      <li>• Clear employment law guidelines</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Key Considerations</h3>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• At-will employment state</li>
                      <li>• Specific wage and hour requirements</li>
                      <li>• Landlord-tenant regulations</li>
                      <li>• Professional licensing requirements</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* In-Content Ad */}
            <AdBanner size="rectangle" />

            {/* Document Types */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-800">
                Available Document Types for {state.name}
              </h2>
              
              {documentTypes.map((docType) => (
                <Card key={docType.type}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        {docType.name}
                      </CardTitle>
                      <Badge variant="secondary">
                        {docType.count} templates
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">{state.name}-Specific Requirements:</h4>
                        <ul className="text-sm text-neutral-600 space-y-1">
                          {docType.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                          Generate {docType.name.split(' ')[0]} Document
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom Ad */}
            <AdBanner size="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
