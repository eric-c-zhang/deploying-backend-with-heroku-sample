var assets = ['XSP.TO','XIC.TO','XIN.TO','XBB.TO','CAR-UN.TO'];
var covmatMain = [];
const getetfdata = require('./resources/js/getetfdata.js');
const fs = require('fs');

getetfdata(assets)
.then(matrix=>{
    covmatMain=matrix;
    console.log(covmatMain);
    fs.writeFile('./updated-matrix.json', JSON.stringify(covmatMain), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
})
