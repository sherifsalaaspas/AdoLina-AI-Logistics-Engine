const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const adapters = {
  ilschery: require('./src/adapters/ilschery'),
  ilsfollowsUp: require('./src/adapters/ilsfollows-up'),
  ilsdemand: require('./src/adapters/ilsdemand'),
  ilsolution: require('./src/adapters/ilsolution')
};

app.get('/', (req, res) => {
  res.json({
    message: 'AdoLina AI Logistics Engine is running!',
    adapters: Object.values(adapters).map(a => ({ name: a.name, description: a.description }))
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
