import removeResource from './index';
import removeResourceController from './removeResource.controller';

describe('Remove Resource Component', function () {

  describe('RemoveResourceController', function () {
    let $controller,
      controller,
      $rootScope,
      eventNames,
      sandbox,
      ResourceService;
    const mockResources = [
      { 'one': 'key' },
      { 'two': 'key' },
      { 'three': 'key' }
    ];

    beforeEach(angular.mock.module(removeResource));

    beforeEach(inject(function (
      $injector,
      _eventNames_,
      _ResourceService_,
    ) {
      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      ResourceService = _ResourceService_;
      eventNames = _eventNames_;
    }));

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      sandbox.spy($rootScope, '$broadcast');
      controller = $controller(
        removeResourceController,
        {
          $rootScope: $rootScope,
          ResourceService: ResourceService,
          eventNames: eventNames,
        }
      );
      ResourceService.getAll = sandbox.stub().returnsPromise()
        .resolves(mockResources);
      ResourceService.remove = sandbox.stub().returnsPromise()
        .resolves('');
    });

    afterEach(function () {
      sandbox.restore();
    });

    describe('removeItem', function () {

      const mockResource = { key: 'some key' };
      beforeEach(function () {
        controller.resource = mockResource;
      });

      it('should call remove on ResourceService to remove the kvp from localStorage', function () {
        controller.removeItem();
        expect(ResourceService.remove).to.have.been.calledWith(mockResource.key);
      });

      it('should call $broadcast on $rootScope if successful', function () {
        $rootScope.$broadcast.reset();
        controller.removeItem();

        expect($rootScope.$broadcast).to.have.been.calledOnce;
        expect($rootScope.$broadcast).to.have.been.calledWith(eventNames.lsRemove);
      });

    });

  });

});
