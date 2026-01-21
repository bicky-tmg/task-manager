# Task Manager Application

## Project Overview

The **Task Manager** is a modern, client-side web application built with **React**, **TypeScript**, and **Vite**. It allows users to efficiently create, manage, filter, and organize tasks while emphasizing performance, maintainability, and accessibility through a modular architecture and modern frontend tooling.

### Main Features

- Create, update, and delete tasks
- Filter and search tasks using multiple criteria
- Import tasks from CSV files
- Export tasks to CSV
- Light and dark theme support
- Centralized state management using Zustand
- Schema-based form validation
- Fast development and optimized builds via Vite
- Accessible UI components using Radix UI

---

## Technology Stack and Justification

### Core Technologies

- **React 19**
  - Component-based architecture
  - Large ecosystem and strong community support

- **TypeScript**
  - Static typing for improved reliability and maintainability
  - Better developer experience and fewer runtime errors

- **Vite**
  - Fast development server startup
  - Optimized production builds with minimal configuration

### State Management

- **Zustand**
  - Lightweight and intuitive global state management
  - Minimal boilerplate compared to Redux

### Forms and Validation

- **React Hook Form**
  - Efficient form handling with reduced re-renders

- **@hookform/resolvers**
  - Seamless integration with schema-based validation

- **Custom validation schemas**
  - Centralized validation logic located in `src/validation`

### UI and Styling

- **Radix UI**
  - Accessible, unstyled UI primitives
  - Ensures keyboard navigation and ARIA compliance

- **Utility-first styling and animations**
  - Predictable, maintainable styling approach

### Tooling and Code Quality

- **ESLint**
  - Enforces coding standards and best practices

- **TypeScript ESLint**
  - Adds type-aware linting rules

- **pnpm**
  - Fast, disk-efficient package manager

---

## Setup and Running Instructions

### Prerequisites

- Node.js **18+**
- pnpm (recommended)

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:5173
```

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Environment Variables

- No environment variables are required at this time.

---

## Available Scripts

The following scripts are defined in `package.json`:

| Script         | Description                           |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Starts the Vite development server    |
| `pnpm build`   | Builds the application for production |
| `pnpm preview` | Serves the production build locally   |
| `pnpm lint`    | Runs ESLint across the codebase       |

---

## Design Decisions and Trade-offs

### Architecture

- Flat folder structure to improve scalability and readability
- Clear separation of UI components, state management, hooks, and utilities

### State Management

- **Zustand** was chosen over Redux to:
  - Reduce boilerplate
  - Simplify global state handling

- **Trade-off**: Fewer built-in devtools compared to Redux Toolkit

### CSV Handling

- CSV import and export are handled using **Web Workers**:
  - `csvUploadWorker.ts`
  - `csvDownloadWorker.ts`

- Improves performance by offloading heavy parsing to background threads
- **Trade-off**: Increased implementation complexity

### Validation Strategy

- Centralized schema-based validation
- Ensures consistency and easier long-term maintenance

---

## Known Limitations

- No backend
- No authentication or user management
- No automated tests implemented yet
- CSV import relies on a predefined format

---

## Future Improvements

- Implement authentication and user accounts
- Add unit and integration tests
- Enable drag-and-drop task reordering
- Add analytics and task statistics dashboard

---

## Other Important Information

### Folder Structure

```text
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── store/          # Zustand stores
├── lib/            # Utility functions and web workers
├── validation/     # Schema-based validation
├── types/          # Shared TypeScript types
├── constant/       # Application constants
├── assets/         # Static assets
└── App.tsx         # Root application component
```

### Coding Standards

- TypeScript-first approach
- Functional React components
- ESLint-enforced rules
- Custom hooks for reusable logic

### Testing Strategy (Planned)

- Unit tests for state stores and utilities
- Component tests using React Testing Library
- CSV worker tests for data integrity

---

## License

- This project is currently private and not licensed for public redistribution.
