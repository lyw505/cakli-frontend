# Cakli Frontend - Admin Dashboard System

Cakli is a comprehensive logistics and delivery management system. This repository contains the frontend implementation for three major administrative segments: **Operation Admin**, **Reporting Admin**, and **Master Admin**.

## ✨ Feature Highlights

### �️ Master Admin (Policy Control)
- **Consolidated Dashboard**: Global revenue and performance metrics across all regions.
- **Dynamic Tariff Management**: Real-time control over base fares, surge multipliers, and pricing simulation.
- **Regional Zone Control**: Activation/deactivation of operational zones and maintenance window management.
- **Role-Based Access (RBAC)**: Comprehensive team hierarchy and permission matrix.
- **Immutable Audit Vault**: Cryptographically signed logs for high-stakes configuration changes.

### 📊 Reporting Admin (Data & Finance)
- **Read-Only Analytics**: Interactive area and line charts for order volume and revenue trends.
- **Automated Reports**: Segmented libraries for finance (Excel/JSON exports).
- **Transactional Audit**: Detailed order history with deep-dive modal views for individual instances.

### ⚡ Operation Admin (Real-Time Ops)
- **Dynamic Dashboard**: Real-time monitoring of active drivers, pending orders, and complaints.
- **Fleet Management**: Interactive lists for active/inactive drivers with status toggles.
- **Complaint Handling**: Visual management of customer feedback and issue priorities.

---

## �🚀 Setup Tutorial (Local Development)

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

### 3. Running the Development Server
Start the local development environment:
```bash
npm run dev
```
Access the central landing page at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Project Structure
- `app/`: Next.js App Router structure.
  - `(root)/page.tsx`: Central Gateway Navigation.
  - `operation-admin/`: Real-time operational controls.
  - `reporting-admin/`: Data-focused analytics.
  - `master-admin/`: High-level system configuration.
- `components/`: UI and Sidebar components for each segment.

## 🎨 Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/UI (Radix-based)
- **Visuals**: Recharts (Analytics) & Lucide (Icons)

---

## 🔐 Security & Audit
All administrative actions within the **Master Admin** panel are automatically timestamped and logged in the **Audit Vault**. This ensures full accountability for sensitive configuration changes like tariff updates or access revocations.

