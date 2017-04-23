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

app.get('/color/:text', (req, res) => {
  var text = req.params.text.replace('%20', ' ');

  console.log(text);

  tone_analyzer.tone({ text: text },
    function(err, tone) {
      if (err){
        console.log(err);
      }else{
        var color = getColor(tone)
        res.send(color);
      }
  });
});

app.get('/test', (req, res) => {
  res.send('api responding');
});

//Auxilliary functions

function getColor(tones) {
  tones = tones.document_tone.tone_categories[0].tones;
  tones = tones.sort((a, b) => {
    return b.score - a.score
  })

  switch(tones[0].tone_name){
    case 'Anger':
      return {
        name: 'Anger',
        color: '#ff2323'
      }
      break
    case 'Disgust':
      return {
        name: 'Disgust',
        color: '#b522ff'
      }
      break
    case 'Fear':
      return {
        name: 'Fear',
        color: '#099b1c'
      }
      break
    case 'Joy':
      return {
        name: 'Joy',
        color: '#ffe628'
      }
      break
    case 'Sadness':
      return {
        name: 'Sadness',
        color: '#2881ff'
      }
      break
  }
}
