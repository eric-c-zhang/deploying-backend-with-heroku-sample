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

const makeReturnArray = (results,assets) => {
    var closeArray = [];
    var returnArray = [];
    for (var p in results) {
        tArray = [];
        rArray = [];
        for (var d in results[p]){
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

const getETFdata = async assets => {
    //Download price data... to be moved to Heroku server
    const Stocks = require('stocks.js')
    const math = require('mathjs')
    const cov = require('compute-covariance')
    var options = {
        symbol: 'AAPL',
        interval: 'weekly',
        amount: 53
    };
    var results = [];
    var stocks = new Stocks('HOW0LDN2HBFLZDA2')
    for (a in assets) {
        options.symbol = assets[a];
        results[a] = await stocks.timeSeries(options)
    }
    let returnResults = results;
    closePrice = extractClosePrice(await returnResults);
    returns = makeReturnArray(await returnResults,assets);
    
    try {
        covmat=math.matrix(cov(returns));
    } catch(e) {
        console.log("Error in the matrix");
        console.log(e);
    }

    return covmat;
}

module.exports = getETFdata; 