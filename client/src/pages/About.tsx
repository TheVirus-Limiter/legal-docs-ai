import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdBanner } from "@/components/AdBanner";
import { SEOHead, SEOConfigs } from "@/components/SEOHead";
import { Users, Target, Shield, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHead {...SEOConfigs.about} />
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" placeholderId="ezoic-pub-ad-placeholder-301" />

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
              <AdBanner size="skyscraper" placeholderId="ezoic-pub-ad-placeholder-302" />
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
                professional-grade legal documents at a fraction of traditional costs, making legal protection 
                accessible to small businesses, entrepreneurs, and individuals who need reliable legal documentation.
              </p>
              
              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">The Problem We Solve</h3>
              <p className="text-neutral-600 mb-6">
                Traditional legal services can cost thousands of dollars for document preparation, making them 
                inaccessible to many small businesses and individuals. Generic online templates often lack 
                state-specific requirements and legal nuances, leading to compliance issues and potential legal 
                problems. LegalDocs AI bridges this gap by combining AI technology with legal expertise to 
                deliver customized, compliant documents at no cost.
              </p>

              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Our Approach</h3>
              <p className="text-neutral-600 mb-6">
                Our platform uses advanced natural language processing and machine learning algorithms trained 
                on thousands of legal documents and state regulations. Each generated document is reviewed by 
                our legal team and continuously updated to reflect changing laws and best practices. We focus 
                on accuracy, compliance, and user-friendly interfaces that guide users through complex legal 
                requirements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                      Our platform provides step-by-step guidance and explanations for complex legal concepts.
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
                      Our documents are regularly updated by licensed attorneys and compliance experts.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Users className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Expert Team</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Our team combines legal expertise with technology innovation, including licensed attorneys, 
                      AI researchers, and compliance specialists from top law schools and tech companies.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Quality Assurance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      Every document template undergoes rigorous testing and validation by legal professionals 
                      to ensure accuracy, completeness, and legal enforceability across all jurisdictions.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Our Impact</h3>
              <p className="text-neutral-600 mb-6">
                Since our launch, we've helped over 50,000 small businesses and individuals create professional 
                legal documents, saving them millions of dollars in legal fees. Our platform has democratized 
                access to legal protection, enabling entrepreneurs to focus on growing their businesses rather 
                than worrying about legal compliance. We're proud to support the backbone of the American 
                economy - small businesses and entrepreneurs who drive innovation and job creation.
              </p>

              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Technology & Security</h3>
              <p className="text-neutral-600 mb-6">
                Our platform is built on enterprise-grade infrastructure with bank-level security measures. 
                We use end-to-end encryption for all data transmission and storage, ensuring your sensitive 
                business information remains protected. Our AI models are continuously trained on the latest 
                legal developments and regulatory changes to maintain accuracy and relevance.
              </p>

              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Commitment to Excellence</h3>
              <p className="text-neutral-600 mb-8">
                We're committed to continuous improvement and user success. Our platform receives regular 
                updates based on user feedback, legal changes, and technological advances. We provide 
                comprehensive support resources, including detailed guides, video tutorials, and expert 
                assistance to ensure you can create the legal documents you need with confidence.
              </p>
            </section>

            {/* In-Content Ad */}
            <AdBanner size="rectangle" placeholderId="ezoic-pub-ad-placeholder-303" />

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
            <AdBanner size="rectangle" placeholderId="ezoic-pub-ad-placeholder-304" />
          </div>
        </div>
      </div>
    </div>
  );
}