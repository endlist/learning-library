import angular from 'angular';
import Resource from './resource';
import LibraryComponent from './library';
import routing from './app.routes';

export default angular.module('app.components', [
  Resource,
  LibraryComponent,
])
  .config(routing)
  .name;
