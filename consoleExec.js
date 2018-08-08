const { exec } = require('child_process');
const color = require('./colors');
global.strError;
global.strError = '';

module.exports = function(){
    this.execCommand = function(strcommand, indexToReturn, directory){
        return new Promise((resolve, reject) => {
            exec(strcommand,{maxBuffer: 1024 * 500}, (error, stdout, stderr) => {
                if (error) {
                    console.log('Executed: '+color.colorize(directory, color.CYAN)+' and '+color.colorize('failed', color.RED)+'!');
                    global.strError += error;
                    // console.error(color.colorize(`${error}`, color.RED));
                    resolve({
                        currentIndex: indexToReturn, 
                        error: global.strError,
                        stdout: ''
                    });
                } else {
                    console.log('Executed: '+color.colorize(directory, color.CYAN)+' and '+color.colorize('passed', color.GREEN)+'!');
                    // console.log(`${stdout}`);
                    // if(stderr.length > 0){
                    //     console.log(`${stderr}`);
                    // }
                    resolve({
                        currentIndex: indexToReturn, 
                        error: global.strError,
                        stdout: stdout
                    });
                }
            });
        });
    };
    return this;
}