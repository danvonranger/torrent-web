const path = require('path');
const fs = require('fs');

fs.readFile(path.resolve(__dirname,'dummy.txt'), 'utf8', function(err, data) {  
    if (err) throw err;
    console.log(data);
});
const dot = () => {  
    fs.readFile(path.resolve(__dirname,'dummy.txt'), 'utf8', function(err, data) {  
        if (err) throw err;
        console.log(data);
    });
}

module.exports = {
    dot
}