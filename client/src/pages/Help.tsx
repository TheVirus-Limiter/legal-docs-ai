import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AdBanner } from "@/components/AdBanner";
import { Search, BookOpen, Video, FileText, MessageSquare, Lightbulb } from "lucide-react";

export default function Help() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              Help Center
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions about generating legal documents with AI technology.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input 
                placeholder="Search for help articles, tutorials, or FAQs..."
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AdBanner size="skyscraper" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quick Help Categories */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Popular Help Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-blue-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Document Generation</h3>
                    <p className="text-neutral-600 text-sm">
                      Learn how to create and customize legal documents using our AI platform.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="text-green-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Legal Requirements</h3>
                    <p className="text-neutral-600 text-sm">
                      Understand state-specific legal requirements and compliance information.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="text-purple-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Video Tutorials</h3>
                    <p className="text-neutral-600 text-sm">
                      Watch step-by-step video guides for creating different document types.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* In-Content Ad */}
            <AdBanner size="rectangle" className="mb-12" />

            {/* Getting Started Guide */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Getting Started</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">1</div>
                      <CardTitle>Choose Your Document Type</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4">
                      Start by browsing our extensive library of legal document templates. We offer over 50+ document types including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
                      <li>Employment contracts and agreements</li>
                      <li>Business formation documents (LLC, Corporation)</li>
                      <li>Non-disclosure agreements (NDAs)</li>
                      <li>Service and contractor agreements</li>
                      <li>Privacy policies and terms of service</li>
                      <li>Real estate contracts and leases</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">2</div>
                      <CardTitle>Select Your State</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Choose your state to ensure your document complies with local laws and regulations. 
                      Our AI automatically incorporates state-specific requirements into your documents.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">3</div>
                      <CardTitle>Fill Out the Form</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Complete the dynamic form with your specific information. Our smart forms adapt based on your 
                      selections to only ask for relevant information.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">4</div>
                      <CardTitle>Generate and Download</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Our AI generates your customized legal document in seconds. Review, edit if needed, 
                      and download as a professional PDF ready for use.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is LegalDocs AI a substitute for a lawyer?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      No, LegalDocs AI provides document templates and educational information only. We do not provide legal advice. 
                      For complex legal matters or specific legal advice, always consult with a qualified attorney.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How accurate are the AI-generated documents?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Our AI uses advanced legal knowledge and is trained on professional legal templates. However, every situation is unique. 
                      We recommend having important documents reviewed by a legal professional before use.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are documents legally binding?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Documents generated by our platform can be legally binding when properly executed according to your state's laws. 
                      However, the enforceability depends on proper execution and compliance with local regulations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is my personal information secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Yes, we take privacy seriously. Your personal information is encrypted in transit and we don't permanently store 
                      the details you enter for document generation. See our Privacy Policy for complete details.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What file formats are available for download?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      All documents are generated as professionally formatted PDFs, ready for printing, signing, and official use. 
                      PDFs ensure consistent formatting across all devices and platforms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I edit documents after generation?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Yes, you can review and make changes to your document before downloading. Once downloaded as a PDF, 
                      you can use PDF editing software to make additional modifications if needed.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Contact Support */}
            <section className="bg-blue-50 p-8 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <MessageSquare className="text-blue-600 w-8 h-8 mr-3" />
                  <h2 className="text-2xl font-bold text-neutral-800">Still Need Help?</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  Can't find what you're looking for? Our support team is here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Support
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                    Schedule a Call
                  </button>
                </div>
              </div>
            </section>

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