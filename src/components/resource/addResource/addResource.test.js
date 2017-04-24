import addResource from './index';
import addResourceController from './addResource.controller';

describe('AddResource', function () {

  describe('addResourceController', function () {
    let $controller,
      controller,
      sandbox,
      clock,
      eventNames,
      uuid,
      ResourceService,
      $rootScope;
    const now = Date.now();
    const mockUuid = 'some string';
    const mockResource = {
      type: 'this is some type',
      key: 'some key',
      title: 'a title',
      notes: 'there are notes',
      link: 'http://url.com',
    };

    beforeEach(angular.mock.module(addResource));

    beforeEach(inject(function (
      $injector,
      _uuid_,
      _eventNames_,
      _ResourceService_,
    ) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      ResourceService = _ResourceService_;
      eventNames = _eventNames_;
      uuid = _uuid_;
    }));

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      clock = sinon.useFakeTimers(now);
      sandbox.stub(uuid, 'v4').returns(mockUuid);
      sandbox.stub(ResourceService, 'upsert').returnsPromise().resolves('');
      controller = $controller(addResourceController,
        {
          $rootScope: $rootScope,
          uuid: uuid,
          ResourceService: ResourceService,
          eventNames: eventNames,
        },
      );
    });

    afterEach(function () {
      sandbox.restore();
      clock.restore();
    });

    describe('constructor', function () {

      it('should set a uuid on resource on initialization', function () {
        expect(controller.resource.key).to.equal(mockUuid);
      });

      // TODO: move the constant
      it('should set the default type to \'Book\'', function () {
        expect(controller.resource.type).to.equal('Book');
      });

    });

    describe('submit', function () {

      let newMockUuid = 'a new key';

      beforeEach(function () {
        sandbox.spy($rootScope, '$broadcast');
        uuid.v4.returns(newMockUuid);
        controller.resource = mockResource;
        controller.submit();
      });

      it('should reset resource options to defaults after submit', function () {
        expect(controller.resource.dateUpdated).to.equal('');
        expect(controller.resource.title).to.equal('');
        expect(controller.resource.link).to.equal('');
        expect(controller.resource.notes).to.equal('');
      });

      it('should assign new key', function () {
        expect(controller.resource.key).to.equal(newMockUuid);
      });

      it('should not reassign type', function () {
        expect(controller.resource.type).to.equal(mockResource.type);
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
