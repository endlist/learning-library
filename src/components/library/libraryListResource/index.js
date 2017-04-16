import angular from 'angular';
import LibraryListResourceComponent from './libraryListResource.component';

export default angular.module('app.components.library.resource', [])
  .directive('libraryListResource', LibraryListResourceComponent)
  .name;
