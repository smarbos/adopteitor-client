// 'use strict';

//------------------------------------------------------------------------------------------------------------//

function enAdopcion($resource, ENV){
    return $resource(ENV.apiEndpoint+'/Animal/', {galgo_estado:1}, {'query':{method: 'GET', isArray: true}});
}
enAdopcion.$inject = ['$resource', 'ENV'];
adopteitorApp.factory('enAdopcion', enAdopcion);

//------------------------------------------------------------------------------------------------------------//

function allAnimalsFilter($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/',
        {filter:'@filter'},
        {'query':{method: 'GET', isArray: true}}
    );
}
allAnimalsFilter.$inject = ['$resource', 'ENV'];
adopteitorApp.factory('allAnimalsFilter', allAnimalsFilter);

//------------------------------------------------------------------------------------------------------------//

function enAdopcionFilter($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/?galgo_estado=1&:filter/',
        {filter:'@filter'},
        {'query':{method: 'GET', isArray: true}}
    );
}
enAdopcionFilter.$inject = ['$resource', 'ENV'];
adopteitorApp.factory('enAdopcionFilter', enAdopcionFilter);

//------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------//

function finalesFelicesFilter($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/',
        {filter:'@filter', galgo_estado:3},
        {'query':{method: 'GET', isArray: true}}
    );
}
finalesFelicesFilter.$inject = ['$resource', 'ENV'];
adopteitorApp.factory('finalesFelicesFilter', finalesFelicesFilter);

//------------------------------------------------------------------------------------------------------------//

function getAnimalByID($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/:id/',
        {id:'@id'},
        {'query':{method: 'GET', isArray: false}}
    );
}
getAnimalByID.$inject = ['$resource', 'ENV'];
adopteitorApp.factory('getAnimalByID', getAnimalByID);

//------------------------------------------------------------------------------------------------------------//

function getAnimalByGenero($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/:genero/',
        {genero:'@genero'},
        {'query':{method: 'GET', isArray: false}}
    );
}
getAnimalByGenero.$inject = ['$resource', 'ENV'];
adopteitorApp.factory('getAnimalByGenero', getAnimalByGenero);

//------------------------------------------------------------------------------------------------------------//

function FormularioAdopcionFactory($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/FormularioAdopcion/',
        {id:'@id'},
        {'query':{method: 'POST', isArray: false},
        'update':
        { method:'PUT' }
    }
);
}
FormularioAdopcionFactory.$inject = ['$resource', 'ENV'];
adopteitorApp.factory('FormularioAdopcionFactory', FormularioAdopcionFactory);

//------------------------------------------------------------------------------------------------------------//

function Authentication($cookies, $http, ENV, $log) {
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
      $log.error('Epic failure!');
    }
  }

    function login(email, password) {
        return $http.post(ENV.apiEndpoint+'/login/', {
            email: email, password: password
        }).then(loginSuccessFn, loginErrorFn);

        function loginSuccessFn(data, status, headers, config) {
            Authentication.setAuthenticatedAccount(data.data);
            // window.location = '/';
            $log.debug(data.data);
        }

        function loginErrorFn(data, status, headers, config) {
            $log.error('Epic failure!');
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
        $log.error('Epic failure!');
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
}
Authentication.$inject = ['$cookies', '$http', 'ENV', '$log']
adopteitorApp.factory('Authentication', Authentication);

//------------------------------------------------------------------------------------------------------------//

function sliderService($log) {

    var status;

    this.updateStatus = function (newStatus) {
        status = newStatus;
        return status;
    }

    this.checkStatus = function () {
        $log.debug('sliderService Status: '+status);
        return status;
    }
}
sliderService.$inject = ['$log']
adopteitorApp.service('sliderService', sliderService);

//------------------------------------------------------------------------------------------------------------//

function body($scope, $location, enAdopcion, ENV, sliderService, $rootScope, $document) {
    $rootScope.$on('$stateChangeSuccess', function() {
       $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
    });
    $rootScope.$on('checkSliderStatus', function(event, mass) {
         $scope.showSlider = sliderService.checkStatus();
     });
}
body.$inject = ['$scope', '$location', 'enAdopcion', 'ENV', 'sliderService', '$rootScope', '$document'];
adopteitorApp.controller('body', body);

//------------------------------------------------------------------------------------------------------------//

function home($scope, $location, enAdopcion, ENV, sliderService) {
    sliderService.updateStatus(true);
    $scope.$emit('checkSliderStatus');
}
home.$inject = ['$scope', '$location', 'enAdopcion', 'ENV', 'sliderService'];
adopteitorApp.controller('home', home);

//------------------------------------------------------------------------------------------------------------//

function notFound($scope, $location, $stateParams, ENV, sliderService) {

    // sliderService.updateStatus(false);
    // $log.debug("XX");
    // $scope.$emit('checkSliderStatus');
    // $scope.$apply();
}
notFound.$inject = ['$scope', '$location', '$stateParams', 'ENV', 'sliderService'];
adopteitorApp.controller('notFound', notFound);

//------------------------------------------------------------------------------------------------------------//

function maintenance($scope, $location, $stateParams, ENV, sliderService, $log) {

    // sliderService.updateStatus(false);
    $log.debug("maintenance");
    // $scope.$emit('checkSliderStatus');
    // $scope.$apply();
}
maintenance.$inject = ['$scope', '$location', '$stateParams', 'ENV', 'sliderService', '$log'];
adopteitorApp.controller('maintenance', maintenance);
//------------------------------------------------------------------------------------------------------------//
function animalByID($scope, $location, getAnimalByID, $stateParams, ENV, sliderService, enAdopcionFilter, $log) {

    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.currentDomain = ENV.currentDomain;
    $scope.animalByID = getAnimalByID.query({},{'id': $stateParams.id});
    $scope.animalByID.$promise.then(function(data) {
        $scope.animal = data;
        $scope.currentImage = $scope.animal.fotos[0];

        if($scope.animal['genero']=='m'){
            $scope.genero = "m";
        }
        else{
            $scope.genero = "h"
        }


    }, function(error) {
        $log.debug('error', error);
    }
    );

    $scope.allAnimals = enAdopcionFilter.query({},{'filter': "*"});
    $scope.allAnimals.$promise.then(function(data) {

        $scope.totalAnimalAmount = data.length;
    }, function(error) {
        $log.debug('error', error);
    }
    );
    // $scope.currentImage = $scope.animal.fotos[0];


    $scope.showImage = function(image) {
        $scope.currentImage = image;
    }

}
animalByID.$inject = ['$scope', '$location', 'getAnimalByID', '$stateParams', 'ENV', 'sliderService', 'enAdopcionFilter', '$log'];
adopteitorApp.controller('animalByID', animalByID);

//------------------------------------------------------------------------------------------------------------//

function register($location, $scope, Authentication) {
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
register.$inject = ['$location', '$scope', 'Authentication'];
adopteitorApp.controller('register', register);

//------------------------------------------------------------------------------------------------------------//

function LoginController($location, $scope, Authentication, $cookies) {

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
LoginController.$inject = ['$location', '$scope', 'Authentication', '$cookies'];
adopteitorApp.controller('LoginController', LoginController);

//------------------------------------------------------------------------------------------------------------//

function MainMenuController($scope, Authentication, $cookies) {
    var vm = this;
    vm.logout = logout;

    function logout() {
      Authentication.logout();
    }
}
MainMenuController.$inject = ['$scope', 'Authentication', '$cookies'];
adopteitorApp.controller('MainMenuController', MainMenuController);

//------------------------------------------------------------------------------------------------------------//
