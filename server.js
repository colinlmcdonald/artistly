var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {

})

app.listen(3000, function() {
  console.log('Listening in on port 3000');
})