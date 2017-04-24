import angular from 'angular';
import { ngTableModule } from 'ng-table/bundles/ng-table';
import uirouter from 'angular-ui-router';

import LibraryComponent from './library.component';
import LibraryListComponent from './list';
import LibraryCardsComponent from './cards';

import eventNames from '../../utils/eventNames';
import ResourceService from '../resource/resource.service';

export default angular.module('app.components.library', [
  uirouter,
  ngTableModule.name,
  ResourceService,
  LibraryListComponent,
  LibraryCardsComponent,
])
  .component('library', LibraryComponent)
  .constant('eventNames', eventNames)
  .name;
