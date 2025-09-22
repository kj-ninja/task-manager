# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint for code quality checks
- `npm run lint:biome` - Run Biome linter only
- `npm run format` - Format code with Biome
- `npm run check` - Run Biome formatter, linter, and import sorting with auto-fix

### Testing
This project includes Vitest for testing but no test scripts are currently configured in package.json. Tests can be run using `npx vitest` directly.

## Tech Stack & Architecture

This is a React + TypeScript + Vite application with the following key technologies:

### Core Framework
- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **React Router DOM** for client-side routing

### State Management & Data Fetching
- **Zustand** for global state management
- **TanStack React Query** for server state and caching
- **React Hook Form** with **Zod** for form handling and validation

### UI & Styling
- **Tailwind CSS v4** for styling (configured via Vite plugin)
- **Tailwind Forms & Typography** plugins included
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Utilities
- **class-variance-authority** & **clsx** & **tailwind-merge** for conditional styling
- **@dnd-kit** for drag and drop functionality
- **date-fns** for date manipulation

### Backend Services
- **Firebase** for backend services (authentication, database, etc.)

### Development Tools
- **ESLint** with TypeScript, React Hooks, and React Refresh plugins
- **Biome** for fast formatting, linting, and import sorting (configured in `biome.json`)
- **Testing Library** suite for component testing
- **Vitest** for unit testing

## Project Structure

The project follows a standard Vite React structure:
- `src/` - Main source code
- `src/main.tsx` - Application entry point
- `src/App.tsx` - Root component
- TypeScript configuration split across `tsconfig.app.json` (app code) and `tsconfig.node.json` (build tools)

## Development Notes

- Uses React 19's StrictMode
- TypeScript configured with strict mode and additional linting rules
- Tailwind CSS v4 integrated via Vite plugin (no separate config file needed)
- ESLint configured for TypeScript, React hooks best practices, and Vite refresh
- Biome configured with:
  - 2-space indentation, double quotes, semicolons as needed
  - Disabled non-null assertion warnings (common in React)
  - Disabled unknown at-rules (for Tailwind CSS directives)
  - Auto-import organization enabled
- The project appears to be a task manager application based on the name and dependencies (drag-and-drop, forms, state management)