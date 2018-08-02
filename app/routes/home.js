const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

var sass = require('node-sass');

const cTable = require('console.table');

const webTable = require('./../../table');
const color = require('./../../colors');

const directory = "D:/htdocs";
var tabela = Array([]);
var trlines = '';

module.exports = function(app){
    app.get('/', function(req, res){

        var table = [];
        var consoleTable = [];
        var str_table = '';
        
        fs.readdir( directory, function( err, files ) {
            if( err ) {
                console.error( "Could not list the directory.", err );
                process.exit( 1 );
            } 
            
            files.forEach( function(file, index) {
                //gets the entire directory
                var fullpath = path.join( directory, file );            
                
                //adds spaces to the index
                showIndex = index < 10 ? " "+ index : index;
                showIndex = " "+showIndex;

                //adds the correct values to the table of page
                tabela[index] = {
                    indice: showIndex,
                    arquivo: file,
                    diretorio: fullpath
                };

                //Creates the table to show on console
                consoleTable[index] = {
                    'indice': color.colorize(showIndex+": ", color.GREEN),
                    'arquivo': color.colorize(file, color.YELLOW),
                    'diretorio': color.colorize(" ("+fullpath+")", color.MAGENTA)
                };
            } );
            
            //Clears the console
            console.clear();
            //Shows the title of the table on console
            console.log("\n\nList of files:\n");
            //Shows the table on console
            console.table(consoleTable);
        } );

        //Creates the lines of the table
        trlines = '';
        for (let i = 0; i < tabela.length; i++) {
            trlines +=  webTable.getTr(
                            webTable.getTd(`<input type="checkbox" name="${i}" value="${tabela[i].diretorio}">`, `class="col-1"`)+
                            webTable.getTd(`${tabela[i].indice}`, `class="col-1"`)+
                            webTable.getTd(`${tabela[i].arquivo}`, `class="col-5"`)+
                            webTable.getTd(`${tabela[i].diretorio}`, `class="col-5"`)
                        );            
        }

        //sets the table variable
        str_table = webTable.getTable(
            //Creates the header of the table
            webTable.getTHead(
                webTable.getTr(
                    webTable.getTh(`<input id="checkAll" type="checkbox" name="checkall" value="checkall">`)+
                    webTable.getTh('indice')+
                    webTable.getTh('Nome do arquivo')+
                    webTable.getTh('Diretório')
                )
            )+
            //adds the previously created body
            webTable.getTBody(trlines)
        );

        //sets the variable of the table to another variable to fix the content
        pre_save = str_table;
        //defines the encoding
        res.charset = 'UTF-8';
        //send data to EJS (View)
        res.render('home/index', { table: pre_save });
    });
};