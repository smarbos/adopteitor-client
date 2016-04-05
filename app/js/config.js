'use strict';

angular.module('config', [])
  .constant('ENV', {

    'name': 'development',
    'apiEndpoint': 'http://www.adopteitor.local:8080',
    //'apiEndpoint': 'http://adopteitor.mutantlab.com.ar:8080',
    //'apiEndpoint': 'http://adopteitor.mutantlab.com.ar:8080',

  });
