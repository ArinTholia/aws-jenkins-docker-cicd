# 🚀 CloudPulse — Fully Automated CI/CD Pipeline for a Dynamic Web Application

> **DevOps Project Stack:** **1. AWS Cloud (EC2)** • **2. Git & GitHub** • **3. Jenkins CI/CD** • **4. Docker**

---

## 📌 Project Overview

**CloudPulse** is a dynamic Node.js + Express web application featuring a real-time **Task & Release Manager (CRUD REST API)**, a **Live CI/CD Telemetry Banner** (displaying the active **AWS Region**, **Git Commit Hash**, **Jenkins Build Number**, and **Docker Container ID**), and a **1-Click Pipeline Simulator**.

Whenever code is pushed to **Git**, a **GitHub Webhook** automatically triggers a **Jenkins Declarative Pipeline (`Jenkinsfile`)** hosted on **AWS EC2**, which runs automated unit tests, builds a **Docker Image (`Dockerfile`)**, replaces the running container with zero manual intervention, and verifies the live `/health` endpoint.

---

## 🏗️ End-to-End CI/CD Architecture

```
Developer Laptop ──(git push)──► GitHub Repository (Git SCM)
                                        │
                                  (GitHub Webhook)
                                        ▼
                        ┌───────────────────────────────────────┐
                        │        AWS Cloud (EC2 Ubuntu)         │
                        │                                       │
                        │  1. Jenkins Server (:8080)            │
                        │     ├── Stage 1: Git Checkout         │
                        │     ├── Stage 2: Run Unit Tests       │
                        │     ├── Stage 3: Docker Image Build   │
                        │     ├── Stage 4: Run Docker Container │
                        │     └── Stage 5: Health Check (/health)│
                        │                  │                    │
                        │                  ▼                    │
                        │  2. Docker Engine                     │
                        │     └── Container: cloudpulse-app     │
                        │         (Live Web App on Port :3000)  │
                        └───────────────────────────────────────┘
```

---

## 📂 Project Structure

| File | Role in DevOps Pipeline |
| :--- | :--- |
| `server.js` | Dynamic Express backend with CRUD APIs (`/api/tasks`), telemetry (`/api/build-info`), & `/health` check |
| `public/index.html` | Responsive dashboard showing live AWS/Git/Jenkins/Docker metadata & 1-Click Pipeline Trigger |
| `test/app.test.js` | Automated CI test suite verifying `/health` and CRUD APIs during Jenkins build |
| `Dockerfile` | Multi-layer Node.js 20 Alpine image definition with `HEALTHCHECK` & Jenkins build arguments |
| `Jenkinsfile` | 5-Stage Declarative CI/CD Pipeline automating Git pull, testing, Docker build, and deployment |
| `docker-compose.yml` | 1-Command container orchestration file |
| `aws-one-click-setup.sh` | **One-Click AWS EC2 Script** that installs Git, Java 17, Jenkins, and Docker automatically |
| `one-click-start.bat` | **One-Click Windows Launcher** to test and demo the app locally |

---

## ⚡ Quick Start (Local 1-Click Demo)

### Option A: Windows 1-Click Start
Double-click **`one-click-start.bat`** or run in terminal:
```powershell
npm install
npm test
npm start
```
Then open **`http://localhost:3000`** in your browser.

### Option B: Run with Docker Locally
```bash
docker build -t cloudpulse-cicd:latest .
docker run -d -p 3000:3000 --name cloudpulse-app cloudpulse-cicd:latest
```

---

## ☁️ Step-by-Step Deployment on AWS Cloud (For Teacher Demo)

### Step 1: Push Project to Git (GitHub)
```bash
git init
git add .
git commit -m "Initial commit: Automated CI/CD dynamic web app"
git branch -M main
git remote add origin https://github.com/<your-username>/aws-jenkins-docker-cicd.git
git push -u origin main
```

### Step 2: Launch AWS EC2 Instance
1. Log in to **AWS Console** → **EC2** → **Launch Instance**.
2. Choose **Ubuntu Server 22.04 LTS** (Free Tier Eligible `t2.micro` or `t3.micro`).
3. Configure **Security Group Inbound Rules** to allow:
   - **Port `22` (SSH)** — `0.0.0.0/0`
   - **Port `8080` (Jenkins UI)** — `0.0.0.0/0`
   - **Port `3000` (Dynamic Web App)** — `0.0.0.0/0`
4. *(Optional True 1-Click)* Expand **Advanced Details** → paste the contents of `aws-one-click-setup.sh` into **User Data**, OR run it via SSH after connecting:
   ```bash
   chmod +x aws-one-click-setup.sh
   sudo ./aws-one-click-setup.sh
   ```

### Step 3: Configure Jenkins Pipeline (`http://<EC2-PUBLIC-IP>:8080`)
1. Copy the initial password printed by `aws-one-click-setup.sh` (or run `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`).
2. Select **Install suggested plugins**.
3. Click **New Item** → Enter name `cloudpulse-cicd` → Select **Pipeline** → Click **OK**.
4. Under **Build Triggers**, check **GitHub hook trigger for GITScm polling**.
5. Under **Pipeline**:
   - **Definition**: `Pipeline script from SCM`
   - **SCM**: `Git`
   - **Repository URL**: `https://github.com/<your-username>/aws-jenkins-docker-cicd.git`
   - **Branch Specifier**: `*/main`
   - **Script Path**: `Jenkinsfile`
6. Click **Save** and click **Build Now**!

### Step 4: Connect GitHub Webhook (Zero-Touch Automation)
1. Go to your **GitHub Repository** → **Settings** → **Webhooks** → **Add webhook**.
2. **Payload URL**: `http://<EC2-PUBLIC-IP>:8080/github-webhook/`
3. **Content type**: `application/json`
4. Select **Just the push event** → Click **Add webhook**.

Now every `git push` automatically builds a new Docker container via Jenkins and updates `http://<EC2-PUBLIC-IP>:3000`!
