var express = require('express');
var bodyParser = require('body-parser');
var monk = require('monk');

var app = express();
var port = 3000;
var db = monk('localhost/gameslocker');
var games = db.get('games');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// var store = [];

app.get('/api/games', function(req, res, next){
  games.find({})
  .then(function(games){
    res.json(games);
  })
  .catch(function(err){
    res.json(err);
  })
})

app.post('/api/games', function(req, res, next){
  games.insert(req.body)
  .then(function(game){
    res.json(game);
  })
  .catch(function(err){
    res.json(err);
  })
});

app.listen(port, function(){
  console.log('api listening on port ' + port);
})
