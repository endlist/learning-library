export default class EditResourceController {

  constructor ($rootScope, ResourceService, eventNames) {
    this.resourceSvc = ResourceService;
    this.eventNames = eventNames;
    this.$rootScope = $rootScope;
  }

  submit () {

    this.resource.dateUpdated = Date.now();

    return this.resourceSvc.upsert(this.resource)
      .then(() => {
        this.$rootScope.$broadcast(this.eventNames.lsSet, this.resource);
      });

  }

}
