import editResource from './index';
import editResourceController from './editResource.controller';

describe('EditResource', function () {

  describe('editResourceController', function () {
    let $controller,
      controller,
      $rootScope,
      sandbox,
      clock,
      ResourceService,
      eventNames;
    const now = Date.now();

    beforeEach(angular.mock.module(editResource));

    beforeEach(inject(function (
      $injector,
      _eventNames_,
      _ResourceService_,
    ) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      ResourceService = _ResourceService_;
      eventNames = _eventNames_;
      controller = $controller(editResourceController,
        {
          $rootScope: $rootScope,
          eventNames: eventNames,
          ResourceService: ResourceService,
        },
      );
      controller.resource = {};
    }));

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      clock = sinon.useFakeTimers(now);
      sandbox.stub(ResourceService, 'upsert').returnsPromise().resolves('');
    });

    afterEach(function () {
      sandbox.restore();
      clock.restore();
    });

    describe('submit', function () {

      beforeEach(function () {
        sandbox.spy($rootScope, '$broadcast');
        controller.submit();
      });

      it('should set dateUpdated to current time', function () {
        expect(controller.resource.dateUpdated).to.equal(now);
      });

      it('should call upsert on ResourceService to store the data to localStorage', function () {
        expect(ResourceService.upsert).to.have.been.calledOnce;
        expect(ResourceService.upsert).to.have.been.calledWith(controller.resource);
      });

      it('should $broadcast the set event on $rootScope on success', function () {
        expect($rootScope.$broadcast).to.have.been.calledOnce;
        expect($rootScope.$broadcast).to.have.been.calledWith(eventNames.lsSet);
      });

    });

  });

});
