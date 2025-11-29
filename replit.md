# Online Medicine Order System

## Overview

This is a web-based medicine ordering platform that allows users to submit prescription medicine orders online. The application provides a simple interface for customers to place orders by providing their name, contact information, and medicine details. Orders are tracked with unique IDs and status indicators (pending, processing, completed, cancelled).

The system is built as a full-stack TypeScript application with a React frontend and Express backend, designed for healthcare e-commerce with emphasis on trust, clarity, and ease of use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system

**Design System:**
- Material Design principles adapted for healthcare
- Custom theme based on "new-york" shadcn style
- Primary font: Inter
- Color scheme: Neutral base with green primary accent (#16a34a equivalent)
- Emphasis on clinical cleanliness with approachable warmth
- Responsive design with mobile-first approach

**Component Organization:**
- Page components in `client/src/pages/`: home, order-form, orders, not-found
- Reusable UI components in `client/src/components/ui/`
- Shared header component for consistent navigation
- Form validation with inline error messages

**Key Features:**
- Client-side form validation before submission
- Optimistic UI updates with React Query
- Toast notifications for user feedback
- Responsive mobile menu
- Success confirmation after order submission

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESNext modules)
- **Data Validation**: Zod schemas
- **Build System**: esbuild for production bundling
- **Development**: tsx for hot reloading

**API Design:**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Centralized error handling with Zod validation errors
- Request logging middleware with timing metrics

**API Endpoints:**
- `GET /api/orders` - Retrieve all orders (sorted by creation date, newest first)
- `GET /api/orders/:id` - Retrieve single order by ID
- `POST /api/orders` - Create new order with validation

**Storage Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based design (`IStorage`) for easy database integration
- Prepared for PostgreSQL migration via Drizzle ORM

**Data Model:**
- Orders table with fields: id, customerName, phone, medicine, status, createdAt
- UUID-based primary keys
- Status enum: pending, processing, completed, cancelled
- Timestamps for order creation tracking

**Rationale:**
- In-memory storage chosen for simplicity in development/prototype phase
- Drizzle ORM configuration present for PostgreSQL migration path
- Clean separation between storage interface and implementation allows swapping storage backends without changing API layer

### Database Design

**Schema Definition:**
- Drizzle ORM schema in `shared/schema.ts`
- PostgreSQL configured as target database (via drizzle.config.ts)
- Shared schemas between client and server for type safety

**Data Validation:**
- Zod schemas generated from Drizzle tables using `drizzle-zod`
- Validation rules:
  - Customer name: minimum 2 characters
  - Phone: minimum 10 digits, numeric format validation
  - Medicine: minimum 3 characters
- Insert schemas omit auto-generated fields (id, createdAt, status)

**Migration Strategy:**
- Migrations output to `./migrations` directory
- Environment variable `DATABASE_URL` required for database connection
- `db:push` script for schema synchronization

### Build and Deployment

**Development Mode:**
- Vite dev server with HMR (Hot Module Replacement)
- Express server with middleware mode integration
- tsx for TypeScript execution without compilation
- Source maps for debugging

**Production Build:**
- Two-stage build process (client + server)
- Client: Vite builds to `dist/public`
- Server: esbuild bundles to `dist/index.cjs`
- External dependencies optimization with allowlist for bundling critical packages
- Static file serving from built client directory

**Build Optimizations:**
- Selected dependencies bundled to reduce syscalls and improve cold start
- External packages not bundled to leverage node_modules caching
- Tree-shaking and minification in production

## External Dependencies

### UI Framework Dependencies
- **@radix-ui/***: Unstyled, accessible UI primitives (dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Lucide React**: Icon library

### Data Management
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation integration
- **zod**: Schema validation library
- **zod-validation-error**: Human-readable Zod error messages

### Database and ORM
- **drizzle-orm**: TypeScript ORM
- **drizzle-zod**: Zod schema generation from Drizzle tables
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-kit**: Drizzle CLI tools for migrations

### Backend Framework
- **express**: Web server framework
- **cors**: Cross-origin resource sharing middleware
- **connect-pg-simple**: PostgreSQL session store (prepared for session management)

### Development Tools
- **vite**: Frontend build tool and dev server
- **@vitejs/plugin-react**: React support for Vite
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production server build
- **@replit/vite-plugin-***: Replit-specific development plugins (error overlay, dev banner, cartographer)

### Routing and Navigation
- **wouter**: Lightweight client-side routing (alternative to React Router)

### Styling and Fonts
- **Google Fonts**: Inter font family via CDN
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

**Notable Design Decisions:**
- Drizzle ORM chosen over Prisma for lighter weight and better TypeScript integration
- Wouter chosen over React Router for smaller bundle size
- Neon serverless driver prepared for edge/serverless deployment scenarios
- Radix UI provides accessibility out of the box for healthcare compliance