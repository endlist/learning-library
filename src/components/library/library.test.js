import library from './index';
import libraryController from './library.controller';

describe('Library', function () {

  describe('LibraryController', function () {
    let $controller,
      controller,
      $state,
      sandbox;

    beforeEach(angular.mock.module(library));

    beforeEach(inject(function (
      $injector,
      _$state_,
    ) {
      $controller = $injector.get('$controller');
      $state = _$state_;
    }));

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      controller = $controller(
        libraryController,
        {
          $state: $state,
        }
      );
    });

    afterEach(function () {
      sandbox.restore();
    });

    describe('constructor', function () {

      it('should set the initial view to list view', function () {
        expect(controller.view).to.exist;
        expect(controller.view).to.eql('list');
      });

    });

    describe('setView', function () {

      const newSubView = 'new value';

      beforeEach(function () {
        $state.go = sandbox.stub();
        controller.setView(newSubView);
      });

      it('should set the view to the given value', function () {
        expect(controller.view).to.eql(newSubView);
      });

      it('should redirect the view to the new view', function () {
        expect($state.go).to.have.been.calledOnce;
        expect($state.go).to.have.been.calledWith(`library.${newSubView}`);
      });

    });

    describe('getView', function () {

      const newViewVal = 'anything this is set to';

      beforeEach(function () {
        controller.view = newViewVal;
      });

      it('should return the view value on the controller', function () {
        const response = controller.getView();
        expect(response).to.eql(newViewVal);
      });

    });

  });

});
