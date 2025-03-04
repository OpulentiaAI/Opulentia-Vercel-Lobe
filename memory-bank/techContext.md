# Technical Context: Lobe Chat

## Technology Stack

### Core Technologies

- **Runtime**: Node.js
- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: React
- **Styling**: CSS-in-JS (likely styled-components or emotion)
- **State Management**: Zustand
- **Database**: Support for multiple databases via Drizzle ORM
- **API**: REST endpoints via Next.js API routes
- **Authentication**: Multiple provider support (OAuth, etc.)

### Build & Development

- **Package Manager**: pnpm (workspace-enabled for monorepo)
- **Bundler**: Webpack (via Next.js)
- **Linting**: ESLint, Prettier, Stylelint
- **Testing**: Vitest
- **CI/CD**: Likely GitHub Actions (based on workflow files)
- **Containerization**: Docker with multi-container support

### Client-Side

- **Rendering**: Hybrid (SSR and CSR via Next.js)
- **Routing**: Next.js App Router
- **Form Handling**: Likely React Hook Form
- **Data Fetching**: SWR or React Query with fetch API
- **Internationalization**: Custom i18n implementation

### Server-Side

- **API**: Next.js API Routes
- **Database Access**: Drizzle ORM
- **Authentication**: Next-Auth or custom implementation
- **Error Tracking**: Sentry (based on config files)

## Development Environment

### Setup Requirements

- Node.js (version specified in .nvmrc)
- pnpm package manager
- Git for version control
- Docker & Docker Compose (for containerized development)
- Environment configuration (.env files)

### Development Workflow

1. Clone repository
2. Install dependencies with pnpm
3. Set up environment variables
4. Run development server
5. Create features/fixes in separate branches
6. Submit PRs with comprehensive descriptions

### Environment Variables

- AI provider API keys
- Database connection strings
- Authentication provider credentials
- Feature flags
- Environment-specific configurations

## Technical Constraints

### Performance Requirements

- Fast initial load times
- Responsive UI even during AI generation
- Efficient handling of long conversations
- Optimization for both desktop and mobile devices

### Browser Compatibility

- Support for modern browsers (last 2 versions)
- Mobile-friendly design and functionality
- Progressive enhancement for broader compatibility

### Security Considerations

- Secure handling of API keys
- Protection against common web vulnerabilities
- Proper authentication implementation
- Data encryption where necessary

### Scalability Limits

- Rate limiting from AI providers
- Database scaling considerations
- Resource usage in containerized environments
- Bundle size optimization for web clients

## Dependencies & Integrations

### Key Dependencies

- **Next.js**: Core framework
- **React**: UI library
- **TypeScript**: Type-safe development
- **Zustand**: State management
- **Drizzle**: Database ORM
- **i18next**: Internationalization
- **Vitest**: Testing framework
- **ESLint/Prettier**: Code quality tools

### External Integrations

- **OpenAI API**: For GPT model access
- **Other AI Providers**: Potentially Anthropic, local models, etc.
- **Authentication Providers**: OAuth services
- **Sentry**: Error tracking
- **Various Plugins**: Through plugin system architecture

### Versioning Strategy

- Semantic versioning for releases
- Changelog maintenance (using conventional commits)
- Feature flagging for progressive rollouts
- Release candidate phases for major updates

## Deployment Architecture

### Self-Hosting Options

- Docker-based deployment
- Vercel deployment (as ,ndicated by vercel.json)
- Netlify support (as indicated by netlify.toml)
- Database setup options (local or external)

### Infrastructure Requirements

- Node.js runtime environment
- Database server (or serverless DB)
- Storage for assets and uploads
- Network configuration for API access

### Monitoring & Maintenance

- Error tracking via Sentry
- Logging infrastructure
- Performance monitoring
- Update processes for security patches

## Accessibility & Compliance

### Accessibility Standards

- WCAG compliance targets
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements

### Regulatory Compliance

- Data privacy considerations (GDPR, etc.)
- User data handling policies
- Open-source licensing compliance
- AI output safety and content policies
