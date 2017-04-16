import angular from 'angular'
import HomeComponent from './home'
import AddResourceComponent from './addResource'
import LibraryComponent from './library'

export default angular.module('app.components', [
  HomeComponent,
  AddResourceComponent,
  LibraryComponent,
])
  .name;
