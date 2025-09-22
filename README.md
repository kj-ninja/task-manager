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
- **ESLint** + **Biome** for code quality and formatting
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
