const { exec } = require('child_process');
const color = require('./colors');

exports.execute = function (strcommand) {
    var execprocess = exec(strcommand,{maxBuffer: 1024 * 500}, (error, stdout, stderr) => {
        if (error) {
            // console.log('codigo de erro: '+error.code);
            console.error(color.colorize(`${error}`, color.RED));
            return;
        } else {
            console.log(stderr);
            if(execprocess.code == 1){
                console.log(execprocess.code);
            }
        }


        console.log(`${stdout}`);
        if(stderr.length > 0){
            console.log(`${stderr}`);
        }
    });
};