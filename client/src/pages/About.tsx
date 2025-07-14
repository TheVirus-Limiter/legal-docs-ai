import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdBanner } from "@/components/AdBanner";
import { SEOHead, SEOConfigs } from "@/components/SEOHead";
import { Users, Target, Shield, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHead {...SEOConfigs.about} />
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              About LegalDocs AI
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Democratizing legal document creation through advanced AI technology. 
              We make professional legal documents accessible to small businesses and individuals worldwide.
            </p>
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
          <div className="lg:col-span-3 space-y-12">
            {/* Mission */}
            <section>
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-600 mb-6">
                LegalDocs AI was founded on the belief that legal document creation shouldn't be expensive, 
                time-consuming, or intimidating. We leverage cutting-edge artificial intelligence to provide 
                professional-grade legal documents at a fraction of traditional costs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Target className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Accessibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Making legal documents accessible to everyone, regardless of budget or legal knowledge.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Reliability</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Ensuring all documents meet legal standards and comply with state-specific requirements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* In-Content Ad */}
            <AdBanner size="rectangle" />

            {/* Technology */}
            <section>
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Our Technology</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Our platform combines advanced AI with legal expertise to generate documents that are:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Using ChatGPT and advanced language models to understand context and generate appropriate legal language.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>State-Compliant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Automatically incorporating state-specific laws and requirements for all 50 states.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Professionally Formatted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Generating documents with proper legal formatting and professional appearance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Team */}
            <section>
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Users className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Legal Technology Experts</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Our team combines decades of legal experience with cutting-edge technology expertise 
                      to deliver the most advanced legal document platform available.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Industry Recognition</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Recognized as a leader in legal technology innovation, serving thousands of 
                      businesses and individuals across all 50 states.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-white p-8 rounded-lg border">
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Business Inquiries</h3>
                  <p className="text-neutral-600">
                    Email: legaldocsai21@gmail.com<br />
                    Response Time: Within 24 hours<br />
                    Professional Support: Available online
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Support</h3>
                  <p className="text-neutral-600">
                    Email: legaldocsai21@gmail.com<br />
                    Help Center: Available 24/7<br />
                    Response Time: Within 24 hours<br />
                    Languages: English
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom Ad */}
            <AdBanner size="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}