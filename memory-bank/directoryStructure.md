# Directory Structure: Lobe Chat

This document maps the entire project directory structure, explaining what each file and folder is responsible for within the Lobe Chat application.

## Root Directory

### Configuration Files

- **`.bunfig.toml`**: Configuration for Bun runtime, likely used for optimized JavaScript execution
- **`.changelogrc.js`**: Configuration for changelog generation
- **`.commitlintrc.js`**: Rules for commit message formatting, enforcing conventional commits
- **`.dockerignore`**: Specifies files and directories to exclude from Docker builds
- **`.editorconfig`**: Consistent coding styles across different editors and IDEs
- **`.env.example`**: Template for environment variables required by the application
- **`.eslintignore`**: Files and directories to exclude from ESLint checking
- **`.eslintrc.js`**: ESLint configuration for code quality and style enforcement
- **`.gitignore`**: Specifies intentionally untracked files to ignore in Git
- **`.i18nrc.js`**: Configuration for internationalization tooling
- **`.npmrc`**: npm configuration, likely setting up pnpm and registry options
- **`.nvmrc`**: Specifies Node.js version for development
- **`.prettierignore`**: Files to exclude from Prettier formatting
- **`.prettierrc.js`**: Configuration for Prettier code formatting
- **`.releaserc.js`**: Configuration for semantic-release for automated versioning
- **`.remarkrc.js`** and **`.remarkrc.mdx.js`**: Remark configuration for Markdown linting and processing
- **`.seorc.cjs`**: Configuration for SEO optimization tools
- **`.stylelintrc.js`**: StyleLint configuration for CSS/SCSS linting

### Project Documentation

- **`CHANGELOG.md`**: Record of notable changes for each version
- **`CODE_OF_CONDUCT.md`**: Guidelines for community participation
- **`CONTRIBUTING.md`**: Instructions for contributors
- **`LICENSE`**: Project license information
- **`README.md`** and **`README.zh-CN.md`**: Project introduction and documentation in English and Chinese

### CI/CD and Deployment

- **`codecov.yml`**: Configuration for code coverage reporting
- **`Dockerfile`**: Main Docker container configuration
- **`Dockerfile.database`**: Docker configuration for database services
- **`Dockerfile.pglite`**: Docker configuration for PostgreSQL lite
- **`netlify.toml`**: Netlify deployment configuration
- **`renovate.json`**: Configuration for Renovate bot for dependency updates
- **`vercel.json`**: Vercel deployment configuration

### Application Configuration

- **`drizzle.config.ts`**: Configuration for Drizzle ORM
- **`next.config.ts`**: Next.js framework configuration
- **`package.json`**: Project dependencies and scripts
- **`pnpm-workspace.yaml`**: pnpm workspace configuration for monorepo
- **`tsconfig.json`**: TypeScript compiler configuration
- **`vitest.config.ts`** and **`vitest.server.config.ts`**: Vitest testing framework configuration

### Error Tracking

- **`sentry.client.config.ts`**, **`sentry.edge.config.ts`**, **`sentry.server.config.ts`**: Sentry error tracking configuration for different environments

## Core Directories

### `__mocks__/`

Mock implementations for testing, particularly for Zustand state management:

- **`__mocks__/zustand/traditional.ts`**: Mocks for traditional Zustand store pattern

### `changelog/`

Changelog management and history:

- **`changelog/CHANGELOG.v0.md`**: Changelog for version 0.x
- **`changelog/v0.json`**, **`changelog/v1.json`**: Structured changelog data

### `contributing/`

Comprehensive contribution guidelines:

- **`contributing/_Footer.md`**, **`contributing/_Sidebar.md`**, **`contributing/Home.md`**: Wiki-style documentation structure
- **`contributing/Upstream-Sync.md`** and multilingual versions: Instructions for syncing with upstream repository
- **`contributing/Basic/`**: Core contribution documentation
  - Architecture, setup, feature development, folder structure, etc.
- **`contributing/Internationalization/`**: Guidelines for i18n work
- **`contributing/Others/`**: Additional contribution topics
- **`contributing/State-Management/`**: Documentation on Zustand state management

### `docker-compose/`

Docker Compose configurations for different environments:

- **`docker-compose/minio-bucket.config.json`**: MinIO object storage configuration
- **`docker-compose/setup.sh`**: Setup script for Docker environment
- **`docker-compose/local/`**: Local development Docker configurations
- **`docker-compose/production/`**: Production deployment Docker configurations

### `docs/`

User-facing documentation:

