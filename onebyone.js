// --------------------------------------------------------------------------------------------------------------------
//
// onebyone.js - Flow control so that only one function executes at any one time.
//
// Copyright (c) 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

function OneByOne() {
    var self = this;
    self.running = false;
    self.queue = [];

    return self;
};

OneByOne.prototype.next = function() {
    var self = this;

    if ( self.running ) {
        // not doing anything, tell the caller
        return false;
    }
    if ( self.queue.length === 0 ) {
        return false;
    }

    // ok, call the next function
    self.running = true;
    var next = self.queue.shift();

    next.fn(function(err, data) {
        // call their own callback
        next.callback(err, data);
        // say that we are no longer running and call next
        self.running = false;
        self.next();
    });

    return true;
}

OneByOne.prototype.add = function(fn, callback) {
    var self = this;

    // add this function and callback to the queue
    self.queue.push({
        fn       : fn,
        callback : callback,
    });

    // call next to start something (or ignore if we are already running something)
    self.next();
};

// --------------------------------------------------------------------------------------------------------------------

module.exports = exports = function() {
    return new OneByOne();
};

// --------------------------------------------------------------------------------------------------------------------
