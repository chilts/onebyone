var onebyone = require('../')();

var one = function(callback) {
    setTimeout(function() {
        callback(null, 'Ok');
    }, 2000);
};

var two = function(callback) {
    setTimeout(function() {
        callback(null, 'Ok');
    }, 1000);
};

console.log('Setting up tasks : ' + (new Date()).toISOString());
onebyone.add(one, function() {
    console.log('One has finished : ' + (new Date()).toISOString());
});
onebyone.add(two, function() {
    console.log('Two has finished : ' + (new Date()).toISOString());
});
