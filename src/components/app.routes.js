export default function AppRoutes (
  $stateProvider,
) {
  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'header': {
          template: require('./header/header.html'),
        },
        'interaction': {
          template: `<ui-view/>`,
        },
        'library': {
          component: 'library',
        }
      },
    })
    .state('library', {
      parent: 'home',
      url: 'library/',
      abstract: true,
    })
    .state('library.list', {
      url: 'list/',
      views: {
        'libraryView@home': {
          component: 'libraryList'
        }
      }
    })
    .state('library.cards', {
      url: 'cards/',
      views: {
        'libraryView@home': {
          component: 'libraryCards'
        }
      }
    })
    .state('resource', {
      parent: 'home',
      abstract: true,
      url: 'resource/',
      views: {
        'interaction@home': {
          template: '<ui-view/>'
        }
      }
    })
    .state('resource.add', {
      url: 'new/',
      component: 'addResource',
    })
    .state('resource.edit', {
      url: '/edit/:resourceId',
      component: 'editResource',
      resolve: {
        resource: (ResourceService, $transition$) => {
          return ResourceService.get(
            $transition$.params().resourceId
          );
        }
      }
    });
}
