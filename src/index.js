import angular from 'angular';
import 'angular-uuid';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import { ngTableModule } from 'ng-table/bundles/ng-table';
import 'ng-table/bundles/ng-table.min.css';
import 'angular-moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './public/img/sprite.svg';
import components from './components';
import eventNames from './utils/eventNames';

angular.module('app', [
  uirouter,
  components,
  'angular-uuid',
  'angularMoment',
  ngTableModule.name,
])
  .config(routing)
  .constant('eventNames', eventNames);
