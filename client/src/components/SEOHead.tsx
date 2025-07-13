import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: any;
  noindex?: boolean;
}

export function SEOHead({
  title = "LegalDocs AI - Free Professional Legal Document Generator | AI-Powered Legal Forms",
  description = "Generate professional legal documents instantly with AI. Free employment contracts, NDAs, business agreements, privacy policies, and more. Trusted by thousands of businesses nationwide. Save 90% on legal costs.",
  keywords = "legal document generator, AI legal forms, employment contracts, NDA generator, business agreements, privacy policy generator, terms of service, legal templates, contract maker, business documents, legal AI assistant, free legal forms, professional contracts, document automation, legal compliance, business formation documents",
  canonical,
  ogImage = "https://thevirus-limiter.github.io/legal-docs-ai/og-image.jpg",
  ogType = "website",
  schema,
  noindex = false
}: SEOHeadProps) {
  
  const baseUrl = "https://thevirus-limiter.github.io/legal-docs-ai";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update canonical
    let canonical_link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical_link) {
      canonical_link = document.createElement('link');
      canonical_link.rel = 'canonical';
      document.head.appendChild(canonical_link);
    }
    canonical_link.href = fullCanonical;

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', fullCanonical, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', ogType, true);

    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Add structured data if provided
    if (schema) {
      let schemaScript = document.querySelector('#page-schema') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

  }, [title, description, keywords, fullCanonical, ogImage, ogType, schema, noindex]);

  return null;
}

// Pre-defined SEO configurations for common pages
export const SEOConfigs = {
  home: {
    title: "LegalDocs AI - Free Professional Legal Document Generator | AI-Powered Legal Forms",
    description: "Generate professional legal documents instantly with AI. Free employment contracts, NDAs, business agreements, privacy policies, and more. Trusted by thousands of businesses nationwide. Save 90% on legal costs.",
    keywords: "legal document generator, AI legal forms, employment contracts, NDA generator, business agreements, privacy policy generator, terms of service, legal templates, contract maker, business documents, legal AI assistant, free legal forms, professional contracts, document automation, legal compliance, business formation documents",
    canonical: "/",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "LegalDocs AI",
      "description": "AI-powered legal document generator for businesses",
      "url": "https://thevirus-limiter.github.io/legal-docs-ai/",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  blog: {
    title: "Legal Insights & Resources | LegalDocs AI Blog",
    description: "Expert legal analysis, business formation guides, and compliance insights to help your business succeed while staying legally protected. Updated daily with actionable legal advice.",
    keywords: "legal blog, business law, employment law, contract law, legal advice, business compliance, legal insights, business formation, legal resources, legal guides",
    canonical: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "LegalDocs AI Legal Insights",
      "description": "Expert legal analysis and business guidance",
      "url": "https://thevirus-limiter.github.io/legal-docs-ai/blog"
    }
  },

  templates: {
    title: "Legal Document Templates | Free Professional Business Forms | LegalDocs AI",
    description: "Access 50+ professional legal document templates. Employment contracts, NDAs, service agreements, lease contracts, and business formation documents. State-specific compliance included.",
    keywords: "legal document templates, contract templates, employment contract template, NDA template, service agreement template, lease agreement template, business forms, legal forms download",
    canonical: "/templates",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Legal Document Templates",
      "description": "Professional legal document templates for businesses",
      "url": "https://thevirus-limiter.github.io/legal-docs-ai/templates"
    }
  },

  about: {
    title: "About LegalDocs AI | AI-Powered Legal Document Generation Platform",
    description: "Learn about LegalDocs AI's mission to democratize legal document creation. Our AI technology helps businesses generate professional legal documents at a fraction of traditional costs.",
    keywords: "about legaldocs ai, legal document automation, AI legal technology, legal tech startup, document generation platform, legal innovation",
    canonical: "/about",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About LegalDocs AI",
      "description": "AI-powered legal document generation platform",
      "url": "https://thevirus-limiter.github.io/legal-docs-ai/about"
    }
  },

  privacy: {
    title: "Privacy Policy | LegalDocs AI Data Protection & User Privacy",
    description: "LegalDocs AI Privacy Policy. Learn how we collect, use, and protect your personal information. GDPR and CCPA compliant data protection practices.",
    keywords: "privacy policy, data protection, GDPR compliance, CCPA compliance, user privacy, data security, personal information protection",
    canonical: "/privacy",
    noindex: false
  },

  terms: {
    title: "Terms of Service | LegalDocs AI User Agreement & Conditions",
    description: "LegalDocs AI Terms of Service. User agreement, acceptable use policy, and terms and conditions for using our legal document generation platform.",
    keywords: "terms of service, user agreement, terms and conditions, acceptable use policy, legal disclaimer, service terms",
    canonical: "/terms",
    noindex: false
  },

  contact: {
    title: "Contact LegalDocs AI | Customer Support & Business Inquiries",
    description: "Contact LegalDocs AI for customer support, business inquiries, or technical assistance. Multiple ways to reach our team for help with legal document generation.",
    keywords: "contact legaldocs ai, customer support, business inquiries, technical support, legal document help, contact information",
    canonical: "/contact",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact LegalDocs AI",
      "description": "Contact information and support",
      "url": "https://thevirus-limiter.github.io/legal-docs-ai/contact"
    }
  },

  help: {
    title: "Help Center | LegalDocs AI Support & FAQ",
    description: "LegalDocs AI Help Center. Find answers to frequently asked questions, user guides, and step-by-step tutorials for generating legal documents.",
    keywords: "help center, FAQ, user guide, legal document help, support documentation, tutorials, how to use legaldocs ai",
    canonical: "/help",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "LegalDocs AI Help Center",
      "description": "Frequently asked questions and help guides",
      "url": "https://thevirus-limiter.github.io/legal-docs-ai/help"
    }
  }
};

// Helper function to create blog post SEO
export function createBlogPostSEO(post: any) {
  return {
    title: `${post.title} | LegalDocs AI Legal Insights`,
    description: post.excerpt,
    keywords: `${post.tags?.join(', ')}, legal advice, business law, ${post.category.toLowerCase()}`,
    canonical: `/blog/${post.slug}`,
    ogType: "article",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "LegalDocs AI",
        "logo": "https://thevirus-limiter.github.io/legal-docs-ai/logo.png"
      },
      "datePublished": post.publishedAt,
      "dateModified": post.publishedAt,
      "mainEntityOfPage": `https://thevirus-limiter.github.io/legal-docs-ai/blog/${post.slug}`,
      "image": post.featuredImage || "https://thevirus-limiter.github.io/legal-docs-ai/og-image.jpg",
      "articleSection": post.category,
      "keywords": post.tags?.join(', ')
    }
  };
}