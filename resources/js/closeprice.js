const extractClosePrice = (results) => {
    var closeArray = [];
    var tempArray = [];
    for (var p in results) {
        tempArray = [];
        for (var d in results[p]){
            tempArray.push(results[p][d].close)    
        }
        closeArray[p] = tempArray;
    }
    return closeArray;
};

export default extractClosePrice;