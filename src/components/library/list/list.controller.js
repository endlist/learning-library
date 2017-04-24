let LibraryListControllerClass;
export default class LibraryListController {

  constructor (
    $state,
    $scope,
    $rootScope,
    ResourceService,
    eventNames,
    NgTableParams,
    $filter
  ) {
    LibraryListControllerClass = this;
    this.$rootScope = $rootScope;
    this.eventNames = eventNames;
    this.$filter = $filter;
    this.resourceSvc = ResourceService;
    this.resources = new NgTableParams({
      sorting: { title: 'asc' },
      page: 1,
    }, {
      counts: [],
      total: 1,
      getData: this.getResources
    });

    $scope.$on(eventNames.lsSet, (event, val) => {
      this.resources.reload();
    });

    $scope.$on(eventNames.lsRemove, (event, val) => {
      this.resources.reload();
    });
  }

  sortData ({ data, params }) {
    return params.sorting()
      ? LibraryListControllerClass.$filter('orderBy')(data, params.orderBy())
      : data;
  }

  filterData ({ data, params }) {
    return params.filter() && params.filter() !== ''
      ? LibraryListControllerClass.$filter('filter')(
        data, params.filter()
      ) : data;
  }

  getResources (params) {
    return LibraryListControllerClass.resourceSvc.getAll()
      .then((resources) => {
        let data = angular.copy(resources);
        const sortedData = LibraryListControllerClass
          .sortData({ data, params });
        const filteredData = LibraryListControllerClass
          .filterData({ data: sortedData, params });
        return filteredData;
      });
  }

}
