'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('ui', {
      desc: 'Choose your style of DSL (bdd, tdd, qunit, or exports)',
      type: String,
      defaults: 'bdd'
    });

    this.option('rjs', {
      desc: 'Add support for RequireJS',
      type: Boolean
    });
  },

  configuring: function () {
    this.config.save();
  },

  writing: function () {
    this.template('test.js', 'test/spec/test.js');
    this.template('index.html', 'test/index.html');
  },

  install: function () {
    if (this.options['skip-install']) {
      return;
    }

    var dependencies = [
      'chai',
      'mocha'
    ];

    if (this.options.rjs) {
      dependencies.push('requirejs');
    }

    this.bowerInstall(dependencies, {saveDev: true});
  }
});
