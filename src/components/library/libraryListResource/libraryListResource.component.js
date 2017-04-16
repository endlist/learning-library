import LibraryListResourceController from './libraryListResource.controller';

export default function () {
  return {
    restrict: 'A',
    template: require('./libraryListResource.html'),
    controller: LibraryListResourceController,
    controllerAs: '$ctrl',
    bindings: {
      resource: '<'
    }
  };
}
