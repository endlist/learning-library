import list from './index';
import listController from './list.controller';

describe('Library List View', function () {

  describe('LibraryListController', function () {
    let $controller,
      controller,
      $scope,
      $rootScope,
      $state,
      eventNames,
      $filter,
      sandbox,
      ResourceService,
      NgTableParams;
    const mockResources = [
      { 'key': 'one' },
      { 'key': 'two' },
      { 'key': 'three' }
    ];

    beforeEach(angular.mock.module(list));

    beforeEach(inject(function (
      $injector,
      _$state_,
      _eventNames_,
      _NgTableParams_,
      _$filter_,
      _ResourceService_,
    ) {
      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $state = _$state_;
      $filter = _$filter_;
      ResourceService = _ResourceService_;
      NgTableParams = _NgTableParams_;
      eventNames = _eventNames_;
    }));

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      $scope = $rootScope.$new();
      sandbox.spy($rootScope, '$broadcast');
      controller = $controller(
        listController,
        {
          $rootScope: $rootScope,
          $scope: $scope,
          ResourceService: ResourceService,
          $state: $state,
          eventNames: eventNames,
          NgTableParams: NgTableParams,
          $filter: $filter,
        }
      );
      ResourceService.getAll = sandbox.stub().returnsPromise()
        .resolves(mockResources);
      ResourceService.remove = sandbox.stub().returnsPromise()
        .resolves('');
      sandbox.spy(controller.resources, 'reload');
    });

    afterEach(function () {
      sandbox.restore();
    });

    describe('constructor', function () {

      it('should initialize resources', function () {
        expect(controller.resources).to.exist;
      });

      it('should set up a $scope listener for lsSet event to reload resources', function () {
        $scope.$emit(eventNames.lsSet);
        expect(controller.resources.reload).to.have.been.calledOnce;
      });

      it('should set up a $scope listener for lsRemove event to reload resources', function () {
        $scope.$emit(eventNames.lsRemove);
        expect(controller.resources.reload).to.have.been.calledOnce;
      });

    });

    describe('getResources', function () {

      it('should call ResourceService.getAll', function () {
        controller.getResources();
        expect(ResourceService.getAll).to.have.been.calledOnce;
      });

    });

    describe('sortData', function () {

      it('should use sorting on params if it exists to order the data', function () {
        const expectedData = [
          { 'key': 'two' },
          { 'key': 'three' },
          { 'key': 'one' }
        ];
        const params = {
          sorting: function () {
            return true;
          },
          orderBy: function () {
            return [ '-key' ];
          }
        };
        const response = controller.sortData({ data: mockResources, params });
        expect(response).to.eql(expectedData);
      });

    });

    describe('filterData', function () {

      it('should filter based on input', function () {
        const expectedData = [
          { 'key': 'three' }
        ];
        const params = {
          filter: function () {
            return { key: 'r' };
          }
        };

        const response = controller.filterData({ data: mockResources, params });
        expect(response).to.eql(expectedData);
      });

    });

  });

});
