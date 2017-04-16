import angular from 'angular';
import LibraryComponent from './library.component';
import LibraryListComponent from './libraryList';
import LibraryListResourceComponent from './libraryListResource';

export default angular.module('app.components.library', [
  LibraryListComponent,
  LibraryListResourceComponent
])
  .component('library', LibraryComponent)
  .name;
