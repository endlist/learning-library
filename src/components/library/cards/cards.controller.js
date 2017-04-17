export default class LibraryCardsController {

  constructor (
    ResourceService,
    $scope,
    eventNames,
  ) {
    this.resources = null;
    this.resourceSvc = ResourceService;
    this.updateResources();
    console.log(this.resources);

    $scope.$on(eventNames.lsSet, (event, val) => {
      this.updateResources();
    });

    $scope.$on(eventNames.lsRemove, (event, val) => {
      this.updateResources();
    });

  }

  updateResources () {
    this.resourceSvc.getAll()
      .then((resources) => {
        this.resources = resources;
      });
  }

}
