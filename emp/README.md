<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# Defence Visitor Pass Management System

A secure, enterprise-grade Visitor Pass Management System designed for restricted defence or high-security organizational environments. The platform digitizes visitor approval workflows, identity verification, gate access monitoring, and audit logging through isolated role-based portals.

---

# Overview

Traditional paper-based visitor systems are slow, difficult to audit, and vulnerable to unauthorized access. This project introduces a centralized digital platform that manages the complete lifecycle of a visitor pass — from request creation to final exit logging.

The system enforces strict workflow validation, role isolation, and security-first access control while providing realtime monitoring and emergency lockdown capabilities.

---

# Key Features

## Employee Portal

* Create visitor access requests
* Upload government ID documents
* Track approval status
* Reuse repeat visitor profiles
* View historical visit records

## HR / HOD Verification Portal

* Review and verify visitor requests
* Approve or deny passes
* Generate encrypted QR-based visitor passes
* Access analytics dashboards
* Monitor active visitors on site

## Security Gate Portal

* Scan QR visitor passes
* Validate visitor identity
* Perform check-in / check-out operations
* Trigger emergency lockdown
* Blacklist or revoke visitor access

## Super Admin Portal

* Manage users and departments
* Monitor audit logs
* Track system activity
* View security analytics

---

# System Workflow

```text
Draft
   ↓
Pending HR Verification
   ↓
Approved / Denied
   ↓
Checked In
   ↓
Checked Out
```

Emergency override:

```text
Any Active State
      ↓
Revoked / Terminated
```

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn UI

## Backend

* FastAPI
* PostgreSQL
* SQLAlchemy
* Redis
* WebSockets

## Authentication & Security

* JWT Authentication
* Role-Based Access Control (RBAC)
* Secure File Uploads
* Encrypted QR Tokens
* Immutable Audit Logs

## Deployment

* Docker
* Vercel
* Railway / Render

---

# Core Security Features

* Role-isolated portals
* JWT-protected APIs
* Route-level authorization
* Government ID masking
* Immutable audit logging
* Redis-backed pass revocation
* Emergency lockdown system
* Secure QR validation workflow

---

# Database Design

Core tables include:

* users
* departments
* visitors
* visitor_requests
* gate_logs
* blacklists
* audit_logs

The database is designed with normalized relational structures and strict foreign key integrity.

---

# Realtime Capabilities

The platform uses WebSockets and Redis to support:

* Live gate updates
* Active occupancy tracking
* Instant pass revocation
* Emergency lockdown broadcasting
* Realtime dashboard synchronization

---

# QR Verification System

Approved visitors receive a digitally signed QR-based visitor pass.

At the gate:

1. QR code is scanned
2. Backend validates token authenticity
3. Pass status and expiration are verified
4. Visitor profile is displayed to security personnel

Revoked or expired passes are rejected instantly.

---

# Future Enhancements

* Face recognition verification
* RFID/NFC gate integration
* AI-based anomaly detection
* Multi-campus synchronization
* Offline gate verification mode
* Advanced analytics dashboards

---

# Project Goals

This project aims to demonstrate:

* Secure enterprise system design
* Full-stack architecture
* Role-based workflow systems
* Realtime distributed systems
* Secure access control engineering

---

# Folder Structure

```bash
frontend/
backend/
docs/
docker/
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>
cd defence-visitor-pass-management-system
```

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
STORAGE_BUCKET=
```

---

# Screens Included

* Employee Dashboard
* HR Verification Dashboard
* Security Gate Control Panel
* QR Scanner Interface
* Analytics Dashboard
* Emergency Lockdown Interface

---

# License

This project is intended for educational and research purposes.

---

# Author

Developed as a secure enterprise-grade visitor management platform focused on defence-oriented access control and audit compliance.
>>>>>>> 8c86020f990034d81b9ec0a3a7efc8d26ea9c0e7
