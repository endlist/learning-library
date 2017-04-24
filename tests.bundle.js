require('angular');
require('angular-mocks');

const context = require.context('.', true, /src\/.+\.test\.js$/);
context.keys().forEach(context);
