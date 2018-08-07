const { exec } = require('child_process');
const color = require('./colors');
global.strError;
global.strError = '';

module.exports = function(){
    this.execCommand = function(strcommand, callback){
        exec(strcommand,{maxBuffer: 1024 * 500}, (error, stdout, stderr, ) => {
            if (error) {
                global.strError += error;
                console.error(color.colorize(`${error}`, color.RED));   
            } else {
                console.log(`${stdout}`);
                if(stderr.length > 0){
                    console.log(`${stderr}`);
                }
            }
            
            // console.log("beforereturn: "+execprocess.stdout);
            // return `${strError}`;
            callback(global.strError); //return value
        });
    };
    return this;
}