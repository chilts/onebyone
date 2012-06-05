```
                   _______  _        _______  ______            _______  _        _______ 
                  (  ___  )( (    /|(  ____ \(  ___ \ |\     /|(  ___  )( (    /|(  ____ \
                  | (   ) ||  \  ( || (    \/| (   ) )( \   / )| (   ) ||  \  ( || (    \/
                  | |   | ||   \ | || (__    | (__/ /  \ (_) / | |   | ||   \ | || (__    
                  | |   | || (\ \) ||  __)   |  __ (    \   /  | |   | || (\ \) ||  __)   
                  | |   | || | \   || (      | (  \ \    ) (   | |   | || | \   || (      
                  | (___) || )  \  || (____/\| )___) )   | |   | (___) || )  \  || (____/\
                  (_______)|/    )_)(_______/|/ \___/    \_/   (_______)|/    )_)(_______/
                                                                                          
```

onebyone - Flow control so that only one function executes at any one time.

[![Build Status](https://secure.travis-ci.org/appsattic/onebyone.png?branch=master)](http://travis-ci.org/appsattic/onebyone)

## Synopsis ##

Like async.series() but you can keep adding functions to it.

Gives you an object (like a queue) into which you can add functions and each will only ever run in series, never
concurrently, and only one at a time. Also gives you your result immediately, rather than at the end of the series.

## Example ##

```
var onebyone = require('onebyone')();

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
onebyone.add(one, function(err, data) {
    console.log('One has finished : ' + (new Date()).toISOString());
});
onebyone.add(two, function(err, data) {
    console.log('Two has finished : ' + (new Date()).toISOString());
});
```

Will give an output similar to the following:

```
Setting up tasks : 2012-06-05T05:33:25.549Z
One has finished : 2012-06-05T05:33:27.561Z
Two has finished : 2012-06-05T05:33:28.563Z
```

## Author ##

Written by: [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

## License ##

The MIT License : http://opensource.org/licenses/MIT

Copyright (c) 2011-2012 AppsAttic Ltd. http://appsattic.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
