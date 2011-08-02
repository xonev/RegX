
/**
 * Module dependencies.
 */

var express = require('express')
, app = module.exports = express.createServer()
, io = require('socket.io')
, regexServer = require('./regex_server');

regexServer.startServer(io.listen(app));
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
      title: 'RegX',
      matches: [{ groups: ["group1.1", "group1.2"] },
		{ groups: ["group2.1", "group2.2", "group2.3"] },
		{ groups: ["group3.1"] }]
  });
});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
