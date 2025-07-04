# NPM Package Management Guide

This guide covers the complete workflow for developing, versioning, and publishing React packages using this template.

## Development Workflow

### Initial Setup

1. **Clone and Setup**
   ```bash
   git clone <your-repo> react-package-workspace
   cd react-package-workspace/packages/react-example-package
   npm install
   ```

2. **Development Mode**
   ```bash
   npm run dev    # Watch mode with hot reloading
   npm run test:watch  # Run tests in watch mode
   ```

### Building and Testing

1. **Validation Pipeline**
   ```bash
   npm run validate  # Runs: type-check, lint:fix, format:fix, test
   ```

2. **Individual Commands**
   ```bash
   npm run type-check    # TypeScript compilation check
   npm run lint          # ESLint check
   npm run lint:fix      # ESLint with auto-fix
   npm run format        # Prettier format check
   npm run format:fix    # Prettier auto-format
   npm run test          # Run tests once
   npm run test:coverage # Run tests with coverage
   npm run build         # Build the package
   ```

## Versioning Strategy

This template uses [release-it](https://github.com/release-it/release-it) for automated versioning following [Semantic Versioning](https://semver.org/).

### Version Types

- **Patch** (1.0.0 → 1.0.1): Bug fixes, minor updates
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Conventional Commits

Use conventional commit messages for automatic version bumping:

```bash
feat: add new Button variant         # Minor version bump
fix: resolve Card component bug      # Patch version bump
feat!: change Button API             # Major version bump (breaking)

# Other types:
docs: update README
style: fix formatting
refactor: reorganize components
test: add Button tests
chore: update dependencies
```

### Release Process

1. **Prepare Release**
   ```bash
   # Ensure clean working directory
   git status
   
   # Run validation
   npm run validate
   ```

2. **Create Release**
   ```bash
   npm run release
   ```

   This command will:
   - Analyze commits since last release
   - Determine version bump type
   - Update `package.json` version
   - Generate/update `CHANGELOG.md`
   - Create git commit and tag
   - Push to remote repository
   - Create GitHub release
   - Publish to NPM

3. **Manual Version Override**
   ```bash
   npm run release -- --increment=patch
   npm run release -- --increment=minor
   npm run release -- --increment=major
   npm run release -- --new-version=2.1.0
   ```

## Local Development

### Using npm link

Best for active development and testing:

```bash
# In the package directory
cd packages/react-example-package
npm run build
npm link

# In your test project
npm link @madooei/react-example-package
```

### Using file: protocol

Best for reproducible environments:

```json
{
  "dependencies": {
    "@madooei/react-example-package": "file:../path/to/react-example-package"
  }
}
```

### Using npm pack

Best for testing final package:

```bash
# In the package directory
npm pack
# Creates: madooei-react-example-package-1.0.0.tgz

# In your test project
npm install /path/to/madooei-react-example-package-1.0.0.tgz
```

## Publishing Workflow

### NPM Setup

1. **Create NPM Account**
   ```bash
   npm adduser
   # or
   npm login
   ```

2. **Verify Access**
   ```bash
   npm whoami
   npm access list packages @madooei
   ```

### GitHub Actions (Recommended)

1. **Setup NPM Token**
   - Generate token: https://www.npmjs.com/settings/tokens
   - Add to GitHub repository secrets as `NPM_TOKEN`

2. **Automated Publishing**
   - Publishing happens automatically on `npm run release`
   - GitHub Actions workflow handles build and publish
   - Requires clean working directory and passing tests

### Manual Publishing

```bash
# Ensure you're logged in
npm whoami

# Build and validate
npm run validate
npm run build

# Publish
npm publish

# For scoped packages (first time)
npm publish --access public
```

### Publishing Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog entry added
- [ ] Version bumped appropriately
- [ ] Build artifacts generated
- [ ] GitHub release created
- [ ] NPM package published

## Package Configuration

### Peer Dependencies

React packages should use peer dependencies:

```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "tailwindcss": ">=3.0.0"
  }
}
```

### Tree-Shaking Setup

Configure individual exports for optimal bundling:

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./button": {
      "import": "./dist/button.js",
      "require": "./dist/button.cjs"
    }
  }
}
```

### Build Configuration

React components need special build consideration:

```typescript
// tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts', 'src/button.ts', 'src/card.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  jsx: 'preserve', // Important for React components
  external: ['react', 'react-dom'],
});
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run type-check`
   - Verify peer dependencies in examples
   - Ensure React imports are correct

2. **Publishing Errors**
   - Verify NPM authentication: `npm whoami`
   - Check package name availability
   - Ensure version hasn't been published

3. **Local Development Issues**
   - Clear node_modules and reinstall
   - Rebuild package: `npm run build`
   - Check symlink status: `ls -la node_modules/@madooei`

### Debug Commands

```bash
# Check package contents
npm pack --dry-run

# Verify exports
node -e "console.log(require('@madooei/react-example-package'))"

# Check dependencies
npm ls --depth=0
npm outdated
```

## Best Practices

### Development

1. **Use TypeScript strictly** - Enable all strict checks
2. **Test React components** - Use React Testing Library
3. **Validate peer dependencies** - Add runtime checks
4. **Optimize bundle size** - Use individual exports
5. **Document components** - Include prop descriptions

### Release Management

1. **Use conventional commits** - Enable automatic versioning
2. **Test before release** - Run full validation pipeline
3. **Review changelogs** - Ensure accurate release notes
4. **Monitor package size** - Track bundle impact
5. **Test installations** - Verify in real projects

### Code Quality

1. **ESLint + Prettier** - Automated code formatting
2. **TypeScript strict mode** - Catch errors early
3. **Test coverage** - Maintain >80% coverage
4. **Peer dependency validation** - Help users with setup
5. **Documentation** - Keep examples up to date