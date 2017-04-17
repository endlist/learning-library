import angular from 'angular';
import ResourceService from './resource.service';
import AddResourceComponent from './addResource';
import EditResourceComponent from './editResource';
import RemoveResourceComponent from './removeResource';
import ResourceStyles from './resource.css';

export default angular.module('app.components.resource', [
  ResourceService,
  AddResourceComponent,
  EditResourceComponent,
  RemoveResourceComponent,
])
  .name;
