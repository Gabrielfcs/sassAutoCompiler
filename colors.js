
module.exports = {
    RESET: '0',
    BRIGHT: '1',
    DIM: '2',
    UNDERSCORE: '4',
    BLINK: '5',
    REVERSE: '7',
    HIDDEN: '8',
    
    BLACK: '30',
    RED: '31',
    GREEN: '32',
    YELLOW: '33',
    BLUE: '34',
    MAGENTA: '35',
    CYAN: '36',
    WHITE: '37',
    
    BG_BLACK: '40',
    BG_RED: '41',
    BG_GREEN: '42',
    BG_YELLOW: '43',
    BG_BLUE: '44',
    BG_MAGENTA: '45',
    BG_CYAN: '46',
    BG_WHITE: '47',
    colorize: function(string, color = RESET){
        return `\x1b[${color}m${string}\x1b[0m`;
    }
}