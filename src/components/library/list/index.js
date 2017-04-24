import angular from 'angular';
import uirouter from 'angular-ui-router';
import { ngTableModule } from 'ng-table/bundles/ng-table';

import LibraryListComponent from './list.component';
import eventNames from '../../../utils/eventNames';
import ResourceService from '../../resource/resource.service';
import LibraryListStyles from './list.css';

export default angular.module('app.components.library.list', [
  uirouter,
  ngTableModule.name,
  ResourceService,
])
  .component('libraryList', LibraryListComponent)
  .constant('eventNames', eventNames)
  .name;
