// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Halaman utama
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint percobaan
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Endpoint utama: Header Parser
app.get('/api/whoami', function (req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// Listener
const listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
