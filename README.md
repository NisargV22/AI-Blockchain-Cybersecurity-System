# SentinelX: Next-Generation SIEM & Cybersecurity Platform

## Overview
**SentinelX** is an advanced Security Information and Event Management (SIEM) platform that converges Artificial Intelligence (AI) and Blockchain technology to provide unparalleled threat detection, log immutability, and compliance auditing. 

Unlike traditional SIEMs where logs can be tampered with by malicious actors who gain root access, SentinelX cryptographically anchors log batches to a simulated blockchain ledger, ensuring absolute data integrity. Additionally, a built-in Machine Learning telemetry engine analyzes network payloads, grading them on a threat score to alert Security Operations Center (SOC) analysts to malicious or suspicious activity in real time.

---

## Key Architectural Pillars

### 1. AI-Driven Threat Analytics
- **Machine Learning Engine**: Parses incoming network requests, evaluating payloads for known attack vectors (e.g., SQL Injection, Cross-Site Scripting, Directory Traversal, Command Injection).
- **Threat Scoring**: Every incoming log is assigned a confidence score between 0% and 100%. 
  - `> 70%`: Malicious (Critical/High Severity Alert generated)
  - `35% - 70%`: Suspicious (Medium/Low Severity Alert generated)
  - `< 35%`: Benign / Safe
- **Automated Alerting**: Threats automatically trigger alerts that populate the SOC analyst dashboard for immediate triage (Acknowledge / Mark as False Positive).

### 2. Blockchain Immutability Ledger
- **Cryptographic Anchoring**: Log entries are batched and hashed using SHA-256. These hashes are anchored into a blockchain ledger.
- **Tamper Detection**: If a malicious actor compromises the core MongoDB database and attempts to delete or alter logs to cover their tracks, SentinelX will immediately detect the cryptographic mismatch between the database and the immutable ledger.
- **Auto-Alerting**: Triggers a massive `Critical` system alert ("Security Alteration Detected") upon detecting database tampering.

### 3. Comprehensive Dashboard & UI/UX
- **Glassmorphism Design**: Features a highly aesthetic, modern UI using Tailwind CSS with glassmorphism effects, dynamic gradients, and smooth micro-animations.
- **Role-Based Access Control (RBAC)**: 
  - `Admin`: Full access to all modules including User Management.
  - `SOC Analyst`: Access to dashboards, threat intel, and SOAR capabilities.
  - `Employee`: Limited access to the Incident Reporting Portal.
- **Live Event Console**: Real-time structured log viewing with dynamic filtering (by Malicious, Suspicious, Web Services).

---

## Core Features & Modules

### 🔹 Log Console & Dashboard (`/`)
The central nervous system for SOC analysts.
- Real-time SIEM event streaming.
- Key Performance Indicators (KPIs) showing ingestion rates, active threats, and blocked attacks.
- Server health monitoring (Log DB, AI Engine, Blockchain Anchor).
- Quick Action controls (Acknowledge all alerts).

### 🔹 Threat Intelligence (`/threats`)
A dedicated portal for dissecting identified attacks.
- View Raw JSON payloads of malicious requests.
- Maps attacks to OWASP Top 10 categories.
- Provides actionable remediation steps.

### 🔹 Analytics & UBA (`/analytics`, `/uba`)
- Visual charts and graphs representing threat vectors over time.
- User Behavior Analytics (UBA) to track anomalous employee behavior, insider threats, or compromised credentials.

### 🔹 Ledger Auditing (`/blockchain`)
- The UI interface for the Blockchain immutability layer.
- View cryptographically sealed blocks, their timestamps, and hash signatures.
- Re-verify ledger integrity on demand.

### 🔹 SOAR & Playbooks (`/soar`, `/playbook-guides`)
- **SOAR (Security Orchestration, Automation, and Response)**: Execute automated scripts in response to threats (e.g., auto-ban IPs, isolate infected nodes).
- **Playbooks**: Step-by-step incident response guides for junior analysts to follow during major breaches (e.g., Ransomware outbreak, DDoS).

### 🔹 Detection Rules & API Settings (`/rules`, `/api-settings`)
- Dynamically tune the AI engine and OWASP detection parameters.
- Manage API keys and webhooks for integrating SentinelX with third-party tools like Slack, Jira, or AWS CloudWatch.

### 🔹 Incident Portal (`/report-incident`)
- A secure portal for non-security employees to report phishing emails, lost devices, or suspicious network activity to the SOC team.

---

## Technical Stack

### Frontend (Client-Side)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS (Native Vanilla CSS integrations for complex glassmorphism)
- **Routing**: React Router DOM
- **Deployment**: Vercel

### Backend (Server-Side)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security Middleware**: Helmet.js, CORS restrictions, custom recursive NoSQL injection sanitizers.
- **Proxy Trust**: Configured to trust load balancers/proxies (like Render/Vercel) to extract true client `X-Forwarded-For` IPs.
- **Deployment**: Render

### Security Enhancements Implemented
- **Session Protection**: Uses `sessionStorage` (instead of `localStorage`) to isolate authentication tokens per tab, heavily mitigating Cross-Site Scripting (XSS) payload exfiltration.
- **Inactivity Timeouts**: Auto-logout implemented after 30 minutes of idle time to prevent session hijacking on unattended workstations.
- **Asset Preloading**: Aggressive `<link rel="preload">` directives for massive image assets to prevent layout shifting and ensure instant visual rendering.

---

## Setup & Local Development Workflow

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NisargV22/SentinelX.git
   cd AI-Blockchain-Cybersecurity-System
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with MONGO_URI and JWT_SECRET
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/ai-blockchain-frontend
   npm install
   # Ensure vite.config.js points to the backend (e.g., localhost:4000 for local proxy)
   npm run dev
   ```

4. **Simulating Threats**
   - The platform includes testing endpoints to simulate attacks (SQLi, XSS) to watch the AI engine flag them in real-time on the dashboard.
