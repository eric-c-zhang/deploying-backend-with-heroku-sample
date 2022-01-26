const makeReturnArray = (results) => {
    var closeArray = [];
    var returnArray = [];
    for (var p in results) {
        tArray = [];
        rArray = [];
        for (var d in results[p]){
            console.log(assets[p])
            tArray.push(results[p][d].close)
            if (d < 52) {
                let ld = 0;
                ld = Number(d) + 1;                   //Latest date placed at start of array.
                rArray.push((results[p][d].close-results[p][ld].close)/(results[p][ld].close))
            }
        };
        closeArray[p] = tArray;
        returnArray[p] = rArray;
    }
    return returnArray;
};

export default makeReturnArray;