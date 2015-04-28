/*global describe, beforeEach, it*/
'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('mocha:app', function () {
  beforeEach(function (done) {
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(__dirname, 'tmp'))
      .on('end', done);
  });

  it('creates expected files', function () {
    assert.file([
      'test/spec/test.js',
      'test/index.html'
    ]);
  });
});
