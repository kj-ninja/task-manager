# Task Manager - Real-time Collaborative Task Board

A modern, real-time task management application built for interview preparation and practical learning. Perfect for couples or teams to manage tasks, important dates, and shared responsibilities.

## 🎯 Project Goals

This project serves as a comprehensive frontend development learning platform, covering:
- **Real-time collaboration** using Firebase
- **Cross-platform compatibility** (Chrome on macOS, Edge on Windows, mobile-responsive)
- **Modern React patterns** with TypeScript
- **State management** with Zustand
- **Server state** with TanStack React Query
- **Form handling** with React Hook Form + Zod validation
- **Styling** with Tailwind CSS v4
- **Testing** strategies for modern React apps

## 🚀 Features

- **Real-time task synchronization** across devices
- **User authentication** with Firebase Auth
- **Task management** (create, edit, delete, status updates)
- **Important dates tracking**
- **Priority levels** and due dates
- **Mobile-responsive design**
- **Offline-capable** (planned)
- **Dark mode** (planned)

## 🛠 Tech Stack

### Core
- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router DOM** for routing

### State & Data
- **Zustand** for client state
- **TanStack React Query** for server state
- **Firebase** for backend (auth, database, real-time)
- **React Hook Form** + **Zod** for forms

### UI & Styling
- **Tailwind CSS v4** for styling with custom design system
- **shadcn/ui** for accessible, customizable UI components
- **class-variance-authority** + **clsx** + **tailwind-merge** for conditional styling
- **Framer Motion** for smooth animations and transitions
- **@dnd-kit** for drag and drop functionality
- **Lucide React** for consistent iconography
- **React Hot Toast** for user notifications

### Development
- **TypeScript** with strict configuration
- **Biome** for fast linting, formatting, and import sorting (2-100x faster than ESLint+Prettier)
- **Bun** for package management and built-in testing (Jest-compatible)

## 🚦 Getting Started

1. **Clone and install**:
   ```bash
   git clone <repo-url>
   cd task-manager
   bun install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Fill in your Firebase configuration
   ```

3. **Development**:
   ```bash
   bun run dev
   ```

## 📝 Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production (TypeScript compilation + Vite build)
- `bun run preview` - Preview production build locally
- `bun run lint` - Run Biome linter only
- `bun run format` - Format code with Biome
- `bun run check` - Run Biome formatter, linter, and import sorting with auto-fix
- `bun test` - Run all tests with Bun's native test runner

## 🎯 Learning Objectives

This project is designed to demonstrate and practice:

### Technical Skills
- Modern React patterns and hooks
- TypeScript best practices
- State management architecture
- Real-time data synchronization
- Form validation and UX
- Responsive design principles
- Performance optimization

### Interview Topics
- Component architecture decisions
- State management trade-offs
- Testing strategies
- Error handling and user experience
- Security considerations
- Performance monitoring
- Code organization and scalability

## 🚀 Deployment Infrastructure

### Production Deployment Strategy

**Frontend Hosting**: **Vercel** (Recommended)
- ✅ **Zero-config** Vite deployment
- ✅ **Automatic previews** for pull requests
- ✅ **Edge functions** for API routes if needed
- ✅ **Built-in analytics** and performance monitoring
- ✅ **Custom domains** and SSL certificates
- ✅ **Seamless GitHub integration**

**Alternative Options**:
- **Netlify** - Similar features, great for static sites
- **Firebase Hosting** - Tight Firebase integration, CDN included
- **AWS Amplify** - Enterprise-grade with advanced CI/CD

### Backend Infrastructure

**Database & Auth**: **Firebase**
- ✅ **Firestore** for real-time data synchronization
- ✅ **Firebase Auth** for user authentication
- ✅ **Security rules** for data protection
- ✅ **Offline support** built-in
- ✅ **Automatic scaling** and global CDN

### CI/CD Pipeline (Frontend-Focused)

```yaml
# Simplified workflow for frontend recruitment demonstration:
1. Push to GitHub → Trigger build
2. Code Quality Gates:
   - `bun run check` - Biome linting & formatting
   - `bun run build` - TypeScript compilation + Vite build
   - `bun test` - Unit tests with Bun's built-in test runner
   - `tsc --noEmit` - Type checking without emit
3. Deploy to Vercel preview environment
4. Manual approval → Deploy to production
```

**Focus Areas for Interview Preparation:**
- Clean, maintainable code (automated formatting with Biome)
- TypeScript proficiency (strict type checking)
- Testing knowledge (unit/component tests with Bun)
- Build process understanding (Vite bundling)
- Modern tooling familiarity (Biome 2-100x faster than ESLint/Prettier)
- Performance optimization (Bun vs npm/yarn)

### Environment Configuration

```bash
# Production environments:
- Development: Local with Firebase emulators
- Staging: Vercel preview + Firebase dev project
- Production: Vercel production + Firebase prod project
```

### Performance & Monitoring

- **Vercel Analytics** for Core Web Vitals
- **Firebase Performance** for backend metrics
- **Sentry** for error tracking (planned)
- **Lighthouse CI** for performance regression testing

### Security Considerations

- **Firebase Security Rules** for data access control
- **Environment variables** for sensitive configuration
- **HTTPS everywhere** with automatic SSL
- **CSP headers** via Vercel configuration
- **Firebase App Check** for API protection

This infrastructure provides **enterprise-grade reliability** while remaining **cost-effective** for personal/learning projects, with seamless scaling as the application grows.
