export default class RemoveResourceController {

  constructor (
    ResourceService,
    $rootScope,
    eventNames,
  ) {
    this.resourceSvc = ResourceService;
    this.$rootScope = $rootScope;
    this.eventNames = eventNames;
  }

  removeItem () {
    return this.resourceSvc.remove(this.resource.key)
      .then(() => {
        this.$rootScope.$broadcast(this.eventNames.lsRemove);
      });
  }

}
