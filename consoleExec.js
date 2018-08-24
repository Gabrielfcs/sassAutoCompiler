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
                    errorString = error.message.length > 0 ? ' |redcolor|'+error.message+'|/redcolor|' : '';
                    outputString = stdout.length > 0 ? ' |purplecolor| Output: |/purplecolor|'+stdout : '';
                    global.strError += '|getParentDiv| [Erro Nº '+ indexToReturn+ ']:' + errorString + '|getDiv|'+ outputString + '|/getDiv|' + '|/getParentDiv|';
                    // console.error(color.colorize(`${error}`, color.RED));
                    resolve({
                        currentIndex: indexToReturn, 
                        output: global.strError
                    });
                } else {
                    console.log('Executed: '+color.colorize(directory, color.CYAN)+' and '+color.colorize('passed on', color.GREEN)+'!');
                    // console.log(`${stdout}`);
                    // if(stderr.length > 0){
                    //     console.log(`${stderr}`);
                    // }
                    resolve({
                        currentIndex: indexToReturn, 
                        output: global.strError
                    });
                }
            });
        });
    };
    return this;
}