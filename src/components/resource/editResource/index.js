import angular from 'angular';
import EditResourceComponent from './editResource.component';
import ResourceService from '../resource.service';
import eventNames from '../../../utils/eventNames';

export default angular.module('app.components.resource.edit', [
  ResourceService,
])
  .component('editResource', EditResourceComponent)
  .constant('eventNames', eventNames)
  .name;
