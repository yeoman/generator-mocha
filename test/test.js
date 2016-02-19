/*global describe, beforeEach, it*/
'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('mocha:app', function () {
  describe('defaults', function () {
    beforeEach(function (done) {
      helpers
        .run(path.join(__dirname, '../generators/app'))
        .on('end', done);
    });

    it('creates expected files', function () {
      assert.file([
        'test/spec/test.js',
        'test/index.html'
      ]);
      assert.fileContent('test/index.html', /mocha.setup\('bdd'\)/);
    });

    it('saves the options used', function () {
      assert.jsonFileContent('.yo-rc.json', {
        'generator-mocha': {
          ui: 'bdd',
          rjs: false
        }
      });
    });
  })

  describe('using options', function () {
    it('when --ui=bdd', function (done) {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ui: 'bdd'})
      .on('end', function () {
        assert.fileContent('test/index.html', /mocha.setup\('bdd'\)/);
        done()
      });
    });

    it('when --ui=tdd', function (done) {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ui: 'tdd'})
      .on('end', function () {
        assert.fileContent('test/index.html', /mocha.setup\('tdd'\)/);
        done();
      });
    });
  });

  describe('using prompts', function () {
    it('when --ui=bdd', function (done) {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ui: 'bdd'})
      .on('end', function () {
        assert.fileContent('test/index.html', /mocha.setup\('bdd'\)/);
        done()
      });
    });

    it('when --ui=tdd', function (done) {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ui: 'tdd'})
      .on('end', function () {
        assert.fileContent('test/index.html', /mocha.setup\('tdd'\)/);
        done();
      });
    });
  });
});
