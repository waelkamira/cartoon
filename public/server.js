const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use('/proxy', (req, res) => {
  const url = req.query.url; // Get the URL from query parameters
  if (!url) {
    return res.status(400).send('No URL provided');
  }
  request(
    { url, method: req.method, json: true, headers: req.headers },
    (error, response, body) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.set(response.headers);
      res.status(response.statusCode).send(body);
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`CORS Proxy running at http://localhost:${PORT}/proxy`);
});
