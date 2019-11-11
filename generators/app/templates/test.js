(function () {
  'use strict';

  <%_ if (ui === 'bdd') { -%>
  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {

      });
    });
  });
  <%_ } else if (ui === 'tdd') { -%>
  suite('Give it some context', function () {
    suite('maybe a bit more context here', function () {
      test('should run here few assertions', function () {

      });
    });
  });
  <%_ } -%>
})();
