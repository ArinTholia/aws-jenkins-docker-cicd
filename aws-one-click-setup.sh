#!/bin/bash
# ============================================================================
# aws-one-click-setup.sh — One-Click AWS EC2 Provisioning Script
# Target OS: Ubuntu LTS / 24.04 / 26.04 (AWS Free Tier)
# Installs: 1. Git | 2. Docker | 3. Java & Jenkins CI/CD | 4. Deploys App
# ============================================================================
set -e

echo "============================================================"
echo "☁️ Starting One-Click AWS EC2 DevOps CI/CD Environment Setup"
echo "============================================================"

# Remove any broken Jenkins apt list before first update
sudo rm -f /etc/apt/sources.list.d/jenkins.list

# 1. Update apt packages & install Git + Java (Required by Jenkins)
sudo apt-get update -y
sudo apt-get install -y git curl wget ca-certificates gnupg fontconfig default-jre

echo "✅ [1/4] Git & Java installed:"
git --version
java -version

# 2. Install Docker Engine
echo "🐳 [2/4] Verifying Docker Engine..."
if ! command -v docker >/dev/null 2>&1; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
fi
sudo systemctl enable docker
sudo systemctl start docker

# 3. Install Jenkins LTS (with trusted repository flag for 2026 GPG rotation)
echo "⚙️ [3/4] Installing Jenkins CI/CD Server..."
if ! command -v jenkins >/dev/null 2>&1; then
    echo "deb [trusted=yes] https://pkg.jenkins.io/debian-stable binary/" | sudo tee \
      /etc/apt/sources.list.d/jenkins.list > /dev/null
    sudo apt-get update -y --allow-insecure-repositories
    sudo apt-get install -y --allow-unauthenticated jenkins
fi

# 4. Grant Jenkins & Ubuntu user permission to build/run Docker containers
echo "🔑 [4/4] Configuring Docker permissions for Jenkins..."
sudo usermod -aG docker jenkins
sudo usermod -aG docker ubuntu || true
sudo systemctl enable jenkins
sudo systemctl restart jenkins

# 5. Build and launch initial Docker container from GitHub repository
echo "🚀 Building & starting CloudBite Cafe Docker container on Port 3000..."
cd /home/ubuntu || cd /tmp
rm -rf aws-jenkins-docker-cicd
git clone https://github.com/ArinTholia/aws-jenkins-docker-cicd.git
cd aws-jenkins-docker-cicd
sudo docker stop cloudpulse-app || true
sudo docker rm cloudpulse-app || true
sudo docker build -t cloudpulse-cicd:latest .
sudo docker run -d --name cloudpulse-app --restart unless-stopped -p 3000:3000 cloudpulse-cicd:latest

# Fetch AWS EC2 Public IP
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || hostname -I | awk '{print $1}')

echo ""
echo "============================================================"
echo "🎉 ONE-CLICK AWS EC2 SETUP COMPLETE!"
echo "============================================================"
echo "🍔 Live Cafe Website URL : http://${PUBLIC_IP}:3000"
echo "⚙️ Jenkins Dashboard URL : http://${PUBLIC_IP}:8080"
echo "------------------------------------------------------------"
echo "🔐 Jenkins Initial Admin Password (copy this for Jenkins login):"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword || echo "(Wait 15s and run: sudo cat /var/lib/jenkins/secrets/initialAdminPassword)"
echo "============================================================"
