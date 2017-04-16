import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import components from './components';


angular.module('app', [
  uirouter, 
  components
])
  .config(routing)
