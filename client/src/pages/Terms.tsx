import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdBanner } from "@/components/AdBanner";
import { SEOHead, SEOConfigs } from "@/components/SEOHead";
import { Scale, AlertTriangle, FileText, Shield } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHead {...SEOConfigs.terms} />
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Please read these terms carefully before using LegalDocs AI. By using our service, you agree to these terms.
            </p>
            <p className="text-sm text-neutral-500 mt-4">
              Last updated: January 13, 2025
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <AdBanner size="skyscraper" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#acceptance" className="block text-blue-600 hover:underline">Acceptance of Terms</a>
                  <a href="#service-description" className="block text-blue-600 hover:underline">Service Description</a>
                  <a href="#user-obligations" className="block text-blue-600 hover:underline">User Obligations</a>
                  <a href="#disclaimers" className="block text-blue-600 hover:underline">Legal Disclaimers</a>
                  <a href="#liability" className="block text-blue-600 hover:underline">Limitation of Liability</a>
                  <a href="#termination" className="block text-blue-600 hover:underline">Termination</a>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <div className="flex items-center">
                    <AlertTriangle className="text-red-600 w-5 h-5 mr-2" />
                    <CardTitle className="text-red-800">Important Notice</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 text-sm">
                    This platform provides templates and information for educational purposes only. 
                    It does not constitute legal advice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 prose prose-lg max-w-none">
            <section id="acceptance" className="mb-12">
              <div className="flex items-center mb-6">
                <Scale className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Acceptance of Terms</h2>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-800 font-semibold mb-3">
                  By accessing or using LegalDocs AI, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
                <ul className="list-disc list-inside space-y-2 text-blue-700">
                  <li>These terms constitute a legal agreement between you and LegalDocs AI</li>
                  <li>If you do not agree with any part of these terms, you may not use our service</li>
                  <li>We reserve the right to update these terms at any time</li>
                  <li>Continued use after changes constitutes acceptance of new terms</li>
                </ul>
              </div>
            </section>

            <section id="service-description" className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Service Description</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>What LegalDocs AI Provides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">AI-Powered Document Generation</h4>
                    <p className="text-neutral-600">
                      Our platform uses artificial intelligence to generate legal document templates based on user inputs. 
                      Documents are customized for specific states and legal requirements.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">Educational Resources</h4>
                    <p className="text-neutral-600">
                      We provide educational content about legal topics, state-specific requirements, 
                      and best practices for business documentation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">Template Library</h4>
                    <p className="text-neutral-600">
                      Access to a comprehensive library of legal document templates covering 
                      employment, business formation, contracts, and compliance documents.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* In-Content Ad */}
            <div className="my-8">
              <AdBanner size="rectangle" />
            </div>

            <section id="user-obligations" className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">User Obligations</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Acceptable Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4">You agree to use our service only for lawful purposes and in accordance with these terms:</p>
                    <ul className="list-disc list-inside space-y-2 text-neutral-600">
                      <li>Provide accurate information when generating documents</li>
                      <li>Use generated documents responsibly and appropriately</li>
                      <li>Comply with all applicable local, state, and federal laws</li>
                      <li>Respect intellectual property rights</li>
                      <li>Not attempt to reverse engineer or copy our AI algorithms</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prohibited Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4">The following activities are strictly prohibited:</p>
                    <ul className="list-disc list-inside space-y-2 text-neutral-600">
                      <li>Using the service for illegal activities</li>
                      <li>Attempting to hack, disrupt, or damage our systems</li>
                      <li>Sharing or reselling access to our platform</li>
                      <li>Creating documents for fraudulent purposes</li>
                      <li>Violating any applicable laws or regulations</li>
                      <li>Harassing other users or our support team</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="disclaimers" className="mb-12">
              <div className="flex items-center mb-6">
                <AlertTriangle className="text-red-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Legal Disclaimers</h2>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-800 mb-4">NOT LEGAL ADVICE</h3>
                <div className="space-y-4 text-red-700">
                  <p className="font-semibold">
                    LegalDocs AI provides document templates and educational information for general informational purposes only. 
                    Our service does NOT provide legal advice, legal representation, or legal counsel.
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2">
                    <li>Generated documents are templates that may require legal review</li>
                    <li>Laws vary by jurisdiction and change frequently</li>
                    <li>Complex legal matters require attorney consultation</li>
                    <li>We are not a law firm and do not practice law</li>
                    <li>No attorney-client relationship is formed by using our service</li>
                  </ul>

                  <p className="font-semibold bg-red-100 p-4 rounded border border-red-300">
                    IMPORTANT: Always consult with a qualified attorney for legal advice specific to your situation.
                  </p>
                </div>
              </div>
            </section>

            <section id="liability" className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Limitation of Liability</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Service Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4">
                    While we strive to maintain high availability, we cannot guarantee uninterrupted service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li>Service may be temporarily unavailable for maintenance</li>
                    <li>Third-party services (AI, hosting) may experience outages</li>
                    <li>We reserve the right to modify or discontinue features</li>
                    <li>No warranty is provided regarding service availability</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Damage Limitations</h3>
                <p className="text-gray-700">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEGALDOCS AI SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF 
                  PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF OUR SERVICE.
                </p>
              </div>
            </section>

            <section id="termination" className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Termination</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Termination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-3">You may stop using our service at any time:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-600">
                      <li>No account cancellation required</li>
                      <li>Simply stop accessing the platform</li>
                      <li>Your data is not permanently stored</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Service Termination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-3">We may terminate or suspend access if you:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-600">
                      <li>Violate these terms of service</li>
                      <li>Engage in prohibited activities</li>
                      <li>Misuse our platform or services</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Governing Law & Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Governing Law</h3>
                  <p className="text-blue-700">
                    These terms are governed by the laws of the State of California, United States. 
                    Any disputes will be resolved in the courts of San Francisco County, California.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Contact Information</h3>
                  <div className="text-blue-700">
                    <p><strong>Email:</strong> legal@legaldocs-ai.com</p>
                    <p><strong>Mail:</strong> Legal Department, LegalDocs AI</p>
                    <p>123 Legal Tech Blvd, Suite 100</p>
                    <p>San Francisco, CA 94102</p>
                  </div>
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