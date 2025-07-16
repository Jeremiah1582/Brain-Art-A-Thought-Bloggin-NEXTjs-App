# Contributing to Brain Art

Thank you for your interest in contributing to Brain Art! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Check existing issues before creating a new one
- Use the issue template if available
- Provide clear reproduction steps
- Include screenshots for UI issues

### Making Changes
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes thoroughly**
5. **Commit with a descriptive message**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style
- Use descriptive variable and function names
- Add comments for complex logic
- Follow the existing code structure
- Use consistent indentation (2 spaces)

### Component Guidelines
- Use functional components with hooks
- Keep components small and focused
- Use meaningful prop names
- Add PropTypes or TypeScript types when possible

### API Guidelines
- Follow RESTful conventions
- Include proper error handling
- Add request validation
- Document new endpoints

### CSS Guidelines
- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design
- Test on multiple screen sizes

## 🧪 Testing

### Before Submitting
- [ ] Test on multiple browsers
- [ ] Test responsive design
- [ ] Verify authentication flows
- [ ] Check for console errors
- [ ] Test database operations

### Testing Checklist
- [ ] All existing features still work
- [ ] New features work as expected
- [ ] No broken links or 404 errors
- [ ] Forms submit correctly
- [ ] Search functionality works
- [ ] User authentication works

## 📝 Commit Message Format

Use clear, descriptive commit messages:

```
Type: Brief description

Longer description if needed
```

### Types:
- `Add:` New features
- `Fix:` Bug fixes
- `Update:` Updates to existing features
- `Remove:` Removing code or features
- `Refactor:` Code refactoring
- `Style:` Formatting, styling
- `Docs:` Documentation changes

### Examples:
```bash
Add: user profile avatar upload feature
Fix: search not working with special characters
Update: improve mobile navigation design
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Image upload for posts
- [ ] Dark mode toggle
- [ ] Like/love functionality
- [ ] Post sharing features
- [ ] Email notifications

### Medium Priority
- [ ] Advanced search filters
- [ ] User following system
- [ ] Post categories
- [ ] Comment system
- [ ] Post bookmarking

### Low Priority
- [ ] Theme customization
- [ ] Export posts feature
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Additional OAuth providers

## 🚀 Getting Started

### Setup Development Environment
1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/Brain-Art-A-Thought-Bloggin-NEXTjs-App.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Database Setup
- Create a MongoDB database (local or cloud)
- Update `MONGODB_URI` in your `.env.local`
- The app will create collections automatically

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

## 📞 Getting Help

- **Issues**: Create a GitHub issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: Contact the maintainer for urgent matters

## 📄 License

By contributing to Brain Art, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Brain Art! Your efforts help make this platform better for everyone. 🧠✨ 