const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

var sass = require('node-sass');

const cTable = require('console.table');

const buildWebTable = require('./../../table');
const color = require('./../../colors');
const arrayFilter = require('./../../arrayFilter');

const directory = "D:/htdocs";
var webTable = [];
var trlines = '';
var consoleTable = [];
var str_table = '';
var aAllWebFolders = [];
var folderCarac =  [];
var folderPath =  [];
var folderName =  [];

global.strConsoleTable;
global.strConsoleTable = '';
global.myArr;
global.myArr = [];


module.exports = function(app){
    app.get('/', function(req, res){
        fs.readdir( directory, function( err, files ) {
            if( err ) {
                console.error( "Could not list the directory.", err );
                process.exit( 1 );
            } 
            if(files.indexOf('sprint') > -1){
                files.splice(files.indexOf('sprint'),1);
            }
            
            if(files.indexOf('trunk') > -1){
                files.splice(files.indexOf('trunk'),1);
            }
            files.forEach( function(folder, index) {
                //gets the entire path
                var fullpath = path.join( directory, folder );
                
                //iterates all folders initiated by "web"
                fs.readdir(fullpath, function( err, webFiles ) {
                    if(err){
                        console.log(err);
                        res.status(400);
                        res.end('Try Again later!');
                        // return;
                    }
                    aWebFolders = [];
                    folderPath = [];
                    folderName = [];
                    webFiles.forEach( function(webfolder, webFolderIndex) {
                        var fullpathinnerfiles = path.join(fullpath, webfolder );
                        fs.readdir( fullpathinnerfiles, function( err, innerFiles ) {
                            if(typeof innerFiles == 'object'){
                                if(innerFiles.indexOf('config.rb') > -1){
                                    global.myArr.push(webfolder);
                                }
                            }
                        });
                        //gets the entire path of web folder
                        var fullpathweb = path.join( fullpath, webfolder );         
                        if(webfolder.indexOf('web-') > -1 && global.myArr.indexOf(`${webfolder}`) > -1){
                            // console.log(global.myArr.indexOf(`${webfolder}`) > -1);
                            if(fullpathweb != null){
                                // console.log(index+'-t: '+fullpathweb);
                                folderPath.push(fullpathweb);
                            }
                            if(webfolder != null){
                                folderName.push(webfolder);
                            }
                        }

                    });
                    arrayFilter.clean(folderPath,undefined);
                    arrayFilter.clean(folderName,undefined);
                    folderCarac[0] = folderName;
                    folderCarac[1] = folderPath;

                    if(folderCarac != null && folderCarac != undefined){
                        aAllWebFolders[index] = folderCarac;
                    }
                    
                    //adds the correct values to the table of page
                    webTable[index] = {
                        indice: index,
                        arquivo: folder,
                        diretorio: fullpath,
                        webfoldername: aAllWebFolders[index][0],
                        webfolderpath: aAllWebFolders[index][1]
                    };
                    
                    //Creates the table to show on console
                    consoleTable[index] = {
                        'indice': color.colorize(index+": ", color.GREEN),
                        'arquivo': color.colorize(folder, color.YELLOW),
                        'diretorio': color.colorize(" ("+fullpath+")", color.MAGENTA),
                        'webFolders': color.colorize(" ("+aAllWebFolders[index][0]+")", color.CYAN)
                        // 'webFolders': color.colorize(" ("+aAllWebFolders[index][1]+")", color.CYAN) //gets all of web folders path
                    };
                });
            } );

            global.strConsoleTable = consoleTable;
            
            //Clears the console
            console.clear();
            //Shows the title of the table on console
            console.log("\nList of files:\n");
            //Shows the table on console
            console.table(consoleTable);
        } );

        //Creates the lines of the table
        trlines = '';
        if (webTable && webTable.length > 0) {
            for (let i = 0; i < webTable.length; i++) {
                if(webTable[i] != 'undefined' && webTable[i] != null){
                    trlines +=  buildWebTable.getTr(
                                    buildWebTable.getTd(`<input type="checkbox" name="${i}" value="${webTable[i].webfolderpath}">`, `class="col-1"`)+
                                    buildWebTable.getTd(`${webTable[i].indice}`, `class="col-1"`)+
                                    buildWebTable.getTd(`${webTable[i].arquivo}`, `class="col-3"`)+
                                    buildWebTable.getTd(`${webTable[i].diretorio}`, `class="col-3"`)+
                                    buildWebTable.getTd(`${webTable[i].webfoldername}`, `class="col-3"`)
                                );            
                }
            }
        }

        //sets the table variable
        str_table = buildWebTable.getTable(
            //Creates the header of the table
            buildWebTable.getTHead(
                buildWebTable.getTr(
                    buildWebTable.getTh(`<input id="checkAll" type="checkbox" name="checkall" value="checkall">`)+
                    buildWebTable.getTh('Indice')+
                    buildWebTable.getTh('Nome do arquivo')+
                    buildWebTable.getTh('Diretório')+
                    buildWebTable.getTh('Web Folders')
                )
            )+
            //adds the previously created body
            buildWebTable.getTBody(trlines)
        );

        //sets the variable of the table to another variable to fix the content
        console.log(trlines);
        pre_save = str_table;
        //defines the encoding
        res.charset = 'UTF-8';
        //send data to EJS (View)
        res.render('home/index', { table: pre_save });
    });
};