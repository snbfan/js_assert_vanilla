/**
 * Asserts "expected" versus "actual",
 * 'failing' the assertion (via Error) if a difference is found.
 *
 * @param {String} message The comparison message passed by the user
 * @param {*} expected The expected item
 * @param {*} actual The actual item
 */
function assertEquals(message, expected, actual) {

    /**
     * Detects variable type
     *
     * @param {*} variable to detect type of
     * @returns {String} type name
     */
    this.detectType = function(variable) {
        var s = Object.prototype.toString.call(variable);
        return s.substr(8, (s.length - 9));
    };

    /**
     * Does arrays comparison
     *
     * @param {Array} a1 array #1
     * @param {Array} a2 array #2
     */
    this.compareArray = function(a1, a2) {

        // first compare lengths
        if (a1.length != a2.length) {
            throw {
                type : 'array length ',
                expected : a1.length,
                actual : a2.length
            };
        }

        // then compare element by element
        for (var i = 0; i < a1.length; i++) {
            try {
                this.compare(a1[i], a2[i]);
            } catch(e) {
                throw {
                    type : e.type,
                    expected : '[' + i + ']' + e.expected,
                    actual : e.actual
                };
            }
        }
    };

    /**
     * Does strings comparison
     *
     * @param {String} s1 string #1
     * @param {String} s2 string #2
     */
    this.compareString = function(s1, s2) {
        if (s1.length != s2.length || s1 != s2) {
            throw {
                type : '',
                expected : ' to be "' + s1 + '"',
                actual : '"' + s2 + '"'
            };
        }
    };

    /**
     * Does numbers comparison
     *
     * @param {Number} n1 number #1
     * @param {Number} n2 number #2
     */
    this.compareNumber = function(n1, n2) {
        if (n1 !== n2) {
            throw {
                type : '',
                expected : n1,
                actual : n2
            };
        }
    };

    /**
     * Does initial types comparison
     *
     * @param {*} v1 variable #1
     * @param {*} v2 variable #2
     */
    this.compareTypes = function(v1, v2) {
        var type1 = this.detectType(v1),
            type2 = this.detectType(v2);

        if (type1 != type2) {
            throw {
                type : 'type ',
                expected : type1,
                actual : type2
            };
        }
    };

    /**
     * Does objects comparison
     *
     * @param {Object} o1 object #1
     * @param {Object} o2 object #2
     */
    this.compareObject = function(o1, o2) {

        var props1 = Object.getOwnPropertyNames(o1),
            props2 = Object.getOwnPropertyNames(o2),
            viceversa = false;

        // reverting objects...
        if (props1.length < props2.length) {
            var p = o1;
            o1 = o2;
            o2 = p;
            viceversa = true;
            props1 = Object.getOwnPropertyNames(o1);
        }

        // iterate over each property and compare
        for (var i = 0; i < props1.length; i++) {
            var pname = props1[i];

            // handle missing properties
            if (o2[pname] === undefined) {
                throw {
                    type : '',
                    expected : '.' + pname + ( viceversa ? ' to be missing' : ''),
                    actual : ( viceversa ? 'it' : 'nothing')
                };
            }

            // do comparison of object's properties
            try {
                this.compare(o1[pname], o2[pname]);
            } catch(e) {
                throw {
                    type : e.type,
                    expected : '.' + pname + e.expected,
                    actual : e.actual
                };
            }
        }
    };

    /**
     * Main comparison method
     *
     * @param {*} expected expected value
     * @param {*} actual actual value
     */
    this.compare = function(expected, actual) {
        // do initial type comparison
        this.compareTypes(expected, actual);
        // if types are equal - compare values
        this['compare' + this.detectType(expected)].call(this, expected, actual);
    };

    // start comparing routine
    try {
        this.compare(expected, actual);
    } catch(e) {
        var expectedStr = (e.expected.toString()[0] == ".") ? e.expected.substr(1, e.expected.length) : e.expected;
        throw {
            message : message + 'Expected ' + e.type + expectedStr + ' but found ' + e.actual
        };
    }
}

/* -- Test running code:  --- */

/**
 * Runs a "assertEquals" test.
 *
 * @param {String} message The initial message to pass
 * @param {Array} assertionFailures List of messages that will be displayed on the UI for evaluation
 * @param {*} expected Expected item
 * @param {*} actual The actual item
 */
function runTest(message, assertionFailures, expected, actual) {
    try {
        assertEquals(message, expected, actual);
    } catch (failure) {
        assertionFailures.push(failure.message);
    }
}

function runAll() {

    var complexObject1 = {
        propA : 1,
        propB : {
            propA : [1, {
                propA : 'a',
                propB : 'b'
            }, 3],
            propB : 1,
            propC : 2
        }
    };
    var complexObject1Copy = {
        propA : 1,
        propB : {
            propA : [1, {
                propA : 'a',
                propB : 'b'
            }, 3],
            propB : 1,
            propC : 2
        }
    };
    var complexObject2 = {
        propA : 1,
        propB : {
            propB : 1,
            propA : [1, {
                propA : 'a',
                propB : 'c'
            }, 3],
            propC : 2
        }
    };
    var complexObject3 = {
        propA : 1,
        propB : {
            propA : [1, {
                propA : 'a',
                propB : 'b'
            }, 3],
            propB : 1
        }
    };

    // Run the tests
    var assertionFailures = [];
    runTest('Test 01: ', assertionFailures, 'abc', 'abc');
    runTest('Test 02: ', assertionFailures, 'abcdef', 'abc');
    runTest('Test 03: ', assertionFailures, ['a'], {0 : 'a'});
    runTest('Test 04: ', assertionFailures, ['a', 'b'], ['a', 'b', 'c']);
    runTest('Test 05: ', assertionFailures, ['a', 'b', 'c'], ['a', 'b', 'c']);
    runTest('Test 06: ', assertionFailures, complexObject1, complexObject1Copy);
    runTest('Test 07: ', assertionFailures, complexObject1, complexObject2);
    runTest('Test 08: ', assertionFailures, complexObject1, complexObject3);
    runTest('Test 09: ', assertionFailures, null, {});
    runTest('Test 10: ', assertionFailures, complexObject3, complexObject1);

    // Output the results
    var messagesEl = document.getElementById('messages');
    var newListEl;
    var i, ii;

    for ( i = 0, ii = assertionFailures.length; i < ii; i++) {
        newListEl = document.createElement('li');
        newListEl.innerHTML = assertionFailures[i];
        messagesEl.appendChild(newListEl);
    }
}

runAll();
