import cards from './index';
import cardsController from './cards.controller';

describe('Library Cards View', function () {

  describe('LibraryCardsController', function () {
    let $controller,
      controller,
      $scope,
      $rootScope,
      sandbox,
      eventNames,
      ResourceServiceMock;
    const mockResources = [
      { 'one': 'key' },
      { 'two': 'key' },
      { 'three': 'key' }
    ];

    beforeEach(angular.mock.module(cards));

    beforeEach(inject(function (
      $injector,
      _eventNames_,
    ) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      eventNames = _eventNames_;
      ResourceServiceMock = {
        getAll: sinon.stub().returnsPromise().resolves(mockResources)
      };
    }));

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      $scope = $rootScope.$new();
      controller = $controller(
        cardsController,
        {
          $scope: $scope,
          eventNames: eventNames,
          ResourceService: ResourceServiceMock
        }
      );
      sandbox.spy(controller, 'updateResources');
    });

    afterEach(function () {
      sandbox.restore();
    });

    describe('constructor', function () {

      it('should get all the stored resources on startup', function () {
        expect(ResourceServiceMock.getAll).to.have.been.calledOnce;
      });

      it('should store the resources on the controller', function () {
        expect(controller.resources).to.exist;
        expect(controller.resources).to.eql(mockResources);
      });

      it('should set up a $scope listener for lsSet event to update resources', function () {
        $scope.$emit(eventNames.lsSet);
        expect(controller.updateResources).to.have.been.calledOnce;
      });

      it('should set up a $scope listener for lsRemove event to update resources', function () {
        $scope.$emit(eventNames.lsRemove);
        expect(controller.updateResources).to.have.been.calledOnce;
      });

    });

    describe('updateResources', function () {

      it('should update local resources with new value', function () {
        const newVal = 'any value';
        ResourceServiceMock.getAll.resolves(newVal);
        controller.updateResources();
        expect(controller.resources).to.eql(newVal);
      });

    });

  });

});
