import angular from 'angular';

import RemoveResourceComponent from './removeResource.component';
import eventNames from '../../../utils/eventNames';
import ResourceService from '../resource.service';

export default angular.module('app.components.resource.remove', [
  ResourceService,
])
  .component('removeResource', RemoveResourceComponent)
  .constant('eventNames', eventNames)
  .name;
