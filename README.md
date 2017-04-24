# learning-library

[Demo](http://endlist.github.io/learning-library/)

This app manages a library of resources for a user, stored to localStorage.  It uses `ui-router` to manage view changes, and `ng-table` to add filtering and sorting to the table view.

## Development

If you would like to run this locally and develop against it run:

```sh
git clone https://github.com/endlist/learning-library.git
cd learning-library
npm install
npm start
```

This should start the project in development mode using `webpack-dev-server` on `http://localhost:8080/`.

### Testing

Test stack is mocha/karma/chai/sinon with associated promise handling libraries, and should run with `npm test`.

### Deployment

Deployment uses `gh-pages`.  Run `npm run deploy` to build the project and deploy to the `gh-pages` branch on Github.

## Notes
* I chose to allow duplicate entries so that multiple copies of books or websites with the same title would not conflict.  At the moment each resource has a secret uuid assigned to it as a unique key to keep track of the unique entry and there are no checks for duplicates.
* [This issue](https://github.com/angular/angular.js/issues/14240) requires Babel to be transpiled into ES5 instead of ES6, otherwise everything breaks on Firefox, IE, and Safari.  Since I was already transpiling, this made more sense than to use than the `$$ngIsClass` hack.
* There's no way to edit the type of a resource.  Not hard to add with the current setup a shared model between the types that currently only includes options that all types can have.  But my original idea was to have components for each type that could also manage media or other functionality in specific ways, which would make changing types not make sense in the future, which is why it's not an option currently.  I went with a default type for quick use (assuming 'books' are the most common use case, that would require user data), but it might make more sense to make it a force selection if people are forgetting to set the type before creation.  It is 'sticky' per usage, so if a user wants to create 20 podcasts they can change it and it should stay on 'podcasts' until they close the overlay.

## Known Issues

* Add/Edit resource will flip the library view back to the default list view.  Waiting on `sticky-states` update to work with ui-router 1.0.0.
* The overlay for add/edit is not a true modal and won't dismiss on click outside.
* There are some issues with the way `ng-table` handles the promise to grab data changing the context.  Solved this for now by explicitly stating context to use internal functions, but I'd like to find a more elegant solution.
* Filtering seems slow, needs optimization.
* Move off eventing to central state model (spike on Redux).

## Future Features

* Better design.
* More permanent data storage.
* Filtering/Sorting for card view
* More types (video, music, games, apps)
* Media uploads
* Favorite resources
* Collections
* Tags
* Social media sharing integration
* Automated builds on push to master
