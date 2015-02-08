/*global describe, beforeEach, it */
'use strict';
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('Mocha generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        done(err);
        return;
      }

      /* jshint -W107 */
      this.app = helpers.createGenerator('mocha:app', [
        '../../generators/app'
      ]);
      /* jshint +W107 */
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'test/spec/test.js',
      'test/.bowerrc',
      'test/bower.json',
      'test/index.html'
    ];

    this.app.options['skip-install'] = true;
    this.app.run(function () {
      done(assert.file(expected));
    });
  });
});
