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
    console.clear();
    console.table(global.strConsoleTable);

    var bodyRequest = req.body;
    var json = bodyRequest.strJson;
    var needToClear = bodyRequest.needtoclear;

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

    var str = '';
    for(i in json){
        if(typeof json[i] == "object"){
            newArray = json[i];
            for(j in newArray){
                str += str.length > 0 ? ','+newArray[j] : newArray[j];
            }
        } else {
            str += str.length > 0 ? ','+json[i] : json[i];
        }
    }
    
    var array = str.split(',');
    array.forEach(function (element, index) {
        last = index == array.length - 1 ? true : false;
        compassClean = needToClear ? 'compass clean &&' : '';
        consoleRequest = cCommandInstance.execCommand('(pushd '+element+') && '+compassClean+' compass compile && exit : echo executed!', index, element);

        consoleRequest.then((cResponse) => {
            if ((array.length-1) == cResponse.currentIndex) {
                fs.writeFile('./logs/error-log'+formated_date+'.txt', cResponse.error, {flag: "w"}, function (err) {
                    if (err){
                        console.log(err);
                    }
                    // console.log("saved!");
                });
                res.status(200);
                res.end(JSON.stringify({
                    text: cResponse.error
                }));
            }
        });
    });
});

module.exports = app;