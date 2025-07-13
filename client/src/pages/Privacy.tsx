import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdBanner } from "@/components/AdBanner";
import { SEOHead, SEOConfigs } from "@/components/SEOHead";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHead {...SEOConfigs.privacy} />
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                  <a href="#information-collected" className="block text-blue-600 hover:underline">Information We Collect</a>
                  <a href="#how-we-use" className="block text-blue-600 hover:underline">How We Use Information</a>
                  <a href="#third-party" className="block text-blue-600 hover:underline">Third-Party Services</a>
                  <a href="#cookies" className="block text-blue-600 hover:underline">Cookies & Analytics</a>
                  <a href="#data-security" className="block text-blue-600 hover:underline">Data Security</a>
                  <a href="#your-rights" className="block text-blue-600 hover:underline">Your Rights</a>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 prose prose-lg max-w-none">
            <section id="information-collected" className="mb-12">
              <div className="flex items-center mb-6">
                <Eye className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Information We Collect</h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Generation Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-neutral-600">
                      <li>Information you enter into document generation forms</li>
                      <li>Document type and state selections</li>
                      <li>Generated document content (temporarily stored during creation)</li>
                      <li>Document download and usage statistics</li>
                    </ul>
                    <p className="mt-4 text-sm text-neutral-500">
                      <strong>Note:</strong> Personal information entered for document generation is not permanently stored on our servers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analytics & Usage Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-neutral-600">
                      <li>Website usage patterns and page views</li>
                      <li>Browser type, device information, and IP address</li>
                      <li>Geographic location (country/state level)</li>
                      <li>Search queries and navigation patterns</li>
                      <li>Time spent on pages and user interactions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* In-Content Ad */}
            <div className="my-8">
              <AdBanner size="rectangle" />
            </div>

            <section id="how-we-use" className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">How We Use Your Information</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Primary Uses</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-700">
                    <li>Generate customized legal documents based on your inputs</li>
                    <li>Provide state-specific legal compliance information</li>
                    <li>Improve our AI document generation algorithms</li>
                    <li>Deliver personalized user experience</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Analytics & Improvement</h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-700">
                    <li>Analyze website usage to improve functionality</li>
                    <li>Understand which document types are most popular</li>
                    <li>Optimize loading times and user experience</li>
                    <li>Display relevant advertisements through Google AdSense</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="third-party" className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Third-Party Services</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Google Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-3">
                      We use Google Analytics to understand how visitors interact with our website.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-neutral-500">
                      <li>Tracks page views and user behavior</li>
                      <li>Provides demographic insights</li>
                      <li>Helps optimize website performance</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Google AdSense</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-3">
                      We display advertisements through Google AdSense to support our free service.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-neutral-500">
                      <li>Shows relevant ads based on content</li>
                      <li>May use cookies for ad personalization</li>
                      <li>Follows Google's advertising policies</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>OpenAI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-3">
                      We use OpenAI's services to power our document generation capabilities.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-neutral-500">
                      <li>Processes document generation requests</li>
                      <li>Follows OpenAI's privacy policies</li>
                      <li>Data is not stored by OpenAI</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>GitHub Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-3">
                      Our website is hosted on GitHub Pages for reliable, secure delivery.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-neutral-500">
                      <li>Provides secure HTTPS hosting</li>
                      <li>Follows GitHub's privacy policies</li>
                      <li>Ensures high availability</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="cookies" className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Cookies & Analytics</h2>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Types of Cookies We Use</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-yellow-700">Essential</h4>
                    <p className="text-sm text-yellow-600">Required for basic site functionality</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700">Analytics</h4>
                    <p className="text-sm text-yellow-600">Help us understand site usage</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700">Advertising</h4>
                    <p className="text-sm text-yellow-600">Enable personalized ads</p>
                  </div>
                </div>
              </div>

              <p className="text-neutral-600">
                You can control cookie preferences through your browser settings. However, disabling cookies may limit some website functionality.
              </p>
            </section>

            <section id="data-security" className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Data Security</h2>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Security Measures</h3>
                <ul className="list-disc list-inside space-y-2 text-green-700">
                  <li><strong>HTTPS Encryption:</strong> All data transmission is encrypted</li>
                  <li><strong>Minimal Data Storage:</strong> Personal information is not permanently stored</li>
                  <li><strong>Regular Security Updates:</strong> Platform is regularly updated for security</li>
                  <li><strong>Access Controls:</strong> Strict access controls for any stored data</li>
                  <li><strong>Third-Party Security:</strong> All partners maintain high security standards</li>
                </ul>
              </div>
            </section>

            <section id="your-rights" className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Your Privacy Rights</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GDPR Rights (EU Residents)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-neutral-600">
                      <li>Right to access your personal data</li>
                      <li>Right to rectify inaccurate data</li>
                      <li>Right to erase your data</li>
                      <li>Right to restrict processing</li>
                      <li>Right to data portability</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>CCPA Rights (California Residents)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-neutral-600">
                      <li>Right to know what personal information is collected</li>
                      <li>Right to delete personal information</li>
                      <li>Right to opt-out of sale of personal information</li>
                      <li>Right to non-discrimination</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Contact Us</h2>
              <p className="text-neutral-600 mb-4">
                If you have questions about this Privacy Policy or our data practices:
              </p>
              <div className="text-neutral-600">
                <p><strong>Email:</strong> privacy@legaldocs-ai.com</p>
                <p><strong>Mail:</strong> Privacy Officer, LegalDocs AI, 123 Legal Tech Blvd, Suite 100, San Francisco, CA 94102</p>
                <p><strong>Response Time:</strong> We respond to privacy inquiries within 30 days</p>
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