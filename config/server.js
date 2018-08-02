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
        // consoleCommand.execute('pushd '+json[i]);
        // consoleCommand.execute('pushd '+json[i]+' && echo %cd%');

        consoleCommand.execute('pushd '+json[i]+' && compass compile');

        // strcommand = 'pushd '+json[i];
    }
    

    // console.log(id);

    // console.log("WORKIIIIING BIIIIIIIRL!!!"+req);
    // console.log("WORKIIIIING BIIIIIIIRL!!!"+id);

    // res.send('working');
});

module.exports = app;