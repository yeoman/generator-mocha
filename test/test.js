/*global describe, it, before */
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');


describe('Mocha generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.generator = helpers.createGenerator('mocha:generator', [
        '../../generator'
      ]);
      done();
    }.bind(this));
  });

  it('every generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    require('../app');
    require('../generator');
  });

  describe('mocha:generator', function () {
    it('should create expected files', function (done) {
      // FIXME: Doesn't actually check for files yet.
      var expected = [];
      this.generator.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });
    });
  });
});
