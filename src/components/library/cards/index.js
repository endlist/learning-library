import angular from 'angular';
import LibraryCardsComponent from './cards.component';
import LibraryCardsStyles from './cards.css';

import eventNames from '../../../utils/eventNames';

export default angular.module('app.components.library.cards', [
])
  .component('libraryCards', LibraryCardsComponent)
  .constant('eventNames', eventNames)
  .name;
