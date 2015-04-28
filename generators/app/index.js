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
  },

  configuring: function () {
    this.config.save();
  },

  writing: function () {
    this.template('_bower.json', 'test/bower.json');
    this.template('bowerrc', 'test/.bowerrc');
    this.template('test.js', 'test/spec/test.js');
    this.template('index.html', 'test/index.html');
  },

  install: function () {
    if (this.options['skip-install']) {
      return;
    }

    process.chdir('test');
    this.installDependencies({
      npm: false,
      skipInstall: this.options['skip-install'],
      skipMessage: true
    });
  }
});
