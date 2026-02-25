const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Adapters
const adapters = {
  ilschery: require('./src/adapters/ilschery'),
  ilsfollowsUp: require('./src/adapters/ilsfollows-up'),
  ilsdemand: require('./src/adapters/ilsdemand'),
  ilsolution: require('./src/adapters/ilsolution')
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'AdoLina AI Logistics Engine is running!',
    version: '1.0.0',
    adapters: Object.values(adapters).map(a => ({ name: a.name, description: a.description }))
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

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
