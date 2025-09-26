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

## 🚀 Current Features

- ✅ **User authentication** with Firebase Auth
- ✅ **Responsive navigation** with sidebar and mobile support
- ✅ **Production deployment** on Vercel
- 🚧 **Task management** (in development)

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
- **Bun** for package management and built-in testing

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

## 🚀 Deployment

**Current Setup:**
- **Frontend**: Vercel (automatic deployment from GitHub)
- **Backend**: Firebase (auth + database)
- **CI/CD**: GitHub Actions with code quality checks

## 🔒 Security & Performance

**Security Measures:**
- **Firebase Security Rules** for data access control
- **Environment variables** for sensitive configuration
- **HTTPS enforcement** via Vercel
- **Input validation** with Zod schemas

**Performance & Monitoring:**
- **Code quality gates** in CI/CD pipeline
- **TypeScript strict mode** for error prevention
- **Vercel Analytics** (planned)
- **Error tracking** (planned)
