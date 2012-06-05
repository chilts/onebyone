// --------------------------------------------------------------------------------------------------------------------
//
// basic.js - basic tests for onebyone
//
// Copyright (c) 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// requires

// modules
var tap = require("tap");
var test = tap.test;
var onebyone = require('../');

// --------------------------------------------------------------------------------------------------------------------

test("Basic successful callback", function (t) {

    var seq = onebyone();
    var first = function(callback) {
        setTimeout(function() {
            callback(null, 'Ok');
        }, 0.1);
    };

    seq.add(first, function(err, data) {
        t.equal(err, null, 'First function never fails');
        t.equal(data, 'Ok', 'First function always returns Ok');
        t.end();
    });

});

test("Two functions on the run", function (t) {

    var seq = onebyone();
    var first = function(callback) {
        setTimeout(function() {
            callback(null, 'Ok');
        }, 0.2);
    };
    var second = function(callback) {
        setTimeout(function() {
            callback('Error', null);
        }, 0.1);
    };

    var t1;
    var t2;
    seq.add(first, function(err, data) {
        t1 = new Date();
        t.equal(err, null, 'First function never fails');
        t.equal(data, 'Ok', 'First function always returns Ok');
        t.ok(t1, 't1 has a value');
        t.equal(t2, undefined, 't2 never has a value before t1');
        t.end();
    });

    seq.add(second, function(err, data) {
        t2 = new Date();
        t.ok(t1, 't1 has a value prior to here');
        t.ok(t1 < t2, 't1 is always less than t2');
        t.equal(err, 'Error', 'Second function always fails');
        t.equal(data, null, 'First function never returns anything nice');
        t.end();
    });

});

// --------------------------------------------------------------------------------------------------------------------
