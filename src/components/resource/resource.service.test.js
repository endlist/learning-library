import resourceServiceName from './resource.service.js';

describe('Resource Service', function () {

  let $rootScope;
  let resourceService;
  let localStorageService = '';
  const mockResource = {
    key: 'unique key',
    title: 'a book',
    type: 'book',
  };

  beforeEach(angular.mock.module(resourceServiceName));

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    resourceService = $injector.get('ResourceService');
    localStorageService = $injector.get('localStorageService');
  }));

  beforeEach(function () {
    sinon.stub(localStorageService, 'keys');
    sinon.stub(localStorageService, 'remove');
    sinon.stub(localStorageService, 'get');
    sinon.stub(localStorageService, 'set');
  });

  it('should exist', function () {
    expect(resourceService).to.exist;
  });

  describe('upsert', function () {

    it('should return a promise', function () {
      const response = resourceService.upsert(mockResource);
      expect(response).to.have.property('then');
    });

    it('should reject with message if there is no key', function () {
      resourceService.upsert()
        .catch((error) => {
          expect(error).to.equal('Resource Key Required');
        });

      $rootScope.$digest();
    });

    it('should persist the resource to localStorage if it does not already exist', function () {
      resourceService.upsert(mockResource)
        .then(() => {
          expect(localStorageService.set).to.have.been.calledOnce;
          expect(localStorageService.set).to.have.been.calledWith(mockResource.key, mockResource);
        });

      $rootScope.$digest();
    });

  });

  describe('get', function () {

    it('should get the resource data with the key', function () {
      localStorageService.get.withArgs(mockResource.key).returns(mockResource);
      resourceService.get(mockResource.key)
        .then((response) => {
          expect(response).to.eql(mockResource);
        });

      $rootScope.$digest();
    });

  });

  describe('getAll', function () {

    it('should return an array of resources', function () {
      localStorageService.keys.returns(['one', 'two', 'three']);
      localStorageService.get.withArgs('one').returns({ 'one': 'key' });
      localStorageService.get.withArgs('two').returns({ 'two': 'key' });
      localStorageService.get.withArgs('three').returns({ 'three': 'key' });
      resourceService.getAll()
        .then((response) => {
          expect(response).to.eql([
            { 'one': 'key' },
            { 'two': 'key' },
            { 'three': 'key' }
          ]);
        });

      $rootScope.$digest();
    });

  });

  describe('getKeys', function () {

    it('should return an object of all the stored resources', function () {
      const returnValue = {
        one: 'this',
        was: 'stored',
        in: 'the',
        storage: 'location'
      };
      localStorageService.keys.returns(returnValue);
      resourceService.getKeys()
        .then((response) => {
          expect(response).to.eql(returnValue);
        });

      $rootScope.$digest();
    });

  });

  describe('remove', function () {

    it('should delete the data for the key in localStorage', function () {
      resourceService.remove(mockResource.key)
        .then((response) => {
          expect(localStorageService.remove).to.have.been.calledOnce;
          expect(localStorageService.remove).to.have.been.calledWith(mockResource.key);
        });

      $rootScope.$digest();
    });

  });

});
