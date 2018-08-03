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

app.get('/', function(req, res){
    res.render('home/index');
});

app.listen(3000, function () {
    console.log('Server is running!')
});