# Build & Deployment: Lobe Chat

This document outlines the build and deployment processes for Lobe Chat, detailing how the application is built, tested, deployed, and maintained across different environments.

## Build Process

### Development Build

The development build process appears to be managed through pnpm scripts defined in `package.json`:

1. **Environment Setup**:

   - Node.js version specified in `.nvmrc`
   - Dependencies installed via pnpm
   - Environment variables configured from `.env` files (template in `.env.example`)

2. **Development Server**:

   - Next.js development server likely started with `pnpm dev`
   - Hot module reloading for immediate feedback during development

3. **Type Checking**:

   - TypeScript compilation configured in `tsconfig.json`
   - Type checking likely runs during development and build

4. **Linting & Formatting**:
   - ESLint configuration in `.eslintrc.js`
   - Prettier configuration in `.prettierrc.js`
   - StyleLint configuration in `.stylelintrc.js`

### Production Build

The production build process compiles and optimizes the application for deployment:

1. **Build Steps**:

   - Next.js production build (likely `pnpm build`)
   - TypeScript compilation
   - Asset optimization
   - Bundle analysis (likely optional)

2. **Optimizations**:

   - JavaScript minification
   - CSS optimization
   - Image optimization
   - Code splitting
   - Tree shaking for reduced bundle size

3. **Output**:
   - Static assets for CDN deployment
   - Server-side code for Next.js API routes
   - Client-side JavaScript bundles

## Testing Framework

The project uses Vitest for testing, configured in `vitest.config.ts` and `vitest.server.config.ts`:

1. **Test Types**:

   - Unit tests for individual components and functions
   - Integration tests for component interactions
   - API tests for backend functionality

2. **Testing Infrastructure**:

   - Test setup in `tests/setup.ts`
   - Database setup for tests in `tests/setup-db.ts`
   - Test utilities in `tests/utils.tsx`
   - Mock implementations in `__mocks__/` directory

3. **CI Testing**:
   - Automated tests likely run in CI/CD pipeline
   - Code coverage reported to Codecov (configured in `codecov.yml`)

## Deployment Options

Lobe Chat supports multiple deployment options, each with its own configuration:

### Docker Deployment

1. **Container Configurations**:

   - Main application container in `Dockerfile`
   - Database container in `Dockerfile.database`
   - PostgreSQL Lite container in `Dockerfile.pglite`

2. **Docker Compose**:

   - Local development setup in `docker-compose/local/`
   - Production deployment in `docker-compose/production/`
   - Setup script in `docker-compose/setup.sh`
   - MinIO configuration for object storage in `docker-compose/minio-bucket.config.json`

3. **Multi-container Setup**:
   - Authentication services (Logto, Zitadel)
   - Database services
   - Application service
   - Optional search service (SearXNG)

### Vercel Deployment

1. **Configuration**:

   - Deployment settings in `vercel.json`
   - Build optimization in `scripts/vercelIgnoredBuildStep.js`
   - Sentry integration for error tracking

2. **Environment Variables**:

   - Production settings configured in Vercel dashboard
   - Next.js optimization with Vercel-specific features

3. **Edge Functions**:
   - Potential use of Vercel Edge functions for certain features
   - Configured in `sentry.edge.config.ts`

### Netlify Deployment

1. **Configuration**:

   - Deployment settings in `netlify.toml`
   - Build commands and environment configuration

2. **Netlify Functions**:
   - Potential serverless functions for API routes
   - Configuration in `netlify.toml`

## Continuous Integration & Deployment

The project likely uses automated CI/CD workflows:

1. **Workflow Steps**:

   - Code linting and formatting checks
   - Type checking
   - Unit and integration tests
   - Build verification
   - Deployment to staging/production environments

2. **Release Management**:

   - Semantic versioning configured in `.releaserc.js`
   - Changelog generation configured in `.changelogrc.js`
   - Conventional commits enforced by `.commitlintrc.js`

3. **Automation Scripts**:
   - Changelog workflow in `scripts/changelogWorkflow/`
   - Documentation workflow in `scripts/docsWorkflow/`
   - CDN workflow in `scripts/cdnWorkflow/`

## Database Management

Database operations and migrations are managed through:

1. **ORM Configuration**:

   - Drizzle ORM configured in `drizzle.config.ts`
   - Database models defined in `src/database/`

2. **Migrations**:

   - Schema migrations in `src/migrations/`
   - Migration scripts in `scripts/migrateClientDB/` and `scripts/migrateServerDB/`

3. **Database Types**:
   - Support for different database backends
   - Containerized database options for deployment

## Monitoring & Error Tracking

Production monitoring appears to be implemented with:

1. **Sentry Integration**:

   - Client-side error tracking in `sentry.client.config.ts`
   - Server-side error tracking in `sentry.server.config.ts`
   - Edge function error tracking in `sentry.edge.config.ts`

2. **Logging**:
   - Structured logging likely implemented in server components
   - Error handling patterns in API routes

## Performance Optimization

The application implements several performance optimization strategies:

1. **Frontend Optimization**:

   - Code splitting for reduced bundle size
   - Image optimization via Next.js
   - Font optimization

2. **CDN Integration**:

   - CDN caching configured in `docs/.cdn.cache.json`
   - CDN workflow scripts in `scripts/cdnWorkflow/`

3. **Caching Strategies**:
   - API response caching
   - Static asset caching
   - Database query optimization

## Self-Hosting Guide

Comprehensive self-hosting documentation appears to be available:

1. **Docker-based Deployment**:

   - Step-by-step instructions in `docs/self-hosting/`
   - Environment configuration
   - Persistence setup
   - Upgrade procedures

2. **Manual Deployment**:

   - Requirements and prerequisites
   - Build and setup instructions
   - Configuration options

3. **Database Setup**:
   - Database creation and initialization
   - Migration execution
   - Backup and restore procedures

## Maintenance Procedures

Ongoing maintenance procedures likely include:

1. **Updates**:

   - Dependency updates managed by Renovate (configured in `renovate.json`)
   - Version update workflow
   - Database migration application

2. **Backups**:

   - Database backup procedures
   - User data preservation
   - Disaster recovery planning

3. **Monitoring**:
   - Performance monitoring
   - Error tracking and resolution
   - Usage analytics

This document provides a comprehensive overview of the build and deployment processes for Lobe Chat. As the project evolves, this documentation should be updated to reflect changes in the build, testing, deployment, and maintenance procedures.
