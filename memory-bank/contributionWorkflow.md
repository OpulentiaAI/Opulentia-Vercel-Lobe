# Contribution Workflow: Lobe Chat

This document outlines the contribution process for Lobe Chat, providing developers with a clear pathway for contributing to the project.

## Getting Started

### Prerequisites

Based on the project structure, contributors will likely need:

- Node.js (version specified in `.nvmrc`)
- pnpm package manager
- Git for version control
- Docker (optional, for containerized development)

### Setting Up Development Environment

1. **Repository Setup**:

   - Fork the repository
   - Clone your fork locally
   - Add the upstream repository as a remote for syncing

2. **Dependency Installation**:

   - Run `pnpm install` to install all dependencies
   - Configure environment variables based on `.env.example`

3. **Development Server**:
   - Start the development server with `pnpm dev`
   - Access the application at localhost (likely port 3000)

## Development Workflow

### Branch Strategy

Based on conventional practices and the presence of `.commitlintrc.js`:

1. **Branch Naming**:

   - `feature/*` for new features
   - `fix/*` for bug fixes
   - `docs/*` for documentation updates
   - `chore/*` for maintenance tasks

2. **Keeping Up-to-Date**:
   - Regularly sync with upstream using instructions in `contributing/Upstream-Sync.md`
   - Rebase feature branches on main/master before submitting PRs

### Commit Guidelines

The presence of `.commitlintrc.js` indicates the project uses conventional commits:

1. **Commit Format**:

   ```
   type(scope): subject

   body

   footer
   ```

2. **Commit Types**:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Formatting changes
   - `refactor`: Code changes that neither fix bugs nor add features
   - `perf`: Performance improvements
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

3. **Scope**:
   - Component or module affected by the change
   - Examples: `core`, `ui`, `api`, `i18n`, etc.

## Code Contribution Process

### Feature Development

The project includes detailed guidance in `contributing/Basic/Feature-Development.md` and `contributing/Basic/Feature-Development-Frontend.md`:

1. **Planning**:

   - Identify the feature or bug to address
   - Check existing issues and PRs to avoid duplication
   - For significant features, consider discussing in an issue first

2. **Implementation**:

   - Follow the architecture described in `contributing/Basic/Architecture.md`
   - Adhere to folder structure outlined in `contributing/Basic/Folder-Structure.md`
   - Review existing patterns for consistency

3. **Testing**:
   - Write tests according to guidance in `contributing/Basic/Test.md`
   - Ensure all tests pass using `pnpm test`

### Pull Request Process

1. **PR Preparation**:

   - Ensure code follows project style guidelines
   - Run linting and formatting checks (`pnpm lint`, `pnpm format`)
   - Update documentation if needed

2. **PR Submission**:

   - Create a pull request to the main repository
   - Provide a clear description of changes
   - Link related issues with "Fixes #issue_number" or "Relates to #issue_number"
   - Complete any PR templates provided

3. **PR Review Process**:

   - Address review comments in follow-up commits
   - Keep PR focused on a single concern for easier review
   - Update the PR as needed based on feedback

4. **PR Merge Requirements**:
   - CI checks must pass
   - Required reviews must be approved
   - Changes must adhere to project standards

## Specialized Contribution Areas

### Internationalization

The project has extensive internationalization support with guidance in `contributing/Internationalization/`:

1. **Adding New Locales**:

   - Follow instructions in `contributing/Internationalization/Add-New-Locale.md`
   - Ensure translations are complete and accurate

2. **Updating Existing Locales**:
   - Follow the implementation guide in `contributing/Internationalization/Internationalization-Implementation.md`
   - Use the i18n workflow tools in `scripts/i18nWorkflow/`

### Authentication Providers

The project supports multiple authentication methods:

1. **Adding New Providers**:
   - Follow guidance in `contributing/Basic/Add-New-Authentication-Providers.md`
   - Implement required interfaces and services

### State Management

The project uses Zustand for state management:

1. **State Changes**:
   - Follow patterns outlined in `contributing/State-Management/State-Management-Intro.md`
   - Implement selectors per `contributing/State-Management/State-Management-Selectors.md`

## Documentation Contributions

### Types of Documentation

1. **Code Documentation**:

   - Inline comments for complex logic
   - JSDoc for function and class definitions
   - TypeScript interfaces with descriptive comments

2. **User Documentation**:

   - Updates to `docs/usage/` for user-facing features
   - Updates to `docs/self-hosting/` for deployment documentation

3. **Contributor Documentation**:
   - Updates to files in `contributing/` directory
   - Examples and patterns for implementations

### Documentation Process

1. **Documentation Updates**:
   - Ensure documentation is updated with code changes
   - Follow markdown formatting conventions
   - Include screenshots or diagrams where helpful
   - Update both English and Chinese versions when applicable

## Testing Requirements

### Test Coverage

1. **Unit Tests**:

   - Components and utilities should have unit tests
   - Mock external dependencies appropriately

2. **Integration Tests**:

   - Test interactions between components
   - Test API endpoints and data flows

3. **Running Tests**:
   - Use `pnpm test` for running tests
   - Address any test failures before submitting PRs

## Code Quality Tools

The project employs several code quality tools:

1. **Linting**:

   - ESLint for JavaScript/TypeScript (`.eslintrc.js`)
   - StyleLint for CSS/SCSS (`.stylelintrc.js`)
   - Remark for Markdown (`.remarkrc.js`, `.remarkrc.mdx.js`)

2. **Formatting**:

   - Prettier for code formatting (`.prettierrc.js`)
   - EditorConfig for consistent editor settings (`.editorconfig`)

3. **Type Checking**:
   - TypeScript for static type checking (`tsconfig.json`)

## Release Process

Based on the configuration files:

1. **Versioning**:

   - Semantic versioning (configured in `.releaserc.js`)
   - Version increments based on conventional commits

2. **Changelog**:

   - Automatic changelog generation (`.changelogrc.js`)
   - User-facing changelog entries in `docs/changelog/`

3. **Release Automation**:
   - Release scripts for building and deploying
   - Documentation updates via `scripts/docsWorkflow/`

## Community Guidelines

The project includes community standards:

1. **Code of Conduct**:

   - Guidelines in `CODE_OF_CONDUCT.md`
   - Expected behavior for contributors

2. **Communication Channels**:
   - Where to ask questions or discuss features
   - How to report bugs or request features

## Recognition

Contributors are likely recognized through:

1. **Contributors List**:

   - Potential inclusion in README or CONTRIBUTORS file
   - GitHub's contributors graph

2. **Acknowledgments**:
   - Mentions in release notes for significant contributions
   - Attribution in relevant documentation

This document provides an overview of the contribution process for Lobe Chat. As the project evolves, this documentation should be updated to reflect changes in contribution workflows and requirements.
