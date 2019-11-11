/*global describe, beforeEach, it*/
'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('mocha:app', () => {
  describe('defaults', () => {
    beforeEach(done => {
      helpers
        .run(path.join(__dirname, '../generators/app'))
        .on('end', done);
    });

    it('creates expected files', () => {
      assert.file([
        'test/spec/test.js',
        'test/index.html'
      ]);
      assert.fileContent('test/index.html', /mocha.setup\('bdd'\)/);
    });

    it('saves the options used', () => {
      assert.jsonFileContent('.yo-rc.json', {
        'generator-mocha': {
          ui: 'bdd',
          rjs: false
        }
      });
    });
  })

  describe('using options', () => {
    it('when --ui=bdd', done => {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ui: 'bdd'})
      .on('end', () => {
        assert.fileContent('test/index.html', /mocha.setup\('bdd'\)/);
        assert.fileContent('test/spec/test.js', /describe/);
        done()
      });
    });

    it('when --ui=tdd', done => {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ui: 'tdd'})
      .on('end', () => {
        assert.fileContent('test/index.html', /mocha.setup\('tdd'\)/);
        assert.fileContent('test/spec/test.js', /suite/);
        done();
      });
    });
  });

  describe('using prompts', () => {
    it('when --ui=bdd', done => {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ui: 'bdd'})
      .on('end', () => {
        assert.fileContent('test/index.html', /mocha.setup\('bdd'\)/);
        assert.fileContent('test/spec/test.js', /describe/);
        done()
      });
    });

    it('when --ui=tdd', done => {
      helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ui: 'tdd'})
      .on('end', () => {
        assert.fileContent('test/index.html', /mocha.setup\('tdd'\)/);
        assert.fileContent('test/spec/test.js', /suite/);
        done();
      });
    });
  });
});
