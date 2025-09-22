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
- **Biome** for fast linting, formatting, and import sorting
- **Vitest** + **Testing Library** for component testing

## 📁 Project Structure

```
src/
├── pages/              # Route components
├── features/           # Feature-based modules (co-located)
│   ├── auth/          # Authentication
│   ├── tasks/         # Task management
│   └── dashboard/     # Dashboard overview
├── shared/            # Reusable code
│   ├── ui/           # Shared components
│   ├── lib/          # Utilities
│   └── api/          # API configuration
└── config/           # Environment configuration
```

## 🚦 Getting Started

1. **Clone and install**:
   ```bash
   git clone <repo-url>
   cd task-manager
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Fill in your Firebase configuration
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Biome
- `npm run check` - Run all code quality checks

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

### CI/CD Pipeline

```yaml
# Automated workflow:
1. Push to GitHub → Trigger build
2. Run code quality checks (Biome lint + format + TypeScript)
3. Run tests (Vitest)
4. Build optimized bundle (Vite)
5. Deploy to Vercel preview environment
6. Manual approval → Deploy to production
```

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
