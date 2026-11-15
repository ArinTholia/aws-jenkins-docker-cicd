# 🍔 CloudBite Cafe — Fully Automated CI/CD Pipeline for a Dynamic Web Application

> **DevOps Project Stack:** **1. AWS Cloud (EC2)** • **2. Git & GitHub** • **3. Jenkins CI/CD** • **4. Docker Desktop**

---

## 📌 Project Overview

**CloudBite Cafe** is a full-stack, cloud-native food ordering and kitchen dispatch web application built with **Node.js**, **Express**, and modern reactive frontend architecture. It features:

- 🍕 **Customer Storefront:** Dynamic 12-dish food catalog with live category filtering (Pizza & Burgers, Coffee & Drinks, Desserts, Snacks) and real-time search.
- 🛍️ **Express Checkout Modal:** Real-world order placement collecting customizable **Delivery Address / Table Number** and **Payment Mode** (Instant UPI vs. Cash on Delivery).
- 📦 **Customer Live Tracker:** Personal order status stream (`Preparing` → `Out for Delivery` → `Delivered`).
- 👨‍🍳 **Manager Kitchen Dashboard (`/dashboard`):** Real-time restaurant KPIs (Total Revenue ₹, In Kitchen, Out for Delivery, Total Orders), interactive state machine buttons, and Menu CRUD management (Add & Remove dishes).
- 🔐 **Security & RBAC:** Role-Based Access Control protecting the manager portal, unauthenticated guest order lockout, and **SHA-256 cryptographic password hashing** via Node's built-in `crypto` library.

From a DevOps perspective, every push to **Git** triggers an automated **Jenkins Declarative Pipeline (`Jenkinsfile`)** that runs automated unit tests, builds an immutable **Docker Image (`Dockerfile`)**, and deploys the container to production on **AWS EC2** with zero manual downtime.

---

## 🏗️ End-to-End DevOps CI/CD Architecture

```
Developer Laptop ──(git push)──► GitHub Repository (Git SCM)
                                        │
                                  (GitHub Webhook)
                                        ▼
                        ┌───────────────────────────────────────┐
                        │        AWS Cloud (EC2 Ubuntu)         │
                        │                                       │
                        │  1. Jenkins CI/CD Server (:8080)      │
                        │     ├── Stage 1: Git SCM Checkout     │
                        │     ├── Stage 2: Run Automated Tests  │
                        │     ├── Stage 3: Docker Image Build   │
                        │     ├── Stage 4: Deploy Container     │
                        │     └── Stage 5: Health Check (/health)│
                        │                  │                    │
                        │                  ▼                    │
                        │  2. Docker Engine                     │
                        │     └── Container: cloudbite-cafe-app │
                        │         (Live Web App on Port :3000)  │
                        └───────────────────────────────────────┘
```

---

## 📂 Project Structure

| File / Folder | Role in Project & DevOps Pipeline |
| :--- | :--- |
| `server.js` | Express backend with REST APIs, SHA-256 crypto authentication, and `/health` telemetry |
| `public/index.html` | Customer Storefront with dynamic catalog, express checkout modal, and live tracker |
| `public/dashboard.html` | Manager Kitchen Dashboard with live queue, business KPIs, and menu CRUD management |
| `public/login.html` | Authentication portal with 1-click verified demo credentials |
| `public/register.html` | User registration page with duplicate email checks and SHA-256 hashing |
| `data/` | Persistent local JSON datastores (`users.json`, `menu.json`, `orders.json`) bind-mounted in Docker |
| `test/app.test.js` | Automated CI test suite executing 6 unit and API integration tests (`npm test`) |
| `Dockerfile` | Multi-stage Node.js 20 Alpine container recipe with live `HEALTHCHECK` probe |
| `docker-compose.yml` | Container orchestration with host volume mapping for zero data loss |
| `Jenkinsfile` | 5-Stage Declarative CI/CD Pipeline automating Git pull, testing, Docker build, and deployment |
| `aws-one-click-setup.sh` | Automated Bash script provisioning AWS EC2 instance (Git, Docker, Jenkins, App) |

---

## ⚡ Quick Start (Local Run & Evaluation)

### Run with Docker Desktop (Recommended)
```bash
docker compose up -d --build
```
Open **`http://localhost:3000`** in your browser.

### Run Automated Tests
```bash
npm test
```
All 6 automated test suites will pass:
```text
✔ GET /health returns status UP
✔ GET /api/menu returns cafe menu items
✔ POST and DELETE /api/orders places and removes an authenticated food order
✔ GET /login, /register, /dashboard page routes return 200
✔ POST /api/auth/login authenticates verified manager and rejects bad password
✔ POST /api/auth/register creates a new user with hashed password in database
```

---

## 🔐 Verified Demo Credentials

- **Manager / Kitchen Staff:** `manager@cloudbite.cafe` / `manager123` (Redirects to `/dashboard`)
- **Customer:** `customer@gmail.com` / `customer123` (Redirects to Storefront `/`)

---

## ☁️ 4 DevOps Tools Implementation

1. **Git & GitHub:** Distributed version control with branching, commit history, and GitHub remote repository.
2. **Docker & Docker Desktop:** Multi-stage Alpine containerization with volume persistence on port 3000.
3. **Jenkins:** Declarative CI/CD automation pipeline defined as code in `Jenkinsfile`.
4. **AWS Cloud (EC2):** Ubuntu cloud server target provisioned with security groups and container deployment.
