const DEFAULT_RESOURCE_TYPE = 'Book';

export default class AddResourceController {

  constructor ($rootScope, ResourceService, uuid, eventNames) {
    this.resource = {
      key: uuid.v4(),
      type: DEFAULT_RESOURCE_TYPE
    };
    this.uuid = uuid;
    this.resourceSvc = ResourceService;
    this.$rootScope = $rootScope;
    this.eventNames = eventNames;
  }

  submit () {
    this.resource.dateUpdated = Date.now();

    return this.resourceSvc.upsert(this.resource)
      .then(() => {

        this.$rootScope.$broadcast(this.eventNames.lsSet, this.resource);

        // Reset form values after success
        for (const prop in this.resource) {
          if (prop !== 'key' && prop !== 'type') {
            this.resource[prop] = '';
          }
        }
        this.resource.key = this.uuid.v4();

      });
  }

  reset (form) {
    // Reset form state
    form.$setPristine();
  }

}
