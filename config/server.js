var express = require('express');//Requisição do módulo Express 
var app = express();//Executa a função contida no módulo do Express
var bodyParser = require('body-parser');
var consoleCommand = require('../consoleExec');
var fs = require('fs');

//Informa para o Express que o EJS será o motor de Views
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/index/clicked', (req, res) => {
    var json = req.body;
    global.strError = '';
    var cCommandInstance = new consoleCommand();

    var date = new Date();
    
    var current_day = date.getDate();
    var current_month = date.getMonth();
    var current_year = date.getFullYear();
    
    var current_hour = date.getHours();
    var current_minute = date.getMinutes();
    var current_second = date.getSeconds();
    var formated_date = "("+current_day+"-"+current_month+"-"+current_year+" "+current_hour+"-"+current_minute+"-"+current_second+")";
    
    for(i in json) {
        var array = json[i].split(',');
        array.forEach(function (element, index) {
            cCommandInstance.execCommand('(echo execute: '+element+') && (pushd '+element+') && compass compile && echo passed!: '+element+')', function(returnedValue){
                last = index == array.length - 1 ? true : false; 
                if (last) {
                    console.log("allerrors: "+returnedValue);
                    fs.writeFile('./logs/error-log'+formated_date+'.txt', returnedValue, {flag: "w"}, function (err) {
                        if (err){
                            console.log(err);
                        }
                        // console.log("It's saved!");
                    });
                    res.status(200);
                    res.end(JSON.stringify({
                        text: returnedValue
                    }));
                }
            });
            // consoleCommand.execute('start cmd.exe /K "((pushd '+element+') && compass clean && compass compile && exit 0 ) || exit 1 "');
            // consoleCommand.execute('pushd '+element+' && compass compile');
            
            //(pushd D:\htdocs\sprint-extremeuv\web-extreme-uv) && ( compass clean && compass compile && exit ) ||  
        });
    }
});

module.exports = app;