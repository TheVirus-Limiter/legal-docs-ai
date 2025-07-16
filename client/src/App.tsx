import { Switch, Route, Link, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsent } from "@/components/CookieConsent";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import DocumentTypes from "@/pages/DocumentTypes";
import StateGuide from "@/pages/StateGuide";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import Help from "@/pages/Help";
import Blog from "@/pages/Blog";

// Get base path for custom domain deployment
const basePath = "";

function AppContent() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                    <i className="fas fa-file-contract mr-2"></i>LegalDocs AI
                  </h1>
                </Link>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-8">
                  <Link href="/" className="text-neutral-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Home
                  </Link>
                  <Link href="/templates" className="text-neutral-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Templates
                  </Link>
                  <Link href="/blog" className="text-neutral-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Blog
                  </Link>
                  <Link href="/help" className="text-neutral-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Help
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  // Navigate to home if not already there, then scroll to generator
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#generator';
                  } else {
                    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </nav>
      </header>

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/templates" component={DocumentTypes} />
        <Route path="/generator" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route path="/help" component={Help} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route component={NotFound} />
      </Switch>

      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <i className="fas fa-file-contract mr-2"></i>LegalDocs AI
              </h3>
              <p className="text-neutral-300 mb-4">
                AI-powered legal document generation platform trusted by businesses nationwide. Create professional documents in minutes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Document Types</h4>
              <ul className="space-y-2 text-neutral-300">
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Employment Contracts</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>NDA Agreements</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Service Contracts</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Partnership Agreements</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Business Formation</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Legal Templates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-neutral-300">
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Document Templates</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>AI Document Generator</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Free Legal Documents</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Business Contracts</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Employment Forms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Privacy Policies</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-300">
                <li><Link href="/about" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors" onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}>Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-700 pt-8 text-center">
            <p className="text-neutral-400 text-sm">
              © 2025 LegalDocs AI. All rights reserved. | Professional legal document generation platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router base={basePath}>
          <AppContent />
        </Router>
        <CookieConsent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
