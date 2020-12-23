const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world from express');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
