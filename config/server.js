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

global.foldersArray;
global.foldersArray = Array();
global.formatedDate;
global.formatedDate = '';
global.progressCircleValue;
global.progressCircleValue = 0;
var cCommandInstance = new consoleCommand();

app.post('/index/getProgressValue', (req, res) => {
    res.end(JSON.stringify({
        value: global.progressCircleValue
    }));
});

app.post('/index/clicked', (req, res) => {
    console.clear();
    console.table(global.strConsoleTable);
    global.progressCircleValue = 0;

    var bodyRequest = req.body;
    var json = bodyRequest.strJson;
    var needToClear = bodyRequest.needtoclear;
    
    var date = new Date();
    
    var current_day = date.getDate();
    var current_month = date.getMonth()+1;
    var current_year = date.getFullYear();
    
    var current_hour = date.getHours();
    var current_minute = date.getMinutes();
    var current_second = date.getSeconds();
    global.formatedDate = "("+current_day+"-"+current_month+"-"+current_year+" "+current_hour+"-"+current_minute+"-"+current_second+")";

    var str = '';
    array = new Promise((arrayResolve, arrayReject) => { 
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

        global.foldersArray = str.split(',');
        arrayResolve(global.foldersArray);
    }).then((arrayResolve) => {
        compilation = new Promise((compilationResolve, compilationReject) => { 
            compilation =  compile(0); 
            function compile(indexOfExecution) {
                element = arrayResolve[indexOfExecution];
                index = indexOfExecution;
                compassClean = needToClear ? 'compass clean &&' : '';
                cCommandInstance.execCommand('(pushd '+element+') && '+compassClean+' compass compile && exit : echo executed!', index, element).then((cResponse) => {
                    if(cResponse.currentIndex < global.foldersArray.length-1) {
                        global.progressCircleValue = (((100/(global.foldersArray.length))*(cResponse.currentIndex+1)))/100;
                        // console.log(global.progressCircleValue);
                        compile(cResponse.currentIndex + 1);
                    } else {
                        // console.log(cResponse);
                        global.progressCircleValue = (((100/(global.foldersArray.length))*(cResponse.currentIndex+1)))/100;
                        compilationResolve(cResponse.output);
                    }
                });
            }
        }).then((compilationResponse) => {
            console.log(compilationResponse);
            //save a log file
            fs.writeFile('./logs/error-log'+global.formatedDate+'.txt', compilationResponse, {flag: "w"}, function (err) {
                if (err){
                    console.log(err);
                }
                // console.log("saved!");
                //send to EJS file
                res.status(200);
                res.end({
                    text: compilationResponse
                });
            });
        });
    });
});

module.exports = app;