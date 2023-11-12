const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

app.listen(8000, () => {
  console.log('Server listening on port 3000');
});