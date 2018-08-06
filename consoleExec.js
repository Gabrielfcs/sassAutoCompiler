const { exec } = require('child_process');
const color = require('./colors');
global.strError;
global.strError = '';
module.exports = function(){
    this.execCommand = function(strcommand, callback){
        exec(strcommand,{maxBuffer: 1024 * 500}, (error, stdout, stderr, ) => {
            if (error) {
                global.strError += error;
                // console.log("afterset: "+error);
                console.error(color.colorize(`${error}`, color.RED));   
                return;
            } else {
                console.log(stderr);
                // if(execprocess.code == 1) {
                //     console.log(execprocess.code);
                // }
            }
            
            console.log(`${stdout}`);
            if(stderr.length > 0){
                console.log(`${stderr}`);
            }
            // console.log("beforereturn: "+execprocess.stdout);
            // return `${strError}`;
            callback(global.strError);
        });
    };
    return this;
}

// module.exports.execute = function (strcommand, callback) {
//     var execprocess = exec(strcommand,{maxBuffer: 1024 * 500}, (error, stdout, stderr, ) => {
//         if (error) {
//             global.strError += error;
//             // console.log("afterset: "+error);
//             console.error(color.colorize(`${error}`, color.RED));   
//             return;
//         } else {
//             console.log(stderr);
//             // if(execprocess.code == 1) {
//             //     console.log(execprocess.code);
//             // }
//         }

//         console.log(`${stdout}`);
//         if(stderr.length > 0){
//             console.log(`${stderr}`);
//         }
//         // console.log("beforereturn: "+execprocess.stdout);
//         // return `${strError}`;
//     });
//     execprocess.on('close', function (){
//         return global.strError;
//     });
//     callback();
// };