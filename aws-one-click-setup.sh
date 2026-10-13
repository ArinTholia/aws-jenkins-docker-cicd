#!/bin/bash
# ============================================================================
# aws-one-click-setup.sh — One-Click AWS EC2 Provisioning Script
# Target OS: Ubuntu 22.04 LTS / 24.04 LTS (AWS Free Tier t2.micro / t3.micro)
# Installs: 1. Git | 2. Node.js | 3. Docker | 4. Java 17 & Jenkins CI/CD
# ============================================================================
set -e

echo "============================================================"
echo "☁️ Starting One-Click AWS EC2 DevOps CI/CD Environment Setup"
echo "============================================================"

# 1. Update apt packages & install Git + curl
sudo apt-get update -y
sudo apt-get install -y git curl wget ca-certificates gnupg lsb-release fontconfig openjdk-17-jre

echo "✅ [1/4] Git & OpenJDK 17 installed:"
git --version
java -version

# 2. Install Docker Engine
echo "🐳 [2/4] Installing Docker Engine..."
if ! command -v docker >/dev/null 2>&1; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
fi
sudo systemctl enable docker
sudo systemctl start docker

# 3. Install Jenkins LTS
echo "⚙️ [3/4] Installing Jenkins CI/CD Server..."
if ! command -v jenkins >/dev/null 2>&1; then
    sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
      https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
    echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
      https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
      /etc/apt/sources.list.d/jenkins.list > /dev/null
    sudo apt-get update -y
    sudo apt-get install -y jenkins
fi

# 4. Grant Jenkins & Ubuntu user permission to build/run Docker containers
echo "🔑 [4/4] Configuring Docker permissions for Jenkins..."
sudo usermod -aG docker jenkins
sudo usermod -aG docker ubuntu || true
sudo systemctl enable jenkins
sudo systemctl restart jenkins

# Fetch AWS EC2 Public IP
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || hostname -I | awk '{print $1}')

echo ""
echo "============================================================"
echo "🎉 ONE-CLICK AWS EC2 SETUP COMPLETE!"
echo "============================================================"
echo "🔗 Jenkins Dashboard URL : http://${PUBLIC_IP}:8080"
echo "🔗 Dynamic Web App URL   : http://${PUBLIC_IP}:3000"
echo "------------------------------------------------------------"
echo "🔐 Jenkins Initial Admin Password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword || echo "(Wait 15s for Jenkins to initialize)"
echo "============================================================"
