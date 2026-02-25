const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Database
const db = require('./src/database');

// Middleware
app.use(express.json());

// Adapters
const adapters = {
  ilschery: require('./src/adapters/ilschery'),
  ilsfollowsUp: require('./src/adapters/ilsfollows-up'),
  ilsdemand: require('./src/adapters/ilsdemand'),
  ilsolution: require('./src/adapters/ilsolution')
};

// API Routes
app.get('/api/status', (req, res) => {
  res.json({
    message: 'AdoLina AI Logistics Engine is running!',
    version: '1.0.0',
    adapters: Object.values(adapters).map(a => ({ name: a.name, description: a.description }))
  });
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = await db.addTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Deprecated root API - handles both HTML and JSON
app.get('/', (req, res) => {
  res.format({
    html: () => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    },
    json: () => {
      res.json({
        message: 'AdoLina AI Logistics Engine is running!',
        version: '1.0.0',
        adapters: Object.values(adapters).map(a => ({ name: a.name, description: a.description })),
        database: db.isConnected() ? 'Connected' : 'Disconnected'
      });
    },
    default: () => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    database: db.isConnected() ? 'UP' : 'DOWN'
  });
});

// Serve static files AFTER root route to avoid shadowing
app.use(express.static(path.join(__dirname, 'public')));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
