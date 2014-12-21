var express = require('express');
var path = require('path');

var app = express();

app.use(require('connect-livereload')({port: 35729}));

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	res.render('index');
});


app.get('/users', function(req, res) {

  res.json({name: 'levani'});
});


app.listen(3000, function() {
	console.log("App is listenig on port 3000");
});
