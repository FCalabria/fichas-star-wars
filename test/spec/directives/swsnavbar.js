'use strict';

describe('Directive: SwsNavbar', function () {

  // load the directive's module
  beforeEach(module('fichasStarWarsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-sws-navbar></-sws-navbar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the SwsNavbar directive');
  }));
});
