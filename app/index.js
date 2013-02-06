'use strict';
// mocha:app generator
//
// Sets up the test/ directory
//
var Generator = module.exports = function (args, options) {
  this.option('assert-framework', {
    type: String,
    defaults: 'chai',
    desc: 'Choose your prefered assertion library'
  });

  this.option('assert-style', {
    desc: 'Choose the asssert style you wish to use (assert, expect, should). Only enabled with chai.',
    type: String,
    defaults: 'expect'
  });

  this.option('ui', {
    desc: 'Choose your style of DSL (bdd, tdd, qunit, or exports)',
    type: String,
    defaults: 'bdd'
  });

  this.directory('.', 'test');
};

Generator.name = 'Mocha';
