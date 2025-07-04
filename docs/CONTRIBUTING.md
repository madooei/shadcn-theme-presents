# Contributing

Thank you for your interest in contributing to the shadcn-theme-presets project!

## Development Process

This project uses the basic [GitHub Flow](https://guides.github.com/introduction/flow/):

1. Fork the repository and create your branch from `master`
2. Make your changes following the development workflow
3. Run the validation pipeline: `npm run validate`
4. Open a pull request and describe your changes

Please keep your contributions minimal and focused. Update or add tests as needed.

### Before Contributing

1. Read the [Development Guide](DEVELOPMENT.md) for technical details
2. Understand the project philosophy of providing theme presets for shadcn/ui components
3. Ensure your changes align with the template's educational goals
4. Consider React-specific patterns and best practices for theme management

### Testing Requirements

- All new theme presets must include comprehensive tests
- Theme application logic should be thoroughly tested
- Run `npm run validate` before submitting changes
- Maintain or improve test coverage
- Test theme switching functionality and preset validation

### Documentation Updates

- Update relevant documentation when making theme preset changes
- Keep the multi-file knowledge base structure intact
- Ensure theme preset examples remain current and functional
- Update theme preset documentation when APIs change

### Theme-Specific Guidelines

- Follow shadcn/ui theming best practices
- Ensure theme presets work with both light and dark modes
- Test themes with different shadcn/ui component configurations
- Maintain Tailwind CSS compatibility and color system guidelines
- Preserve tree-shaking optimization for individual theme imports
