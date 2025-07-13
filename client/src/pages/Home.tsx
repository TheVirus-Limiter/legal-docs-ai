import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { FileText, Shield, Download, Clock, MapPin, Brain, Star, ChevronRight } from "lucide-react";
import type { DocumentTemplate, BlogPost } from "@shared/schema";

export default function Home() {
  const { data: templates } = useQuery<DocumentTemplate[]>({
    queryKey: ['/api/templates'],
  });

  const { data: blogPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const usStates = [
    { code: 'CA', name: 'California', docs: 245 },
    { code: 'NY', name: 'New York', docs: 198 },
    { code: 'TX', name: 'Texas', docs: 189 },
    { code: 'FL', name: 'Florida', docs: 167 },
    { code: 'IL', name: 'Illinois', docs: 156 },
    { code: 'PA', name: 'Pennsylvania', docs: 143 },
    { code: 'OH', name: 'Ohio', docs: 134 },
    { code: 'GA', name: 'Georgia', docs: 128 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Generate Professional Legal Documents with{" "}
                <span className="text-yellow-300">AI Technology</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Create contracts, business forms, and legal documents in minutes. State-specific compliance, AI-powered customization, completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="#generator">
                  <Button size="lg" className="bg-green-600 text-white hover:bg-green-700">
                    <FileText className="w-5 h-5 mr-2" />
                    Start Generating Documents
                  </Button>
                </Link>
                <Link href="#generator">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
                    <FileText className="w-5 h-5 mr-2 text-white" />
                    <span className="text-white">Browse Templates</span>
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-400"></i>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-400" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-green-400" />
                  <span>Instant PDF Export</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <Card className="bg-white text-neutral-800 shadow-2xl">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">Employment Contract</CardTitle>
                  <p className="text-sm text-neutral-600">Generated in 30 seconds</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Employee:</span>
                      <span className="text-sm font-medium">John Smith</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Position:</span>
                      <span className="text-sm font-medium">Software Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">State:</span>
                      <span className="text-sm font-medium">California</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-medium">✓ California Labor Code Compliant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* First Ad Break */}
      <div className="bg-neutral-100 py-4">
        <AdBanner size="medium-rectangle" className="max-w-7xl mx-auto px-4" />
      </div>

      {/* Trust Indicators */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">
              Trusted by businesses nationwide
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">50,000+</div>
              <div className="text-sm text-neutral-600">Documents Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">50</div>
              <div className="text-sm text-neutral-600">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">99.8%</div>
              <div className="text-sm text-neutral-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-neutral-600">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* In-Content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner size="rectangle" />
      </div>

      {/* Document Generator Section */}
      <section id="generator" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Ad */}
            <div className="lg:col-span-1 order-last lg:order-first">
              <div className="sticky top-24 space-y-6">
                <AdBanner size="skyscraper" />
                
                {/* Popular Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {templates?.slice(0, 3).map((template) => (
                      <Link
                        key={template.id}
                        href="#generator"
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-neutral-600">
                          Generated {Math.floor(Math.random() * 1000 + 500)} times
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
                  AI Document Generator
                </h2>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                  Answer a few questions and get a professional, state-compliant legal document instantly
                </p>
              </div>

              <DocumentGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              Why Choose LegalDocs AI?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Advanced AI technology meets legal expertise to deliver professional documents faster than ever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Generation</h3>
              <p className="text-neutral-600">
                Advanced ChatGPT integration creates tailored documents based on your specific requirements and industry best practices.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">State-Specific Compliance</h3>
              <p className="text-neutral-600">
                Automatically includes relevant state laws and regulations using our comprehensive legal database and API integration.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional PDF Export</h3>
              <p className="text-neutral-600">
                Generate beautifully formatted, print-ready documents with proper legal formatting and professional appearance.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-neutral-600">
                Your information is encrypted and never stored. We prioritize privacy and security in all document generation processes.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time & Money</h3>
              <p className="text-neutral-600">
                Generate documents in minutes instead of hours. No expensive lawyer consultations for standard document needs.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-edit text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
              <p className="text-neutral-600">
                Edit and modify generated documents to meet your exact needs with our intuitive editing interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In-Content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner size="rectangle" />
      </div>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              Document Templates Library
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Browse our extensive collection of professional legal document templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates?.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="text-blue-600 text-xl mr-3" />
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">{template.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Free</span>
                    <div className="flex items-center text-xs text-neutral-500">
                      <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                      4.{Math.floor(Math.random() * 3 + 5)} ({Math.floor(Math.random() * 300 + 100)} reviews)
                    </div>
                  </div>
                  <Link href="#generator">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Generate Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="#generator">
              <Button variant="outline" size="lg" className="border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white">
                Generate Documents Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* In-Content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner size="rectangle" />
      </div>

      {/* State-Specific Section */}
      <section id="states" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              State-Specific Legal Documents
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Get documents tailored to your state's specific laws and requirements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {usStates.map((state) => (
              <Link
                key={state.code}
                href={`/states/${state.code.toLowerCase()}`}
                className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md hover:border-blue-600 transition-all group"
              >
                <div className="text-lg font-semibold text-neutral-800 group-hover:text-blue-600">
                  {state.code}
                </div>
                <div className="text-xs text-neutral-600">{state.name}</div>
                <div className="text-xs text-green-600 mt-1">{state.docs} docs</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="#generator">
              <Button variant="outline" size="lg" className="border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white">
                Start Generating Documents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="bg-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <AdBanner size="leaderboard" className="bg-neutral-700 border-neutral-600" />
        </div>
      </div>

      {/* Mobile Sticky Ad */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 md:hidden">
        <AdBanner size="mobile-banner" className="p-0" />
      </div>
    </div>
  );
}
