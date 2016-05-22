// 'use strict';

angular.module('config', [])
  .constant('ENV', {

    'name': 'development',
    'apiEndpoint': 'http://www.adopteitor.local:8080',
    //'apiEndpoint': 'http://adopteitor.mutantlab.com.ar:8080',
    //'apiEndpoint': 'http://adopteitor.mutantlab.com.ar:8080',
    'mainDomain': ''

  });

//------------------------------------------------------------------------------------------------------------//

function config($httpProvider, $locationProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}
config.$inject = ['$httpProvider', '$locationProvider'];
adopteitorApp.config(config);

//------------------------------------------------------------------------------------------------------------//
