// 'use strict';

angular.module('config', [])
  .constant('ENV', {

    'name': 'produccion',
    'apiEndpoint': 'http://www.adoptaungalgoenargentina.com:8080',
    'currentDomain': 'http://www.adoptaungalgoenargentina.com'

    // 'name': 'development',
    // 'apiEndpoint': 'http://www.adopteitor.local:8080',
    // 'currentDomain': 'http://adopteitor.local'

  });

//------------------------------------------------------------------------------------------------------------//

function config($httpProvider, $locationProvider, $resourceProvider, $logProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = true;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $logProvider.debugEnabled(false);
}
config.$inject = ['$httpProvider', '$locationProvider', '$resourceProvider', '$logProvider'];
adopteitorApp.config(config);

//------------------------------------------------------------------------------------------------------------//
