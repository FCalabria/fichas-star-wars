'use strict';

describe('Directive: swsFooter', function () {

  // load the directive's module
  beforeEach(module('fichasStarWarsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sws-footer></sws-footer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the swsFooter directive');
  }));
});
