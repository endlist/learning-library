import angular from 'angular';
import LocalStorage from 'angular-local-storage';

class Resource {

  constructor (localStorageService, $q) {
    this.ls = localStorageService;
    this.$q = $q;
  }

  upsert (resource) {
    return this.$q((resolve, reject) => {
      if (!resource || !resource.hasOwnProperty('key')) {
        return reject('Resource Key Required');
      }
      resource.imgUrl = `img/sprite.svg#${resource.type}`;
      return resolve(this.ls.set(resource.key, resource));
    });
  }

  get (key) {
    return this.$q((resolve, reject) => {
      return resolve(this.ls.get(key));
    });
  }

  getAll () {
    return this.$q((resolve, reject) => {
      return this.getKeys()
        .then((keys) => {
          const resources = [];
          keys.map((val) => {
            this.get(val)
              .then((resource) => {
                resources.push(resource);
              });
          });
          return resolve(resources);
        });
    });
  }

  getKeys () {
    return this.$q((resolve, reject) => {
      return resolve(this.ls.keys());
    });
  }

  remove (key) {
    return this.$q((resolve, reject) => {
      resolve(this.ls.remove(key));
    });
  }

}

export default angular.module('services.resource', [
  LocalStorage
])
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('learnlib')
      .setNotify(false, false);
  })
  .service('ResourceService', Resource)
  .name;
