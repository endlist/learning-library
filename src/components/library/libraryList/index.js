import angular from 'angular'
import LibraryListComponent from './libraryList.component'

export default angular.module('app.components.library.list', [])
  .component('libraryList', LibraryListComponent)
  .name;
