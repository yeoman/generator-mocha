'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('ui', {
      desc: 'Choose your style of DSL (bdd, tdd)',
      type: String
    });

    this.option('rjs', {
      desc: 'Add support for RequireJS',
      type: Boolean
    });
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'ui',
      message: 'Choose your style of DSL',
      choices: ['BDD', 'TDD'],
      default: 'BDD',
      when: !this.options.ui
    }];

    this.prompt(prompts, function (answers) {
      this.options.ui = (this.options.ui || answers.ui).toLowerCase();
      done();
    }.bind(this));
  },

  configuring: function () {
    this.config.set('ui', this.options.ui);
    this.config.set('rjs', !!this.options.rjs);
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
