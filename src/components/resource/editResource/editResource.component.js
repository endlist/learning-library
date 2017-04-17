import EditResourceController from './editResource.controller';

export default {
  template: require('./editResource.html'),
  controller: EditResourceController,
  bindings: {
    resource: '<'
  }
};
