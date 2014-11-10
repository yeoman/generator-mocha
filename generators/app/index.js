'use strict';

var yeoman = require('yeoman-generator');

/**
 * Initialize Mocha generator
 *
 * @param {String|Array} args
 * @param {Object} options
 * @api public
 */
var MochaGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('ui', {
      desc: 'Choose your style of DSL (bdd, tdd)',
      type: String,
      defaults: 'bdd'
    });

    this.option('skip-install', {
      desc: 'Skip the bower and node installations',
      defaults: false
    });
  },

  prompting: function () {
    var cb = this.async();

    var prompts = [{
      type: 'list',
      name: 'ui',
      message: 'Choose your style of DSL (bdd, tdd)',
      choices: [{
        name: 'BDD',
        value: 'bdd',
      }, {
        name: 'TDD',
        value: 'tdd',
      }]
    }];

    this.prompt(prompts, function (answers) {
      this.config.set('ui', answers.ui);
      this.options.ui = answers.ui;

      cb();
    }.bind(this));
  },

  configuring: function () {
    this.config.save();
  },

  /**
   * Setup environment
   *
   * @api public
   */
  writing: function () {
    this.template('_bower.json', 'test/bower.json');
    this.template('bowerrc', 'test/.bowerrc');
    this.template('test.js', 'test/spec/test.js');
    this.template('index.html', 'test/index.html');
  },

  /**
   * Install dependencies
   *
   * @api public
   */
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

/**
 * Module exports
 */

module.exports = MochaGenerator;
