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
- **Pre-Schedule Visitors:** Pre-register guests by scheduling dates, times, and purpose of visit in advance.
- Create visitor access requests & upload government ID documents.
- Track approval status in real-time.
- Reuse repeat visitor profiles for faster booking.
- View historical visit records.

## HR / HOD Verification Portal

* Review and verify visitor requests
* Approve or deny passes
* Generate encrypted QR-based visitor passes
* **HR Analytical Dashboard:** Access comprehensive visual metrics including active site occupancy, peak visitor hours, departmental breakdown, and historical logs.
* Monitor active visitors on site

## Security Gate Portal

* Scan QR visitor passes
* Validate visitor identity
* Perform check-in / check-out operations
* Trigger emergency lockdown
* Blacklist or revoke visitor access

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
- Employee Dashboard (with Pre-Scheduling Form)
- HR Verification Portal & Approval Queue
- HR Analytical Dashboard (Visual metrics, department traffic, and occupancy trends)
- Security Gate Control Panel
- QR Scanner Interface
- Emergency Lockdown Interface
---

# License

This project is intended for educational and research purposes.

---

# Author

Developed as a secure enterprise-grade visitor management platform focused on defence-oriented access control and audit compliance.
