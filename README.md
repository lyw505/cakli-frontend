# Cakli Frontend - Admin Dashboard System

Cakli is a comprehensive logistics and delivery management system. This repository contains the frontend implementation for three major administrative segments: **Operation Admin**, **Reporting Admin**, and **Master Admin**.

## 🚀 Setup Tutorial (Local Development)

Follow these steps to get the project running on your local machine after cloning the repository.

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v20 or later recommended)
- **npm** (comes with Node.js)

### 2. Installation
Open your terminal in the project root directory and run:
```bash
npm install
```
This will install all necessary dependencies, including Radix UI, Shadcn/UI, and Recharts.

### 3. Running the Development Server
Start the local development environment:
```bash
npm run dev
```
By default, the application will be available at [http://localhost:3000](http://localhost:3000).

### 4. Direct Navigation to Admin Panels
Since each section is built as a distinct dashboard, you can access them directly:
- **Operation Admin**: `http://localhost:3000/operation-admin`
- **Reporting Admin**: `http://localhost:3000/reporting-admin`
- **Master Admin**: `http://localhost:3000/master-admin`

---

## 🛠️ Project Structure
- `app/`: Contains the Next.js App Router pages and layouts.
  - `operation-admin/`: Real-time operational controls.
  - `reporting-admin/`: Data-focused analytics and reports.
  - `master-admin/`: High-level system configuration and policies.
- `components/`: Reusable UI components.
  - `ui/`: Base Shadcn/UI components.
  - Sidebars: `operation-sidebar.tsx`, `reporting-sidebar.tsx`, `master-sidebar.tsx`.
- `lib/`: Utility functions and shared logic.

## 🎨 Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com)
- **Charts**: [Recharts](https://recharts.org)
- **Icons**: [Lucide React](https://lucide.dev)

---

## ⚠️ Troubleshooting
If you encounter a `ReferenceError` or missing component:
1. Ensure all `shadcn` components are initialized correctly.
2. Run `npm install` again to verify no packages were skipped.
3. Check the terminal for lint errors or missing imports.

