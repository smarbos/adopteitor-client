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

adopteitorApp.factory('FormularioAdopcion', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/FormularioAdopcion/',
        {id:'@id'},
        {'query':{method: 'GET', isArray: false},
        'update':
        { method:'PUT' }
    }
);
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

adopteitorApp.controller('body', ['$scope', '$location', 'enAdopcion', 'ENV', 'sliderService', '$rootScope',
    function ($scope, $location, enAdopcion, ENV, sliderService, $rootScope) {
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

adopteitorApp.controller('animalByID', ['$scope', '$location', 'getAnimalByID', '$stateParams', 'ENV', 'sliderService',
    function ($scope, $location, getAnimalByID, $stateParams, ENV, sliderService) {
        sliderService.updateStatus(false);
        $scope.$emit('checkSliderStatus');
        $scope.apiEndpoint = ENV.apiEndpoint;
        $scope.animalByID = getAnimalByID.query({},{'id': $stateParams.id});
        $scope.animalByID.$promise.then(function(data) {
            $scope.animal = data;
            console.log(data);
            console.log($scope.animal['genero']);
            if($scope.animal['genero']=='m'){
                $scope.animal.genero = 'macho';
                console.log($scope.animal['genero']);
                $scope.genero = "m";
            }
            else{
                $scope.animal.genero = 'hembra';
                console.log($scope.animal['genero']);
                $scope.genero = "h"
            }
        }, function(error) {
            console.log('error', error);
        }
        );

    }
]);
