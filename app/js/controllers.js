'use strict';


adopteitorApp.factory('enAdopcion', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/Animal/', null, {'query':{method: 'GET', isArray: true}});
}]);

adopteitorApp.factory('enAdopcionFilter', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/?:filter/',
        {filter:'@filter'},
        {'query':{method: 'GET', isArray: true}}
    );
}]);

adopteitorApp.factory('getAnimalByID', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/:id/',
        {id:'@id'},
        {'query':{method: 'GET', isArray: false}}
    );
}]);

adopteitorApp.factory('getAnimalByGenero', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/:genero/',
        {genero:'@genero'},
        {'query':{method: 'GET', isArray: false}}
    );
}]);

adopteitorApp.factory('FormularioAdopcionFactory', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/FormularioAdopcion/',
        {id:'@id'},
        {'query':{method: 'POST', isArray: false},
        'update':
        { method:'PUT' }
    }
);
}]);

adopteitorApp.factory('Authentication', ['$cookies', '$http', 'ENV', function Authentication($cookies, $http, ENV) {
  var Authentication = {
    getAuthenticatedAccount: getAuthenticatedAccount,
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
    register: register,
    setAuthenticatedAccount: setAuthenticatedAccount,
    unauthenticate: unauthenticate
  };
  return Authentication;

  function register(email, password, username) {
    return $http.post(ENV.apiEndpoint+'/accounts/', {
      username: username,
      password: password,
      email: email
    }).then(registerSuccessFn, registerErrorFn);

    /**
    * @name registerSuccessFn
    * @desc Log the new user in
    */
    function registerSuccessFn(data, status, headers, config) {
      Authentication.login(email, password);
    }

    function registerErrorFn(data, status, headers, config) {
      console.error('Epic failure!');
    }
  }

    function login(email, password) {
        return $http.post(ENV.apiEndpoint+'/login/', {
            email: email, password: password
        }).then(loginSuccessFn, loginErrorFn);

        function loginSuccessFn(data, status, headers, config) {
            Authentication.setAuthenticatedAccount(data.data);
            // window.location = '/';
            console.log(data.data);
        }

        function loginErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }
    }

    function logout() {
      return $http.post(ENV.apiEndpoint+'/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();

        window.location = '/';
      }

      function logoutErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }

  function getAuthenticatedAccount() {
    if (!$cookies.authenticatedAccount) {
      return;
    }

    return JSON.parse($cookies.authenticatedAccount);
  }

  function isAuthenticated() {
    return !!$cookies.authenticatedAccount;
  }

  function setAuthenticatedAccount(account) {
    $cookies.authenticatedAccount = JSON.stringify(account);
  }

  function unauthenticate() {
    delete $cookies.authenticatedAccount;
  }
}]);




adopteitorApp.service('sliderService', function() {

    var status;

    this.updateStatus = function (newStatus) {
        status = newStatus;
        console.log(status);
        return status;
    }

    this.checkStatus = function () {
        console.log(status);
        return status;
    }
});

adopteitorApp.controller('body', ['$scope', '$location', 'enAdopcion', 'ENV', 'sliderService', '$rootScope', '$document',
    function ($scope, $location, enAdopcion, ENV, sliderService, $rootScope, $document) {
        $rootScope.$on('$stateChangeSuccess', function() {
           $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
           console.log("TEST");
        });
        $rootScope.$on('checkSliderStatus', function(event, mass) {
             $scope.showSlider = sliderService.checkStatus();
         });
    }
]);

adopteitorApp.controller('home', ['$scope', '$location', 'enAdopcion', 'ENV', 'sliderService',
    function ($scope, $location, enAdopcion, ENV, sliderService) {
        sliderService.updateStatus(true);
        $scope.$emit('checkSliderStatus');
    }
]);


adopteitorApp.controller('GalgosEnAdopcion', ['$scope', '$location', 'enAdopcionFilter', 'ENV', '$stateParams', 'sliderService',
    function ($scope, $location, enAdopcion, ENV, $stateParams, sliderService) {

        //Give current filtering option to mark it as active in the menu//
        $scope.currentFilter = $stateParams.filter;

        sliderService.updateStatus(false);
        $scope.$emit('checkSliderStatus');
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        var filter;
        switch ($stateParams.filter) {
            case "a":
                filter = "galgo_etapa=a";
                break;
            case "c":
                filter = "galgo_etapa=c";
                break;
            case "h":
                filter = "galgo_genero=h";
                break;
            case "m":
                filter = "galgo_genero=m";
                break;
        }
              $scope.galgosEnAdopcion = enAdopcion.query({},{'filter': filter});
              $scope.galgosEnAdopcion.$promise.then(function(data) {
                  $scope.galgosEnAdopcionRes = data.results;
              });
              $scope.apiEndpoint = ENV.apiEndpoint;
              $scope.params = $stateParams;

    }
]);

adopteitorApp.controller('animalByID', ['$scope', '$location', 'getAnimalByID', '$stateParams', 'ENV', 'sliderService', 'enAdopcionFilter',
    function ($scope, $location, getAnimalByID, $stateParams, ENV, sliderService, enAdopcionFilter) {

        sliderService.updateStatus(false);
        $scope.$emit('checkSliderStatus');
        $scope.apiEndpoint = ENV.apiEndpoint;
        $scope.animalByID = getAnimalByID.query({},{'id': $stateParams.id});
        $scope.animalByID.$promise.then(function(data) {

            $scope.animal = data;
            $scope.currentImage = $scope.animal.fotos[0];
            if($scope.animal['genero']=='m'){
                $scope.animal.genero = 'macho';
                $scope.genero = "m";
            }
            else{
                $scope.animal.genero = 'hembra';
                $scope.genero = "h"
            }
        }, function(error) {
            console.log('error', error);
        }
        );

        $scope.allAnimals = enAdopcionFilter.query({},{'filter': "*"});
        $scope.allAnimals.$promise.then(function(data) {

            $scope.totalAnimalAmount = data.length;
        }, function(error) {
            console.log('error', error);
        }
        );
        // $scope.currentImage = $scope.animal.fotos[0];


        $scope.showImage = function(image) {
            $scope.currentImage = image;
        }

    }
]);

adopteitorApp.controller('register', ['$location', '$scope', 'Authentication',
    function ($location, $scope, Authentication) {
      var vm = this;

      vm.register = register;

      function register() {
        Authentication.register(vm.email, vm.password, vm.username);
      }

      activate();

        function activate() {
          // If the user is authenticated, they should not be here.
          if (Authentication.isAuthenticated()) {
            $location.url('/');
          }
        }
    }
]);

adopteitorApp.controller('LoginController', ['$location', '$scope', 'Authentication', '$cookies',
    function ($location, $scope, Authentication, $cookies) {

        $scope.cookieData = $cookies.getAll();
      var vm = this;

      vm.login = login;

      activate();

      function activate() {
        // If the user is authenticated, they should not be here.
        if (Authentication.isAuthenticated()) {
          $location.url('/');
        }
      }

      function login() {
        Authentication.login(vm.email, vm.password);
      }
    }
]);

adopteitorApp.controller('MainMenuController', ['$scope', 'Authentication', '$cookies',
    function ($scope, Authentication, $cookies) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      Authentication.logout();
    }
    }
]);
