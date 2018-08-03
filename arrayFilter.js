exports.clean = function (arr, deleteValue) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == deleteValue) {         
            arr.splice(i, 1);
        i--;
        }
    }
    return arr;
}