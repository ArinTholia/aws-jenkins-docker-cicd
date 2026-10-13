const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_START_TIME = new Date().toISOString();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Data file paths for dynamic persistence
const DATA_DIR = path.join(__dirname, 'data');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');
const DEPLOYMENTS_FILE = path.join(DATA_DIR, 'deployments.json');

// Ensure data directory & initial seed data exist
function initDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(TASKS_FILE)) {
    const initialTasks = [
      {
        id: 'task-101',
        title: 'Configure GitHub Webhook for Automated Trigger',
        category: 'Git & SCM',
        priority: 'High',
        status: 'Completed',
        assignee: 'DevOps Engineer',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'task-102',
        title: 'Create Declarative Jenkinsfile Pipeline Stages',
        category: 'Jenkins CI/CD',
        priority: 'High',
        status: 'Completed',
        assignee: 'Pipeline Lead',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'task-103',
        title: 'Containerize Node.js App with Multi-Stage Dockerfile',
        category: 'Docker',
        priority: 'High',
        status: 'Completed',
        assignee: 'Container Specialist',
        createdAt: new Date(Date.now() - 43200000).toISOString()
      },
      {
        id: 'task-104',
        title: 'Provision AWS EC2 Instance & Security Group Ports (22, 8080, 3000)',
        category: 'AWS Cloud',
        priority: 'High',
        status: 'In Progress',
        assignee: 'Cloud Architect',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'task-105',
        title: 'Verify Zero-Downtime Container Replacement on Git Push',
        category: 'AWS Cloud',
        priority: 'Medium',
        status: 'Pending',
        assignee: 'QA Automation',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(TASKS_FILE, JSON.stringify(initialTasks, null, 2));
  }

  if (!fs.existsSync(DEPLOYMENTS_FILE)) {
    const initialDeployments = [
      {
        id: 'dep-1',
        buildNumber: process.env.BUILD_NUMBER || '1',
        commitHash: (process.env.GIT_COMMIT || '7f3a9c1').substring(0, 7),
        branch: process.env.GIT_BRANCH || 'main',
        containerId: os.hostname().substring(0, 12),
        environment: 'AWS EC2 Production',
        status: 'SUCCESS',
        duration: '18.4s',
        triggeredBy: 'Git Push Webhook -> Jenkins',
        timestamp: SERVER_START_TIME
      }
    ];
    fs.writeFileSync(DEPLOYMENTS_FILE, JSON.stringify(initialDeployments, null, 2));
  }
}

initDataStore();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ============================================================================
// 1. HEALTH CHECK ENDPOINT (Used by Jenkins Pipeline & Docker HEALTHCHECK)
// ============================================================================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'cloudpulse-devops-cicd',
    buildNumber: process.env.BUILD_NUMBER || 'local-dev',
    gitCommit: (process.env.GIT_COMMIT || 'local').substring(0, 7),
    containerId: os.hostname(),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// ============================================================================
// 2. LIVE CI/CD BUILD & ENVIRONMENT TELEMETRY API
// ============================================================================
app.get('/api/build-info', (req, res) => {
  res.json({
    appName: 'CloudPulse CI/CD',
    version: '1.0.0',
    buildNumber: process.env.BUILD_NUMBER || 'Local-Dev (#1)',
    gitCommit: (process.env.GIT_COMMIT || '7f3a9c1').substring(0, 7),
    gitBranch: process.env.GIT_BRANCH || 'main',
    containerId: os.hostname().substring(0, 12),
    platform: `${os.type()} ${os.arch()}`,
    cloudProvider: process.env.CLOUD_PROVIDER || 'AWS EC2 Cloud',
    awsRegion: process.env.AWS_REGION || 'us-east-1 / ap-south-1',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    deployedAt: SERVER_START_TIME,
    tools: ['AWS Cloud (EC2)', 'Git & GitHub', 'Jenkins CI/CD', 'Docker Engine']
  });
});

// ============================================================================
// 3. DYNAMIC TASKS CRUD API
// ============================================================================
app.get('/api/tasks', (req, res) => {
  const tasks = readJson(TASKS_FILE);
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    highPriority: tasks.filter(t => t.priority === 'High').length
  };
  res.json({ tasks, stats });
});

app.post('/api/tasks', (req, res) => {
  const { title, category, priority, assignee, status } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const tasks = readJson(TASKS_FILE);
  const newTask = {
    id: `task-${Date.now()}`,
    title: title.trim(),
    category: category || 'AWS Cloud',
    priority: priority || 'Medium',
    status: status || 'Pending',
    assignee: assignee && assignee.trim() ? assignee.trim() : 'Student Dev',
    createdAt: new Date().toISOString()
  };

  tasks.unshift(newTask);
  writeJson(TASKS_FILE, tasks);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readJson(TASKS_FILE);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
    id: tasks[index].id
  };

  writeJson(TASKS_FILE, tasks);
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readJson(TASKS_FILE);
  const filtered = tasks.filter(t => t.id !== id);

  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }

  writeJson(TASKS_FILE, filtered);
  res.json({ deleted: true, id });
});

// ============================================================================
// 4. ONE-CLICK PIPELINE DEPLOYMENT SIMULATOR & HISTORY API
// ============================================================================
app.get('/api/deployments', (req, res) => {
  const deployments = readJson(DEPLOYMENTS_FILE);
  res.json(deployments);
});

app.post('/api/simulate-deploy', (req, res) => {
  const deployments = readJson(DEPLOYMENTS_FILE);
  const nextBuildNum = deployments.length + 1;
  const randomHash = Math.random().toString(16).substring(2, 9);
  const randomContainer = Math.random().toString(16).substring(2, 14);

  const newDeployment = {
    id: `dep-${Date.now()}`,
    buildNumber: `${nextBuildNum}`,
    commitHash: req.body.commitHash || randomHash,
    branch: req.body.branch || 'main',
    containerId: randomContainer,
    environment: 'AWS EC2 (Docker Container)',
    status: 'SUCCESS',
    duration: `${(14 + Math.random() * 8).toFixed(1)}s`,
    triggeredBy: req.body.triggeredBy || '1-Click Web Pipeline Trigger',
    timestamp: new Date().toISOString()
  };

  deployments.unshift(newDeployment);
  writeJson(DEPLOYMENTS_FILE, deployments.slice(0, 15));
  res.status(201).json(newDeployment);
});

// Start server only if run directly (allows importing app in automated unit tests)
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================================`);
    console.log(`🚀 CloudPulse CI/CD Dynamic App running on port ${PORT}`);
    console.log(`📦 Container ID : ${os.hostname()}`);
    console.log(`🔨 Jenkins Build: ${process.env.BUILD_NUMBER || 'Local-Dev'}`);
    console.log(`🌿 Git Commit   : ${process.env.GIT_COMMIT || 'Local-Commit'}`);
    console.log(`🔗 URL          : http://localhost:${PORT}`);
    console.log(`========================================================`);
  });
}

module.exports = app;
