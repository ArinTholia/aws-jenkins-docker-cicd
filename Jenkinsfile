// ============================================================================
// Jenkinsfile — Automated CI/CD Pipeline
// Mandatory Tools: 1. AWS Cloud (EC2) | 2. Git | 3. Jenkins | 4. Docker
// ============================================================================
pipeline {
    agent any

    environment {
        IMAGE_NAME     = "cloudpulse-cicd"
        CONTAINER_NAME = "cloudpulse-app"
        APP_PORT       = "80"
        AWS_REGION     = "us-east-1"
    }

    stages {
        // --------------------------------------------------------------------
        // STAGE 1: Checkout Source Code from Git Repository
        // --------------------------------------------------------------------
        stage('1. Git SCM Checkout') {
            steps {
                echo "🌿 Pulling latest source code from Git repository..."
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD || echo 'latest'",
                        returnStdout: true
                    ).trim()
                }
                echo "✅ Checked out Git Commit: ${env.GIT_COMMIT_SHORT}"
            }
        }

        // --------------------------------------------------------------------
        // STAGE 2: Automated Continuous Integration (CI) Tests
        // --------------------------------------------------------------------
        stage('2. Run Automated Tests') {
            steps {
                echo "🧪 Running automated unit & API tests..."
                sh '''
                    if command -v npm >/dev/null 2>&1; then
                        npm install
                        npm test
                    else
                        echo "Running tests inside isolated Node.js Docker container..."
                        docker run --rm -v "$PWD":/app -w /app node:20-alpine sh -c "npm install && npm test"
                    fi
                '''
            }
        }

        // --------------------------------------------------------------------
        // STAGE 3: Build Docker Image with Live Build & Git Metadata
        // --------------------------------------------------------------------
        stage('3. Build Docker Image') {
            steps {
                echo "🐳 Building Docker Image: ${IMAGE_NAME}:${BUILD_NUMBER}..."
                sh '''
                    docker build \
                        --build-arg BUILD_NUMBER="${BUILD_NUMBER}" \
                        --build-arg GIT_COMMIT="${GIT_COMMIT_SHORT}" \
                        --build-arg GIT_BRANCH="main" \
                        --build-arg CLOUD_PROVIDER="AWS EC2 Cloud" \
                        --build-arg AWS_REGION="${AWS_REGION}" \
                        -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        // --------------------------------------------------------------------
        // STAGE 4: Automated Continuous Deployment (CD) on AWS EC2
        // --------------------------------------------------------------------
        stage('4. Deploy Container on AWS EC2') {
            steps {
                echo "🚀 Deploying new Docker container on AWS EC2 Port 80..."
                sh '''
                    # Stop and remove previous container if running
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    # Run newly built container on Port 80
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p 80:3000 \
                        ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        // --------------------------------------------------------------------
        // STAGE 5: Post-Deployment Live Health Verification
        // --------------------------------------------------------------------
        stage('5. Verify Live Health Check') {
            steps {
                echo "🩺 Verifying application health endpoint on AWS EC2..."
                sh '''
                    sleep 3
                    curl -f http://localhost:80/health || curl -f http://localhost:3000/health
                '''
                echo "✅ CI/CD Pipeline Deployment Successful!"
            }
        }
    }

    post {
        success {
            echo "🎉 SUCCESS: Build #${BUILD_NUMBER} (Commit ${env.GIT_COMMIT_SHORT}) is live on AWS EC2 Port 80!"
        }
        failure {
            echo "❌ FAILURE: Pipeline failed during Build #${BUILD_NUMBER}. Check logs above."
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}
