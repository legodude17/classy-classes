/*jslint node:true*/
'use strict';
var classy = require('classy'),
    lodash = require('lodash');
var classyUtils = {
    NumberRange: classy.define({
        init: function (min, max, options) {
            this.min = min;
            this.max = max;
            this.inclusive.min = options.inclusiveMin;
            this.inclusive.max = options.inclusiveMax;
        },
        contains: function (num) {
            var less, more;
            if (this.inclusive.min) {
                more = (num >= this.min);
            } else {
                more = (num > this.min);
            }
            if (this.inclusive.max) {
                less = (num <= this.max);
            } else {
                less = (num < this.max);
            }
            return less && more;
        }
    }),
    Math: classy.define({
        init: function () {},
        snapToFloor: function (num, amount) {
            return Math.floor(num / amount) * amount;
        },
        snapToCiel: function (num, amount) {
            return Math.ceil(num / amount) * amount;
        }
    }),
    Wrap: classy.define({
        tryAsync: function (func, thisObj) {
            return function () {
                var args = [function () {}].concat(Array.apply(null, arguments));
                func.apply(thisObj, args);
            };
        }
    }),
    ArrayFunc: classy.define({
        extend: Function,
        forceInstance: true,
        init: function (func, thisObj, args) {
            thisObj = thisObj || Object.create(null);
            return function () {
                var ars = Array.apply(null, arguments).concat(args);
                func.apply(thisObj, ars);
            };
        }
    })
};
module.exports = classyUtils;