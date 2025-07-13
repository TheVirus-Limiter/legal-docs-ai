import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdBanner } from "@/components/AdBanner";
import { SEOHead, SEOConfigs } from "@/components/SEOHead";
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHead {...SEOConfigs.contact} />
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Have questions about our legal document generator? Need help with a specific document? 
              We're here to help you create the perfect legal documents for your business.
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
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <MessageSquare className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Send us a Message</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          First Name
                        </label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Last Name
                        </label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Subject
                      </label>
                      <Input placeholder="Document Generation Question" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Message
                      </label>
                      <Textarea 
                        placeholder="Tell us how we can help you with your legal document needs..."
                        rows={5}
                      />
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                {/* FAQ Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <HelpCircle className="text-blue-600 w-6 h-6 mr-3" />
                      <CardTitle>Frequently Asked Questions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">
                        How accurate are AI-generated documents?
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Our AI uses advanced legal knowledge to create documents that meet industry standards. 
                        However, we recommend legal review for complex situations.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">
                        Are documents state-specific?
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Yes! Our system automatically incorporates state-specific legal requirements 
                        and regulations for all 50 US states.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">
                        Is my information secure?
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        We use enterprise-grade security and don't permanently store your personal 
                        information. All data is encrypted in transit.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="text-blue-600 w-5 h-5 mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-800">Email Support</h4>
                        <p className="text-neutral-600">support@legaldocs-ai.com</p>
                        <p className="text-sm text-neutral-500">Response within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="text-blue-600 w-5 h-5 mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-800">Phone Support</h4>
                        <p className="text-neutral-600">1-800-LEGAL-AI</p>
                        <p className="text-sm text-neutral-500">Monday - Friday, 9 AM - 6 PM PST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-blue-600 w-5 h-5 mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-800">Business Address</h4>
                        <p className="text-neutral-600">
                          123 Legal Tech Blvd, Suite 100<br />
                          San Francisco, CA 94102<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="text-blue-600 w-5 h-5 mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-800">Business Hours</h4>
                        <p className="text-neutral-600">
                          Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                          Saturday: 10:00 AM - 4:00 PM PST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <AdBanner size="rectangle" />

                <Card>
                  <CardHeader>
                    <CardTitle>Business Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4">
                      For partnerships, media inquiries, or business development opportunities:
                    </p>
                    <div className="space-y-2">
                      <p className="text-neutral-800"><strong>Business Development:</strong> business@legaldocs-ai.com</p>
                      <p className="text-neutral-800"><strong>Media & Press:</strong> press@legaldocs-ai.com</p>
                      <p className="text-neutral-800"><strong>Partnerships:</strong> partners@legaldocs-ai.com</p>
                      <p className="text-neutral-800"><strong>Legal Inquiries:</strong> legal@legaldocs-ai.com</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Support Resources */}
            <section className="mt-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-8">Support Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="text-blue-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Help Center</h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      Browse our comprehensive help documentation and tutorials.
                    </p>
                    <Button variant="outline" className="w-full">
                      Visit Help Center
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="text-green-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Live Chat</h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      Get instant help from our support team during business hours.
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="text-purple-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Email Support</h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      Send us a detailed message and we'll respond within 24 hours.
                    </p>
                    <Button variant="outline" className="w-full">
                      Send Email
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}