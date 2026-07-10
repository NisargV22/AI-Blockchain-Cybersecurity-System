# SentinelX: AI-Blockchain Hybrid SIEM & SOAR Cybersecurity Platform

SentinelX is a state-of-the-art hybrid Security Information and Event Management (SIEM) and Security Orchestration, Automation, and Response (SOAR) command center. It combines Machine Learning (ML) threat heuristics with Ethereum Blockchain log anchoring to create a highly visual, completely tamper-proof log auditing and threat response platform.

---

### 🌐 Live Cloud Deployment
* **Frontend Dashboard (Vercel):** [https://sentinelx-24162172004-5650.vercel.app](https://sentinelx-24162172004-5650.vercel.app)
* **Backend API (Render):** `https://sentinelx-backend.onrender.com`
* **AI Engine (Render):** `https://sentinelx-ai.onrender.com`
* **Database (MongoDB Atlas):** Hosted in the cloud
* **Blockchain Smart Contract (Sepolia Testnet):** `0xC025A7897972A2870F8F1d26D161C460a40463A7`

---

## 1. Project Architecture Overview

The system is built on a decoupled, high-performance microservices architecture:

```mermaid
graph TD
    User([SOC Analyst / Corporate Employee]) -->|HTTPS / WSS| Frontend[React / Vite Web Console]
    Frontend -->|API Gateway Queries| Backend[Express Ingestion Backend]
    Backend -->|Read/Write Logs & Rules| DB[(MongoDB Atlas Cloud)]
    Backend -->|JSON-RPC Hash Anchoring| Blockchain[Ethereum Sepolia Testnet via Alchemy]
    Backend -->|HTTP Telemetry Predict| AI[Python Flask AI Threat Classifier]
    UDP([Syslog Clients]) -->|UDP Syslog Ingest| Backend
```

### Component Breakdown
1. **Frontend (React / Vite)**: A premium dark-themed dashboard styled with CSS custom systems. Provides real-time threat charts, alerts, UBA risk scoring, detection rule editors, and ledger auditing tools.
2. **Backend (Node.js / Express)**: High-throughput ingestion server that coordinates WebSocket log streaming, validates JSON Web Tokens (JWT), processes RBAC routing, manages active API keys, runs automated SOAR workers, and bridges data to the AI Engine and local Blockchain.
3. **AI Engine (Python / Flask)**: Runs a trained machine learning classifier model (Scikit-Learn Random Forest/SVM heuristics) to grade event threat risks dynamically from 0% to 100%.
4. **Blockchain Anchor (Ethereum / Solidity)**: A Solidity smart contract (`LogIntegrity.sol`) compiled and deployed to the live **Ethereum Sepolia Testnet** via Alchemy. Anchors batches of log hashes to the ledger to enforce audit-trail immutability.
5. **Database (MongoDB)**: Stores structured log documents, system configuration rules, threat warning profiles, user accounts, and anchored blockchain records.

---

## 2. Why Each Component is Critical

| Component | Technology | Why We Need It |
| :--- | :--- | :--- |
| **Tamper-Proof Audit** | `Solidity & Ethereum` | Attackers always attempt to clear/alter security log files to hide their presence. Blockchain makes logs mathematically immutable. Auditing compares the database against block headers to flag any tamper attempt instantly. |
| **Predictive Scoring** | `Python Heuristic Engine` | Standard SIEM systems rely on static threshold rules. The AI Classifier detects complex anomaly combinations (e.g. geographical shifting + rapid file access) to assign a dynamic probability score. |
| **Real-Time Visualizer** | `React & Tailwind` | Security Operations Centers (SOC) need to prioritize threats instantly. The interactive charts, line trends, and alerts console compile millions of records into prioritized visual categories. |
| **Log Collector** | `Node.js & Socket.io` | Captures incoming telemetry via UDP Syslog or REST API endpoints, pushes them instantly to the client browser, and automatically executes SOAR scripts without slowing down database writes. |
| **Persistent Storage** | `MongoDB Document Store` | Logs vary drastically in format (SSH logins vs SQL queries). MongoDB allows us to store polymorphic event data with flexible schemas at scale. |

---

## 3. Database Schema Configuration (MongoDB Collections)

The database utilizes the following collections under the `sentinelx` database:

* **`users`**: Stores seeded system credentials:
  * **5 SOC Analysts** (`analyst1@sentinelx.io` to `analyst5@sentinelx.io`, password: `Analyst@123456`)
  * **10 Employees** (`employee1@sentinelx.io` to `employee10@sentinelx.io`, password: `Employee@123456`)
  * *Note: Passwords are encrypted using secure `bcrypt` hashes.*
* **`auditlogs`**: Stores all administrative user action trails (`LOGIN_SUCCESS`, `RESET_PASSWORD`, `CREATE_RULE`, etc.). These are the logs that get anchored to the blockchain.
* **`blockchainrecords`**: Keeps track of anchored batches, block numbers, transaction hashes, and the list of audit log IDs locked inside each block.
* **`events`**: Telemetry log records (SQL Injection, Brute Force, Scanning) with source/destination IPs, byte counts, and threat indicators.
* **`alerts`**: High-severity threat alerts derived from rules or ML thresholds awaiting SOC analyst review.
* **`rules`**: Stores user-configured SIEM correlation rules.
* **`playbooks`**: Stores SOAR automated responses (e.g., block IP, isolate host).

---

## 4. Key Functional Features Completed

1. **Multi-Role Login Portal**:
   * Complete removal of MFA for simplified flow.
   * Dynamic Quick-Fill credential panels allowing direct role selection for the 5 SOC Analysts and 10 Employees (the default admin account has been completely removed).
2. **Global Search Engine**:
   * Live search inputs in the top navbar filter dashboard events by IP, Protocol, or Threat category dynamically.
3. **Account Settings Password Reset**:
   * Logged-in analysts can change their credentials securely in the settings panel. This hashes the new password with BCrypt in MongoDB and logs a `PASSWORD_RESET` audit log event.
4. **Real-time Ingestion & Health Checks**:
   * Background simulators generate telemetry, while the system monitor widget displays green online statuses for MongoDB, Blockchain RPC, the AI Engine, and the Syslog Pipe.
5. **Automatic Blockchain Ledger Verification**:
   * The backend dynamically verifies all anchored records on load or poll.
   * If a log is edited in MongoDB Compass, the verification check fails. A flashing red warning banner (`🚨 Security Alteration Detected`) immediately appears on **both the main Dashboard and the Ledger Auditing console**.
   * A critical system alert (`ALT-TAMPER`) is injected directly into the Live Threat Warnings feed on the dashboard sidebar.

---

## 5. Cloud Deployment Architecture

This project is configured for 100% free cloud deployment:

### 1. MongoDB Atlas (Database)
* A free M0 cluster is used to host the MongoDB database.
* Network access must be open to `0.0.0.0/0` to allow Render connections.

### 2. Render (Backend & AI)
* **AI Engine:** Deployed as a web service using `pip install -r requirements.txt` and `python src/app.py`. It runs an isolated Flask server for ML predictions.
* **Backend:** Deployed as a Node.js web service. Environment variables (`MONGODB_URI`, `AI_SERVICE_URL`, `JWT_SECRET`, `ETH_RPC_URL`, `ETH_PRIVATE_KEY`, `CONTRACT_ADDRESS`) must be provided in the Render dashboard.

### 3. Alchemy & Sepolia (Blockchain)
* The smart contract is deployed to the Sepolia testnet using Alchemy as the RPC node.
* Deployment script: `npx hardhat run scripts/deploy.js --network sepolia`

### 4. Vercel (Frontend)
* The Vite/React frontend is built and deployed using Vercel.
* The `VITE_API_URL` environment variable is mapped to the Render backend URL to enable seamless full-stack communication.
