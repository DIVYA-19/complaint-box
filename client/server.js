var path = require('path');
var express = require('express');
var webpack = require('webpack');
var app = express();



app.use(express.static('dist'));
// const static_path = path.join(__dirname, 'public');
// console.log(static_path)
app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
  res.sendFile('index.html')
})

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});