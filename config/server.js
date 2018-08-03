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
            // consoleCommand.execute('echo executing on: '+element);
            consoleCommand.execute('(echo execute: '+element+') && (pushd '+element+') && compass compile && echo passed!: '+element+')');
            // consoleCommand.execute('start cmd.exe /K "((pushd '+element+') && compass clean && compass compile && exit 0 ) || exit 1 "');
            // consoleCommand.execute('pushd '+element+' && compass compile');

            //(pushd D:\htdocs\sprint-extremeuv\web-extreme-uv) && ( compass clean && compass compile && exit ) ||  
        });
    }
});

module.exports = app;