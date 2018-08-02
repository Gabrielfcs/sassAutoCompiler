const express = require('express');
const app = express();
//Informa para o Express que o EJS será o motor de Views
app.set('view engine', 'ejs');
app.set('views', './views/app/');

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

var sass = require('node-sass');

const cTable = require('console.table');

const webTable = require('./table');
const color = require('./colors');

const directory = "D:/htdocs";

// var style ='';

// app.get('/', function (req, res) {
        
//     sass.render(
//         {
//             file: './scss/main.scss',
//             importer: function(url, prev, done) {
//                 // url is the path in import as is, which LibSass encountered.
//                 // prev is the previously resolved path.
//                 // done is an optional callback, either consume it or return value synchronously.
//                 // this.options contains this options hash, this.callback contains the node-style callback
//                 someAsyncFunction(url, prev, function(result){
//                     done({
//                     file: result.path, // only one of them is required, see section Special Behaviours.
//                     contents: result.data
//                     });
//                 });
//             },
//             includePaths: [ 'lib/', 'mod/' ],
//             outputStyle: 'compressed'
//         }, 
//         function(error, result) { 
//             if (error) {
//                 console.log(error.status); // used to be "code" in v2x and below
//                 console.log(error.column);
//                 console.log(error.message);
//                 console.log(error.line);
//                 }
//                 else {
//                 console.log(result.css.toString());
//                 console.log(result.stats);
//                 }
//         }
//     );

//     // Loop through all the files in the temp directory
//     fs.readdir( directory, function( err, files ) {
//         if( err ) {
//             console.error( "Could not list the directory.", err );
//             process.exit( 1 );
//         } 
        
//         var indice = 0;
//         var table = [];
//         var response = '';
        
//         files.forEach( function(file, index) {
//             //entire directory
//             var fullpath = path.join( directory, file );            
            
//             //add spaces
//             showIndex = index < 10 ? " "+ index : index;
//             showIndex = " "+showIndex;
    
//             // var strcommand = 'unrecognized command!';
            
//             // var strcommand = 'echo';
//             // exec(strcommand, (error, stdout, stderr) => {
//             //     if (error) {
//             //         console.error(`exec error: ${error}`);
//             //         return;
//             //     }
//             //     console.log(`stdout: ${stdout}`);
//             //     console.log(`stderr: ${stderr}`);
//             // });
    
//             //add correct values to the table
//             if(file.indexOf("sprint") > -1){
//                 table[index] = {
//                     'indice': color.colorize(showIndex+": ", color.GREEN),
//                     'arquivo': color.colorize(file, color.YELLOW),
//                     'diretório': color.colorize(" ("+fullpath+")", color.MAGENTA)
//                 };
//             }
//         } );
        
//         console.clear();
//         //Title
//         console.log("\n\nList of files:\n");
//         console.table(table);
//     } );
//     res.send(
//         webTable.getTable(
//             webTable.getTr(
//                 webTable.getTd('Teste 1')+
//                 webTable.getTd('Teste 2')+
//                 webTable.getTd('Teste 3')
//             )+
//             webTable.getTr(
//                 webTable.getTd('Teste 4')+
//                 webTable.getTd('Teste 5')+
//                 webTable.getTd('Teste 6')
//             )
//         )
//     );
    
//     res.end();
// })

app.get('/', function(req, res){
    res.render('home/index');
});

app.listen(3000, function () {
    console.log('Server is running!')
});