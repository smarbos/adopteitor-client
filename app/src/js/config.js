// 'use strict';

angular.module('config', [])
  .constant('ENV', {

    'name': 'produccion',
    'apiEndpoint': 'https://www.adoptaungalgoenargentina.com:8080',
    'currentDomain': 'https://www.adoptaungalgoenargentina.com'

    //'name': 'development',
    //'apiEndpoint': 'http://www.adopteitor.local:8080',
    //'currentDomain': 'http://adopteitor.local'

  });

//------------------------------------------------------------------------------------------------------------//

function config($httpProvider, $locationProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}
config.$inject = ['$httpProvider', '$locationProvider', '$resourceProvider'];
adopteitorApp.config(config);

//------------------------------------------------------------------------------------------------------------//
