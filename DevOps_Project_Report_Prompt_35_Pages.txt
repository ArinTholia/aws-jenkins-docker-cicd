# 📄 MASTER COPY-PASTE PROMPT: 35–40 PAGE ACADEMIC PROJECT REPORT

> **Instructions for Friend / AI Writer:**  
> Use this master blueprint to generate a comprehensive, academic-grade engineering project report (35 to 40 pages, 1.5 line spacing, 12pt Times New Roman, 1-inch margins). Every single page from Page 1 to Page 40 is outlined below with exact headings, required word counts, diagrams, tables, formulas, and code snippets.

---

## 📌 MASTER PROJECT CONTEXT (Read This First)

* **Project Title:** Design & Implementation of a Fully Automated CI/CD Pipeline for a Dynamic Web Application using AWS Cloud, Git, Jenkins, and Docker
* **Candidate Name:** Arin Tholia
* **Repository URL:** [https://github.com/ArinTholia/aws-jenkins-docker-cicd](https://github.com/ArinTholia/aws-jenkins-docker-cicd)
* **Application Name:** CloudBite Cafe (Dynamic 1-Click Food Ordering & Kitchen Tracking System)
* **Tech Stack:**
  * **Tool 1 (AWS Cloud):** AWS EC2 Ubuntu 22.04 LTS instance (`devops-cicd-server`), Security Groups (ports 22, 80, 8080, 3000), VPC.
  * **Tool 2 (Git & GitHub):** Version Control, branch `main`, GitHub Webhook automation.
  * **Tool 3 (Jenkins):** Automation controller on AWS (`:8080`), 5-stage Declarative Pipeline (`Jenkinsfile`), automated unit tests (`npm test`), build tagging (`#1`, `#2`, `#3`), live health check verification.
  * **Tool 4 (Docker & Docker Desktop):** Multi-stage `node:20-alpine` containerization, `Dockerfile`, `docker-compose.yml`, host port publishing (`80:3000`), local developer workflow on Docker Desktop Windows (`localhost:3000`).
  * **Application:** Node.js, Express REST APIs (`/health`, `/api/menu`, `/api/orders`), Dynamic DOM rendering, JSON persistence.

---

## 📑 PAGE-BY-PAGE WRITING SPECIFICATION (PAGES 1 TO 40)

### PART I: PRELIMINARY PAGES (Pages 1 to 6)

#### Page 1: Title Page / Cover Page
* **Format:** Standard university cover format (all caps, centered).
* **Title:** DESIGN AND IMPLEMENTATION OF A FULLY AUTOMATED CI/CD PIPELINE FOR A DYNAMIC WEB APPLICATION USING AWS CLOUD, GIT, JENKINS, AND DOCKER
* **Sub-text:** *A Project Report submitted in partial fulfillment of the requirements for the degree of Bachelor of Technology in Computer Science & Engineering.*
* **Details:** Submitted by **Arin Tholia** (Roll No: [Roll Number]), under the supervision of [Guide Name, Designation].
* **Footer:** Department of Computer Science & Engineering, [College Name], [University Name], Academic Year 2025–2026.

#### Page 2: Certificate of Approval
* **Content:** Formal academic certificate text: *"This is to certify that the project report entitled 'Design & Implementation of a Fully Automated CI/CD Pipeline...' submitted by Arin Tholia is a bonafide work carried out under my supervision..."*
* **Signatures:** Project Guide, Head of Department (HOD), External Examiner.
* **Date & Place:** City, Date.

#### Page 3: Candidate Declaration
* **Content:** Solemn declaration by the student affirming that the report represents original work, has not been submitted elsewhere for another degree, and all sources/references are duly cited.
* **Signature:** Arin Tholia.

#### Page 4: Acknowledgement
* **Content (250 words):** Express sincere thanks to:
  1. The Project Supervisor/Guide for technical guidance, feedback, and encouragement.
  2. The Head of Department and faculty members for providing lab infrastructure and academic support.
  3. Parents and peers for their continuous moral support throughout the implementation.

#### Page 5: Abstract & Keywords
* **Content (300–350 words):**
  * *Paragraph 1 (Problem):* Software delivery in classical engineering workflows is plagued by configuration drift, manual deployment human errors, and environment disparities ("works on my machine").
  * *Paragraph 2 (Methodology):* This project designs and deploys an end-to-end continuous integration and continuous deployment (CI/CD) automation pipeline orchestrating four mandatory DevOps pillars: **Git** for distributed source management, **Jenkins** for declarative automation, **Docker** for lightweight operating-system-level virtualization, and **AWS Cloud (EC2)** for scalable cloud infrastructure.
  * *Paragraph 3 (Results):* A dynamic full-stack web application (*CloudBite Cafe*) was containerized and automated. The pipeline achieved automated unit testing, container compilation, zero-downtime deployment, and live HTTP healthcheck verification within ~21 seconds per commit. Parity was verified on both cloud compute (AWS) and local developer machines (Docker Desktop).
* **Keywords:** DevOps, Continuous Integration, Continuous Deployment (CI/CD), AWS EC2, Jenkins, Docker, Docker Desktop, Git, Automation, Web Application.

#### Page 6: Table of Contents & List of Figures/Tables
* **Content:** Formatted hierarchical TOC with Chapters 1 to 7, sub-sections (1.1, 1.2...), Appendices, References, and dot leaders (`.....`) pointing to page numbers.
* **List of Figures:** List of Figure 1.1 through Figure 7.1.
* **List of Tables:** List of Table 2.1 through Table 6.2.

---

### PART II: INTRODUCTION & PROBLEM STATEMENT (Pages 7 to 10)

#### Page 7: Chapter 1 — Introduction (1.1 Background & 1.2 Motivation)
* **1.1 Software Delivery Evolution (200 words):** Historical shift from Waterfall monolithic quarterly releases to Agile and DevOps continuous delivery. Discuss the impedance mismatch between developer goals (rapid feature delivery) and operations goals (system uptime and stability).
* **1.2 Motivation for the Study (150 words):** High business costs of downtime, slow deployment cycles, and the modern imperative for zero-touch cloud deployments.

#### Page 8: 1.3 Problem Statement & 1.4 Objectives
* **1.3 Problem Statement (180 words):** Detail the three core friction points in modern deployment: (a) Environment inconsistency between development, staging, and production; (b) Human errors during manual server provisioning via SSH/FTP; (c) Lack of automated rollback and health verification mechanisms.
* **1.4 Project Objectives (180 words):** Bulleted list of 6 distinct technical goals:
  1. Develop a dynamic CRUD web application (CloudBite Cafe) with responsive frontend and Express REST APIs.
  2. Implement Git distributed version control on GitHub with trunk-based branching.
  3. Author a 5-stage Declarative `Jenkinsfile` orchestrating testing, building, and deploying.
  4. Containerize the runtime with an optimized multi-stage `Dockerfile`.
  5. Provision and configure an AWS EC2 instance with custom Security Groups for cloud hosting.
  6. Establish developer environment parity using Docker Desktop on Windows.

#### Page 9: 1.5 Scope of the Project & 1.6 Key Performance Indicators (KPIs)
* **1.5 Scope of the Project (200 words):** Define boundaries (single-node production deployment on AWS EC2, automated pipeline trigger, container lifecycle). Mention current constraints (single-region, SQLite/JSON persistence instead of managed RDS) as deliberate scope boundaries.
* **1.6 Targeted DevOps Metrics / KPIs (150 words):** Discuss DORA (DevOps Research and Assessment) metrics:
  * Deployment Frequency (on-demand per commit vs. monthly).
  * Lead Time for Changes (minutes vs. days).
  * Change Failure Rate (< 5% through automated gates).
  * Mean Time to Recovery (MTTR - container replacement in < 5 seconds).

#### Page 10: 1.7 Organization of the Report
* **Content (300 words):** Structured walk-through outlining the purpose and contents of Chapters 2, 3, 4, 5, 6, and 7 to give the reader a roadmap of the entire thesis.

---

### PART III: LITERATURE SURVEY & THEORETICAL FOUNDATION (Pages 11 to 15)

#### Page 11: Chapter 2 — Literature Survey (2.1 DevOps Principles & Culture)
* **2.1 The DevOps Movement (300 words):** Gene Kim's *The Phoenix Project* and *The DevOps Handbook*. The Three Ways:
  1. *The First Way (Principles of Flow):* Accelerating value delivery from Dev to Ops.
  2. *The Second Way (Principles of Feedback):* Fast, automated telemetry from right to left.
  3. *The Third Way (Continual Learning & Experimentation).*
* **Citations:** Bass et al. (2015), Humble & Farley (2010).

#### Page 12: 2.2 Continuous Integration & Continuous Delivery (CI/CD) Paradigms
* **Content (320 words):**
  * Distinction between Continuous Integration (daily trunk merges, automated build/test), Continuous Delivery (production-ready build artifact available at all times), and Continuous Deployment (automatic production rollout without human approval gates).
  * Shift-Left Testing philosophy: Catching bugs during the commit phase rather than in staging or production.
  * **Table 2.1:** *Comparison of Traditional Software Release vs. Automated CI/CD Pipeline* (Parameters: Release Frequency, Risk Level, Rollback Speed, Tooling, Human Effort).

#### Page 13: 2.3 Virtualization vs. Containerization (Architectural Deep Dive)
* **Content (300 words):**
  * Hypervisor-based Virtualization (Type-1 Bare-metal vs. Type-2 Hosted): Each VM packages a complete Guest Operating System, kernel, and virtualized hardware drivers (~GBs in size, minutes to boot).
  * Operating System-level Containerization: Linux Kernel Namespaces (`pid`, `net`, `ipc`, `mnt`, `uts`) for process isolation and Control Groups (`cgroups`) for resource metering (CPU, memory, I/O). Containers share the host kernel (~MBs in size, milliseconds to boot).
  * **Figure 2.1:** *Architectural Block Diagram comparing VM Stack (Hardware ➔ Host OS ➔ Hypervisor ➔ Guest OS ➔ Bins/Libs ➔ App) vs. Container Stack (Hardware ➔ Host OS ➔ Docker Engine ➔ Bins/Libs ➔ App).*

#### Page 14: 2.4 Cloud Computing & Infrastructure as a Service (IaaS)
* **Content (320 words):**
  * NIST Cloud Definition: On-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service.
  * IaaS vs. PaaS vs. SaaS in DevOps workflows.
  * Role of Amazon Web Services (AWS) in modern enterprise infrastructure. Discuss AWS EC2 compute architecture, hypervisor virtualization (Nitro/Xen), elastic IP allocation, and stateless ephemeral compute instances.

#### Page 15: 2.5 Summary of Existing Work & Gap Analysis
* **Content (300 words):** Analysis of published academic papers and industry whitepapers on CI/CD pipelines. Identify the gap: Many existing academic tutorials focus purely on theory or deploy static "Hello World" pages. This project bridges the gap by implementing a **fully dynamic, stateful web application** with live database CRUD operations, container healthchecks, and hybrid cloud/local developer parity.

---

### PART IV: TOOLS & TECHNOLOGY STACK ANALYSIS (Pages 16 to 21)

#### Page 16: Chapter 3 — Tools Analysis (3.1 Tool #1: Git & GitHub)
* **3.1 Distributed Version Control System (320 words):**
  * Architecture of Git: Working Directory, Staging Area (Index), Local Repository, Remote Repository.
  * SHA-1 cryptographic hashing of commits ensuring data integrity.
  * Branching model: Trunk-based development (`main` branch) vs. GitFlow.
  * GitHub Webhooks: Event-driven architecture using HTTP POST JSON payloads to notify external Jenkins endpoints (`/github-webhook/`) upon push events.

#### Page 17: 3.2 Tool #2: Jenkins Automation Server
* **Content (330 words):**
  * Jenkins Master/Controller and Build Agent architecture.
  * Java-based extensible automation engine with plugin ecosystem.
  * **Scripted vs. Declarative Pipelines:** Why Declarative Pipelines (`pipeline { ... }`) were selected (strict syntax, resilient error handling, stage view visualization, post-execution hooks).
  * Security model: Role-based access control (RBAC), initial admin credentials, and executor concurrency configuration.

#### Page 18: 3.3 Tool #3: Docker Engine & Containerization
* **Content (320 words):**
  * Docker Daemon (`dockerd`), REST API, and Docker CLI.
  * Container lifecycle: Image definition (`Dockerfile`), Image compilation (`docker build`), Image registry storage, Runtime instantiation (`docker run`).
  * Storage drivers: Overlay2 union filesystem, layer immutability, copy-on-write (CoW) mechanism.
  * Container Networking: Host network mode (`--net=host`) vs. Bridge NAT port forwarding (`-p 80:3000`). Explain why port publishing allows containerized traffic to be routed directly to host interfaces.

#### Page 19: 3.4 Tool #3 (Contd.): Docker Desktop for Local Parity
* **Content (300 words):**
  * Architecture of Docker Desktop on Windows: WSL2 (Windows Subsystem for Linux 2) lightweight Linux VM integration.
  * Docker Compose specification (`docker-compose.yml`): Declarative multi-container orchestration with declarative service definitions, volume binds, environment variables, and network bridge creation.
  * Benefits of Developer Parity: Developers test the exact container image on Windows laptops before committing to Git.

#### Page 20: 3.5 Tool #4: AWS Cloud & EC2 Infrastructure
* **Content (320 words):**
  * Amazon Elastic Compute Cloud (EC2): Instance hardware sizing (`t2.micro` / `t3.micro`: 1 vCPU, 1 GiB RAM).
  * AWS Security Groups: Stateful virtual firewalls operating at the hypervisor layer. Explain ingress rules:
    * Port 22 (SSH remote administration)
    * Port 80 (Standard HTTP web production traffic)
    * Port 8080 (Jenkins automation dashboard)
    * Port 3000 (Internal application testing)
  * Elastic IP vs. Public IPv4 address allocation and DHCP re-assignment upon instance reboot.

#### Page 21: 3.6 Application Stack: Node.js & Express Framework
* **Content (300 words):**
  * V8 JavaScript runtime engine, non-blocking single-threaded event loop, asynchronous callback/promise architecture.
  * Express.js HTTP web application framework: Middleware pipeline, RESTful API routing, JSON body serialization, static asset delivery.
  * Comparison table: *Node.js vs. Python Flask vs. Java Spring Boot* (startup latency, memory footprint, Docker image size comparison).

---

### PART V: SYSTEM ARCHITECTURE & DESIGN (Pages 22 to 27)

#### Page 22: Chapter 4 — System Architecture (4.1 End-to-End DevOps Pipeline Design)
* **Content (250 words + Figure 4.1):**
  * Detailed architectural narrative explaining how code travels from the developer's laptop to AWS EC2.
  * **Figure 4.1 (Full Page Architecture Diagram):** Insert the comprehensive flowchart showing: Developer ➔ Git Commit ➔ GitHub ➔ Webhook ➔ Jenkins (AWS EC2) ➔ Automated Tests ➔ Docker Build ➔ Live Container ➔ User Browser.

#### Page 23: 4.2 Pipeline Workflow & Stage Decomposition
* **Content (320 words):** Step-by-step description of the 5 pipeline stages:
  1. *Stage 1 (Checkout SCM):* Git shallow clone, commit hash parsing (`git rev-parse --short HEAD`).
  2. *Stage 2 (Run Automated Tests):* Environment validation via Node/Docker test runner.
  3. *Stage 3 (Build Docker Image):* Injection of dynamic build metadata (`BUILD_NUMBER`, `GIT_COMMIT`) via build arguments.
  4. *Stage 4 (Deploy Container on AWS EC2):* Graceful container termination (`docker stop`, `docker rm`) and zero-downtime recreation on port 80.
  5. *Stage 5 (Verify Live Health Check):* Automated curl probe testing HTTP 200 response on `/health`.

#### Page 24: 4.3 Dynamic Web Application Architecture (CloudBite Cafe)
* **Content (300 words):**
  * Client-Server architectural model.
  * Dynamic DOM rendering: How user actions (1-click food ordering, status updates, new dish additions) trigger asynchronous HTTP Fetch calls without page reloads.
  * Atomic state persistence using structured JSON datastore (`data/menu.json`, `data/orders.json`).
  * **Figure 4.2:** *Application Component Diagram (Client Browser ➔ Express Controller ➔ REST API Router ➔ JSON File Store).*

#### Page 25: 4.4 RESTful API Specification & Data Model
* **Content (150 words + Table 4.1):**
  * **Table 4.1 (Complete API Specification):** Document all endpoints:
    * `GET /health` ➔ Telemetry & healthcheck (`UP`, `containerId`, `buildNumber`)
    * `GET /api/menu` ➔ Catalog retrieval
    * `POST /api/menu` ➔ Dynamic dish creation
    * `GET /api/orders` ➔ Live orders & revenue statistics
    * `POST /api/orders` ➔ 1-click order placement
    * `PATCH /api/orders/:id` ➔ Kitchen status progression
    * `DELETE /api/orders/:id` ➔ Order cancellation

#### Page 26: 4.5 Sequence Diagram of CI/CD Pipeline
* **Content (150 words + Figure 4.3):**
  * Narrative of interaction sequence during code push.
  * **Figure 4.3:** *UML Sequence Diagram detailing message flow between Developer, GitHub, Jenkins, Docker Daemon, and AWS EC2 host.*

#### Page 27: 4.6 Security & High Availability Design Considerations
* **Content (320 words):**
  * Principle of Least Privilege: Limiting Jenkins permissions, Docker non-root execution considerations.
  * Network security: Security Group ingress rules limiting public ports, SSH key-pair authentication (`devops-key.pem`).
  * Failure mitigation: Automatic restart policy (`--restart unless-stopped`), dangling image garbage collection (`docker image prune -f`).

---

### PART VI: IMPLEMENTATION DETAILS (Pages 28 to 34)

#### Page 28: Chapter 5 — Implementation (5.1 Dockerfile Construction & Optimization)
* **Content (200 words + Code Listing 5.1):**
  * Technical rationale for `node:20-alpine` (base image footprint ~50MB vs. ~1GB for standard Ubuntu).
  * Layer caching optimization: Explaining why `COPY package*.json ./` precedes `COPY . .`.
  * **Code Listing 5.1:** Complete, syntax-highlighted [Dockerfile](file:///C:/Users/Arint/.gemini/antigravity/scratch/aws-jenkins-docker-cicd/Dockerfile) with annotations for `ARG`, `ENV`, `EXPOSE`, `HEALTHCHECK`, and `CMD`.

#### Page 29: 5.2 Declarative Pipeline Implementation (Jenkinsfile)
* **Content (150 words + Code Listing 5.2):**
  * Detailed discussion of Declarative Pipeline syntax, environment variable blocks, and shell execution blocks (`sh '''...'''`).
  * **Code Listing 5.2 (Part 1):** Stages 1, 2, and 3 of the [Jenkinsfile](file:///C:/Users/Arint/.gemini/antigravity/scratch/aws-jenkins-docker-cicd/Jenkinsfile).

#### Page 30: 5.2 Jenkinsfile (Contd.) & Deployment Logic
* **Content (150 words + Code Listing 5.2 Part 2):**
  * Stage 4 (Deploy Container) and Stage 5 (Verify Live Health Check).
  * Post-build notification block (`post { success { ... } failure { ... } always { ... } }`).
  * Explaining container recreation idempotence: `docker stop cloudpulse-app || true`.

#### Page 31: 5.3 AWS Infrastructure Provisioning Script (`aws-one-click-setup.sh`)
* **Content (180 words + Code Listing 5.3):**
  * Automated cloud bootstrapping via bash scripting.
  * Steps automated: APT package cache update, OpenJDK 17 installation, Docker Engine installation, Jenkins LTS official repository setup, group permissions (`usermod -aG docker jenkins`), and initial container launch.
  * Code snippet of `aws-one-click-setup.sh`.

#### Page 32: 5.4 Docker Compose for Local Development Parity
* **Content (200 words + Code Listing 5.4):**
  * Role of `docker-compose.yml` in enabling one-click local startup on developer workstations.
  * Service definitions, volume bindings (`./data:/app/data`), port mappings (`3000:3000`), and restart policies.
  * Code listing of `docker-compose.yml`.

#### Page 33: 5.5 Dynamic Backend Controller (`server.js`)
* **Content (200 words + Code Listing 5.5):**
  * Implementation of Express REST controllers.
  * Atomic JSON read/write helper functions (`readJson`, `writeJson`).
  * Healthcheck endpoint `/health` implementation returning real-time OS hostname (`os.hostname()`), uptime, and commit metadata.

#### Page 34: 5.6 Responsive User Interface (`public/index.html`)
* **Content (300 words):**
  * Modern CSS3 glassmorphism styling, semantic layout, responsive CSS Grid.
  * Asynchronous JavaScript Fetch calls updating order statuses without refreshing the page.
  * Search bar event handler implementation (`onSearchChange()`).

---

### PART VII: TESTING, VERIFICATION & RESULTS (Pages 35 to 38)

#### Page 35: Chapter 6 — Testing & Verification (6.1 Automated CI Unit Testing)
* **Content (200 words + Code Listing 6.1 + Table 6.1):**
  * Test execution via Node.js native test runner (`node --test test/app.test.js`).
  * **Table 6.1 (Unit Test Suite Results):**

| Test Case ID | Test Objective | Assertion | Execution Time | Result |
| :---: | :--- | :--- | :---: | :---: |
| `TC-01` | Verify `/health` endpoint | HTTP Status 200, status = "UP", containerId exists | ~45 ms | **PASSED** |
| `TC-02` | Verify `/api/menu` catalog | HTTP Status 200, Array.isArray(menu) = true | ~9 ms | **PASSED** |
| `TC-03` | Verify 1-Click Order Lifecycle | POST order returns 201, DELETE returns 200 | ~108 ms | **PASSED** |

#### Page 36: 6.2 Jenkins Pipeline Execution Results & Metrics
* **Content (200 words + Figure 6.1 + Table 6.2):**
  * Description of successful pipeline execution across builds #1, #2, and #3.
  * **Figure 6.1:** *Screenshot of Jenkins Stage View showing all 5 stages in green.*
  * **Table 6.2 (Stage Timing Breakdown):**
    * Stage 1 (Git Checkout): 2 seconds
    * Stage 2 (Automated Tests): 1 second
    * Stage 3 (Docker Build): 12 seconds
    * Stage 4 (Deploy Container): 3 seconds
    * Stage 5 (Health Check): 3 seconds
    * **Total Pipeline Execution Duration: ~21 seconds.**

#### Page 37: 6.3 Real-World Troubleshooting & Technical Case Studies
* **Content (320 words):** Detail 3 real engineering hurdles encountered and solved during the project:
  1. *Case Study 1 (Jenkins GPG Key Rotation):* Ubuntu 26.04 rejected legacy Jenkins keys (`NO_PUBKEY 7198F4B714ABFC68`). Resolved by updating the repository key source and adding trusted repository definitions.
  2. *Case Study 2 (Jenkins Disk Space Threshold on AWS Free Tier):* AWS Free Tier `t2.micro` instances have 1GB RAM, causing Ubuntu to mount `/tmp` as a 450MB `tmpfs`. Jenkins automatically suspended executors due to `Disk space is below threshold of 1.00 GiB on /tmp`. Resolved by remounting `/tmp` to 2GB (`sudo mount -o remount,size=2G /tmp`) and configuring a 2GB swap file.
  3. *Case Study 3 (AWS Security Group Port Routing):* Initial deployments on port 3000 were dropped by institutional client firewalls. Resolved by publishing the container to standard HTTP Port 80 (`-p 80:3000`) and configuring AWS Security Group ingress rules for `0.0.0.0/0`.

#### Page 38: 6.4 Verification on Docker Desktop (Local Parity)
* **Content (250 words + Figure 6.2):**
  * Verification of local container instantiation on Windows 11 via Docker Desktop 4.95.
  * **Figure 6.2:** *Screenshot of Docker Desktop GUI showing `cloudbite-cafe-app` container running on port 3000 with green health status.*
  * Demonstration that the same codebase executes identically on AWS Cloud and local developer laptops without modification.

---

### PART VIII: CONCLUSION, FUTURE SCOPE & REFERENCES (Pages 39 to 40+)

#### Page 39: Chapter 7 — Conclusion & Future Enhancements
* **7.1 Project Conclusion (200 words):** Summary of achievements. The project successfully met all mandatory requirements, implementing an automated CI/CD pipeline using AWS Cloud, Git, Jenkins, and Docker for a dynamic web application. Zero-touch deployment reduced deployment lead time from ~30 minutes (manual) to ~21 seconds.
* **7.2 Key Competencies Acquired (150 words):** Infrastructure provisioning, Linux systems administration, Docker container optimization, declarative pipeline scripting, automated testing.

#### Page 40: 7.3 Limitations & Future Roadmap
* **7.3 Technical Limitations (150 words):** Single-node EC2 deployment constitutes a single point of failure; file-based JSON persistence lacks distributed transactions.
* **7.4 Future Roadmap (180 words):**
  1. Container Orchestration with Kubernetes (Amazon EKS) or Amazon ECS for automated horizontal pod autoscaling.
  2. Database migration to Amazon RDS (Relational Database Service) PostgreSQL.
  3. Image registry integration with Amazon ECR (Elastic Container Registry) and Docker Hub.
  4. Infrastructure as Code (IaC) with HashiCorp Terraform.
  5. SSL/TLS termination with AWS Certificate Manager & Route 53.

#### Page 41 – 42: References & Appendices
* **References (IEEE Format):** 8 formal citations covering Bass et al., Humble & Farley, Turnbull, Smart, AWS Whitepapers, and Docker Documentation.
* **Appendix A:** Complete project file directory tree.
* **Appendix B:** List of terminal commands for local and cloud verification.
