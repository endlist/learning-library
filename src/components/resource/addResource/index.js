import angular from 'angular';
import 'angular-uuid';

import AddResourceComponent from './addResource.component';
import ResourceService from '../resource.service';
import eventNames from '../../../utils/eventNames';

export default angular.module('app.components.resource.add', [
  'angular-uuid',
  ResourceService,
])
  .component('addResource', AddResourceComponent)
  .constant('eventNames', eventNames)
  .name;
