# LegalDocs AI - Architecture Documentation

## Overview

LegalDocs AI is a full-stack web application that generates professional legal documents using AI technology. The application provides state-specific legal document templates, AI-powered document generation, and a comprehensive legal resource platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **AI Integration**: OpenAI API for document generation
- **Session Management**: Express sessions with PostgreSQL storage

### Key Components

#### Document Generation System
- **Template Engine**: JSON-based document templates with configurable fields
- **AI Processing**: OpenAI integration for intelligent document customization
- **State Compliance**: State-specific legal requirements and modifications
- **PDF Generation**: Client-side PDF creation from generated content

#### Data Models
- **Users**: Basic user management with username/password authentication
- **Documents**: Generated document storage with metadata and analytics
- **Document Templates**: Configurable templates for different document types
- **State Requirements**: State-specific legal compliance rules
- **Blog Posts**: Legal guides and educational content

#### UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive set of accessible UI components
- **Form Validation**: Real-time validation with user-friendly error messages
- **Analytics Integration**: Google Analytics for user behavior tracking
- **Advertisement System**: Placeholder ad banner system for monetization

## Data Flow

1. **Document Generation Flow**:
   - User selects document type and state
   - System retrieves appropriate template and state requirements
   - User fills out dynamic form based on template fields
   - Form data is sent to backend with OpenAI API integration
   - AI generates customized document content
   - Document is stored in database and returned to user
   - User can preview, edit, and download as PDF

2. **Template Management**:
   - Templates define form fields and AI prompts
   - State requirements modify templates for compliance
   - Templates include popularity metrics and estimated completion time

3. **Content Management**:
   - Blog posts provide legal education and SEO content
   - State-specific guides offer localized legal information
   - All content supports categorization and search functionality

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **openai**: Official OpenAI API client for ChatGPT integration
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **react-hook-form**: Form state management
- **zod**: Runtime type validation
- **wouter**: Lightweight routing

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and development experience
- **tailwindcss**: Utility-first CSS framework
- **esbuild**: Fast JavaScript bundler for production

### Monetization Integrations
- **Google AdSense**: Primary revenue source with 8+ ad placements
- **Google Analytics**: User behavior tracking and conversion metrics
- **Replit**: Development environment optimization

## Recent Updates (January 2025)

### Comprehensive SEO Optimization for GitHub Pages (January 13, 2025)
- Created advanced SEOHead component with dynamic meta tag generation for all pages
- Added comprehensive sitemap.xml with all pages and blog posts for better search indexing
- Implemented robots.txt with detailed crawling instructions for major search engines
- Created manifest.json for Progressive Web App capabilities and better mobile experience
- Added structured data (Schema.org) throughout the application for rich search results
- Implemented Open Graph and Twitter Card meta tags for enhanced social media sharing
- Created vite.config.pages.ts for optimized GitHub Pages deployment with chunk splitting
- Added GitHub Actions workflow for automatic deployment with SEO file generation
- Optimized all pages with unique titles, descriptions, and keywords for search ranking
- Enhanced page load performance with resource preloading and DNS prefetching
- Created 404.html for proper SPA routing on GitHub Pages with automatic redirects

### AdSense Compliance & Content Expansion (January 13, 2025)
- Added comprehensive AdSense compliance pages: About, Privacy Policy, Terms of Service, Contact, Help
- Created professional cookie consent banner with GDPR/CCPA compliance
- Implemented proper favicon with SVG format for modern browsers
- Expanded blog content library from 3 to 10+ high-quality legal articles
- Added extensive FAQ sections and help documentation
- Enhanced structured data markup for better SEO
- Updated all meta tags with correct GitHub Pages URLs
- Optimized ad placements in all new pages with 8+ ad banner locations
- Created comprehensive contact information and business details

### GitHub Pages Routing Fix (January 13, 2025)
- Fixed routing issues for GitHub Pages deployment at `/legal-docs-ai/` subdirectory
- Configured Wouter router with proper base path support
- Updated all navigation links to use correct GitHub Pages URLs
- Fixed 404 errors when refreshing pages or direct navigation to `/templates`
- Added Router component with base path configuration for production builds
- All navigation now works correctly: homepage at `/legal-docs-ai/` and templates at `/legal-docs-ai/templates`

### Ad Monetization Optimization
- Enhanced AdBanner component with Google AdSense compatibility
- Added 8+ strategic ad placements: header leaderboard, sidebar skyscraper, content rectangles, footer banner, mobile sticky
- Integrated Google AdSense script in HTML head with proper DNS prefetching
- Created responsive ad units for all screen sizes (728x90, 336x280, 160x600, 320x50, etc.)

### GitHub Pages Deployment Ready
- Created vite.config.pages.ts for static site deployment
- Added GitHub Actions workflow for automatic deployment
- Included deployment script (deploy.sh) for easy setup
- Configured proper routing for single-page application on GitHub Pages

### AI Simplification
- Simplified to use only OpenAI API (ChatGPT) instead of multiple legal APIs
- Added proper error handling for missing API keys
- Leveraged ChatGPT's extensive legal knowledge for document generation

### Documentation & Guides
- Created comprehensive DEPLOYMENT_GUIDE.md for GitHub Pages setup
- Added detailed ADSENSE_GUIDE.md for monetization strategy
- Updated README.md with complete project overview and setup instructions

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with fast refresh
- **Type Checking**: Real-time TypeScript compilation
- **Database**: Development database with migration support
- **Environment Variables**: Separate development configuration

### Production Build
- **Frontend**: Static site generation with Vite
- **Backend**: ES module bundling with esbuild
- **Database**: PostgreSQL with connection pooling
- **Environment**: Production environment variable configuration

### Database Management
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Centralized schema definition in shared directory
- **Seeding**: Template and state requirement initialization

The application follows a monorepo structure with clear separation between client, server, and shared code. The architecture prioritizes type safety, developer experience, and scalable document generation workflows.