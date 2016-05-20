'use strict';

angular.module('config', [])
  .constant('ENV', {

    'name': 'development',
    'apiEndpoint': 'http://www.adopteitor.local:8080',
    //'apiEndpoint': 'http://adopteitor.mutantlab.com.ar:8080',
    //'apiEndpoint': 'http://adopteitor.mutantlab.com.ar:8080',
    'mainDomain': ''

  });

  adopteitorApp.config(function($httpProvider) {
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });

  adopteitorApp.config(function($locationProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
  });
