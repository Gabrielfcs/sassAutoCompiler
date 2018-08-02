var app = require('./config/server');

var rotaHome = require('./app/routes/home')(app);

//Já escuta as requisições na porta sem ter que fazer o http.createServer
app.listen(3000, function(){
    console.log('Server On');
});