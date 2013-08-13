'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var MochaGenerator = module.exports = function MochaGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../../', 'templates'));

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

  this.on('end', function () {
    process.chdir('test');
    this.installDependencies({
      npm: false,
      skipInstall: options['skip-install']
    });
  });
};

util.inherits(MochaGenerator, yeoman.generators.Base);

MochaGenerator.prototype.setupEnv = function setupEnv() {
  this.copy('_bower.json', 'test/bower.json');
  this.copy('test.js', 'test/spec/test.js');
  this.copy('index.html', 'test/index.html');
};
