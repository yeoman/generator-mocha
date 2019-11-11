'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('ui', {
      desc: `Choose the interface style (bdd, tdd)`,
      type: String
    });

    this.option('rjs', {
      desc: 'Add support for RequireJS',
      type: Boolean
    });
  }

  prompting() {
    const done = this.async();

    const prompts = [{
      type: 'list',
      name: 'ui',
      message: `Choose the interface style for Mocha`,
      choices: [
        {
          name: 'BDD (Behavior-Driven Development)',
          value: 'bdd'
        },
        {
          name: 'TDD (Test-Driven Development)',
          value: 'tdd'
        }
      ],
      default: 'bdd',
      when: !this.options.ui
    }];

    this.prompt(prompts).then(answers => {
      this.options.ui = this.options.ui || answers.ui;
      done();
    });
  }

  configuring() {
    this.config.set('ui', this.options.ui);
    this.config.set('rjs', !!this.options.rjs);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/spec/test.js'),
      {
        ui: this.options.ui,
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('test/index.html'),
      {
        ui: this.options.ui,
        rjs: this.options.rjs
      }
    );
  }

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        bower: false
      });
    }

    const dependencies = [
      'chai',
      'mocha'
    ];

    if (this.options.rjs) {
      dependencies.push('requirejs');
    }

    this.npmInstall(dependencies, {saveDev: true});
  }
}
