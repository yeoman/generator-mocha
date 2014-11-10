/* global describe, beforeEach, it */
'use strict';

var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('Mocha generator test', function () {
  beforeEach(function (done) {
    this.app = helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({'skip-install': true});

    done();
  });

  describe('creates expected files', function () {
    it('when --ui=bdd', function (done) {
      var expected = [
        'test/spec/test.js',
        'test/.bowerrc',
        'test/bower.json',
        'test/index.html'
      ];

      this.app
        .withPrompt({ui: 'bdd'})
        .on('end', function () {
          assert.fileContent('test/index.html', /mocha.setup\('bdd'\)/);
          done(assert.file(expected));
        });
    });

    it('when --ui=tdd', function (done) {
      var expected = [
        'test/spec/test.js',
        'test/.bowerrc',
        'test/bower.json',
        'test/index.html'
      ];

      this.app
        .withPrompt({ui: 'tdd'})
        .on('end', function () {
          assert.fileContent('test/index.html', /mocha.setup\('tdd'\)/);
          done(assert.file(expected));
        });
    });
  });
});
