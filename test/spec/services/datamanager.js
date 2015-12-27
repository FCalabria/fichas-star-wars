'use strict';

describe('Service: dataManager', function () {

  // load the service's module
  beforeEach(module('fichasStarWarsApp'));

  // instantiate service
  var dataManager;
  beforeEach(inject(function (_dataManager_) {
    dataManager = _dataManager_;
  }));

  it('should do something', function () {
    expect(!!dataManager).toBe(true);
  });

});
