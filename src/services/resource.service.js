import angular from 'angular';
import LocalStorage from 'angular-local-storage';

class Resource {
  constructor() {
  }
}

export default angular.module('services.resource', [
  LocalStorage
])
  .service('resource', Resource)
  .name;
