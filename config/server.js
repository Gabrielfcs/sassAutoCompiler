var express = require('express');//Requisição do módulo Express 
var app = express();//Executa a função contida no módulo do Express
var bodyParser = require('body-parser')
var consoleCommand = require('../consoleExec')

//Informa para o Express que o EJS será o motor de Views
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use('/css', express.static('css'));
app.use('/images', express.static('images'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/index/clicked', (req, res) => { 
    
    var json = req.body;
    for(i in json) {
        var array = json[i].split(',');

        array.forEach(function (element, index) {
            consoleCommand.execute('pushd '+element+' && compass compile');
        });
    }
});

module.exports = app;