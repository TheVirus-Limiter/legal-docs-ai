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
- **openai**: Official OpenAI API client
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

### Optional Integrations
- **Google Analytics**: User behavior tracking
- **Replit**: Development environment optimization

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