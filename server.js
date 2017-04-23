const express = require('express');
const app = express();

var PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const pythonShell = require('python-shell');

app.listen(PORT, function () {
  console.log('Server running on port', PORT);
});

app.get('/color', (req, res) => {
  var text = req.body.text;

  res.send('insert color here');
});