- **`docs/.cdn.cache.json`**: CDN cache configuration
- **`docs/changelog/`**: User-facing changelog entries in MDX format
- **`docs/self-hosting/`**: Documentation for self-hosting the application
- **`docs/usage/`**: User guides and usage documentation

### `locales/`

Internationalization resources for multiple languages:

- Contains subdirectories for each supported language (ar, bg-BG, de-DE, en-US, etc.)
- Each language directory contains localization files for UI text

### `packages/`

Monorepo packages:

- **`packages/web-crawler/`**: Web crawling functionality, likely for knowledge base features

### `public/`

Static assets served directly:

- **`public/favicon.ico`**, **`public/apple-touch-icon.png`**, etc.: App icons
- **`public/icons/`**: UI icons and graphics
- **`public/images/`**: Image assets
- **`public/og/`**: Open Graph images for social sharing
- **`public/screenshots/`**: Application screenshots for documentation
- **`public/videos/`**: Video assets

### `scripts/`

Utility scripts for development and deployment:

- **`scripts/countEnWord.ts`**: Likely analyzes word count for internationalization
- **`scripts/vercelIgnoredBuildStep.js`**: Controls when to skip builds on Vercel
- **`scripts/buildSitemapIndex/`**: Generates sitemap for SEO
- **`scripts/cdnWorkflow/`**: Manages CDN deployment
- **`scripts/changelogWorkflow/`**: Automates changelog generation
- **`scripts/docsWorkflow/`**: Documentation generation and management
- **`scripts/i18nWorkflow/`**: Internationalization workflow automation
- **`scripts/mdxWorkflow/`**: MDX processing scripts
- **`scripts/migrateClientDB/`** and **`scripts/migrateServerDB/`**: Database migration tools
- **`scripts/readmeWorkflow/`**: README generation/management
- **`scripts/serverLauncher/`**: Server startup utilities

### `src/`

Main application source code:

- **`src/middleware.ts`**: Next.js middleware for request processing
- **`src/app/`**: Next.js App Router pages and routes
- **`src/chains/`**: Likely contains prompt chains for AI interactions
- **`src/components/`**: React components
- **`src/config/`**: Application configuration
- **`src/const/`**: Constant values and definitions
- **`src/database/`**: Database models and connections
- **`src/features/`**: Feature-specific code modules
- **`src/helpers/`**: Helper utilities and functions
- **`src/hooks/`**: React custom hooks
- **`src/layout/`**: Layout components
- **`src/libs/`**: Library code and third-party integrations
- **`src/locales/`**: Runtime localization support
- **`src/migrations/`**: Database migration definitions
- **`src/prompts/`**: AI model prompt templates
- **`src/server/`**: Server-side code
- **`src/services/`**: Service layer for external communications
- **`src/store/`**: State management with Zustand
- **`src/styles/`**: Global styles and theme definitions
- **`src/tools/`**: Utility tools and functions
- **`src/types/`**: TypeScript type definitions
- **`src/utils/`**: Utility functions

### `tests/`

Test infrastructure and utilities:

- **`tests/setup-db.ts`**: Database setup for testing
- **`tests/setup.ts`**: General test setup
- **`tests/utils.tsx`**: Testing utilities

## Application Architecture Overview

The directory structure reveals a well-organized Next.js application following modern best practices:

1. **Frontend Layer** (`src/app`, `src/components`, `src/layout`):

   - Next.js App Router for routing and pages
   - Component-based architecture with organized React components
   - Responsive layouts and UI elements

2. **State Management** (`src/store`):

   - Zustand-based state management
   - Organized into store slices for different domains

3. **API & Services** (`src/server`, `src/services`):

   - Next.js API routes for backend functionality
   - Service-based architecture for external communications

4. **Data Layer** (`src/database`, `src/migrations`):

   - Drizzle ORM for database operations
   - Migrations for schema versioning
   - Models for data structure

5. **Feature Organization** (`src/features`):

   - Feature-based code organization
   - Encapsulated functionality by domain

6. **Internationalization** (`locales/`, `src/locales`):

   - Comprehensive multi-language support
   - Translation workflows and tools

7. **Development Infrastructure**:

   - Comprehensive testing setup
   - Extensive linting and formatting configurations
   - Automated workflows for documentation and releases

8. **Deployment Options**:
   - Docker and Docker Compose for containerization
   - Support for Vercel, Netlify deployments
   - Self-hosting capabilities

This structure demonstrates a well-thought-out architecture designed for scalability, maintainability, and comprehensive feature development.
