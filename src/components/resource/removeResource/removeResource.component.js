import RemoveResourceComponent from './removeResource.controller';

export default {
  template: require('./removeResource.html'),
  controller: RemoveResourceComponent,
  bindings: {
    resource: '<'
  }
};
