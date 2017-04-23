const express = require('express');
const app = express();

var PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// const PythonShell = require('python-shell');
// var watsonShell = new PythonShell('watson.py');

var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '587531d3-83dc-484e-8c68-81ce41b135e6',
  password: 'sTzXe52DxZHK',
  version: 'v3',
  version_date: '2016-05-19'
});


app.listen(PORT, function () {
  console.log('Server running on port', PORT);
});

app.get('/color', (req, res) => {
  var text = req.body.text;

  tone_analyzer.tone({ text: 'I am super mad' },
    function(err, tone) {
      if (err)
        console.log(err);
      else
        res.send(JSON.stringify(tone, null, 2));
  });
});

app.get('/test', (req, res) => {
  res.send('api responding');
});
