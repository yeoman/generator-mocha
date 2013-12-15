/* global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Mocha generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      /* jshint -W107 */
      this.app = helpers.createGenerator('mocha:app', [
        '../../lib/generators/app'
      ]);
      /* jshint +W107 */
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'test/spec/test.js',
      'test/bower.json',
      'test/index.html'
    ];

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
