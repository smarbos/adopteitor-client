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

adopteitorApp.factory('sliderService',[function(newStatus){

    'use strict';

    var statusSlider = [];

    statusSlider.update = function(newStatus){
        this.status = newStatus;
    }

    statusSlider.checkStatus = function(){
        angular.element(document).ready(function () {
        console.log(statusSlider.status);
        return "statusSlider";
        });
    }
    return statusSlider;

}]);

adopteitorApp.controller('body', ['$scope', '$location', 'enAdopcion', 'ENV', 'sliderService',
    function ($scope, $location, enAdopcion, ENV, sliderService) {
          //your magic here
        angular.element(document).ready(function () {
            $scope.sliderService = sliderService;
            console.log("body!");
            console.log($scope.sliderService);
            console.log($scope.showSlider);
            $scope.showSlider = sliderService;
            console.log($scope.showSlider.statusSlider);
            console.log("end body!");
            console.log(sliderService.checkStatus());
        });
    }
]);

adopteitorApp.controller('home', ['$scope', '$location', 'enAdopcion', 'ENV', 'sliderService',
    function ($scope, $location, enAdopcion, ENV, sliderService) {
        sliderService.update(true);
        angular.element(document).ready(function () {
        console.log("home!");
        console.log(sliderService);
        console.log("end home!");
        });
    }
]);


adopteitorApp.controller('GalgosEnAdopcion', ['$scope', '$location', 'enAdopcionFilter', 'ENV', '$stateParams',
    function ($scope, $location, enAdopcion, ENV, $stateParams) {

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

adopteitorApp.controller('animalByID', ['$scope', '$location', 'getAnimalByID', '$stateParams', 'ENV',
    function ($scope, $location, getAnimalByID, $stateParams, ENV) {
        $scope.apiEndpoint = ENV.apiEndpoint;
        $scope.animalByID = getAnimalByID.query({},{'id': $stateParams.id});
        $scope.animalByID.$promise.then(function(data) {
            $scope.animal = data;
            if($scope.animal['genero']=='m'){
                $scope.animal['genero'] = 'macho';
            }
            else{
                $scope.animal['genero'] = 'hembra';
            }
        }, function(error) {
            console.log('error', error);
        }
        );
        $scope.mostrarFormularioAdopcion = function(id){
        //   var modalInstance = $uibModal.open({
        //    animation: $scope.animationsEnabled,
        //    templateUrl: 'views/formularioAdopcion.html',
        //    windowClass: 'center-modal',
        //    controller: 'formularioAdopcion',
        //    resolve: {
        //      items: function () {
        //        return $scope.items;
        //    },
        //      id: function () {
        //        return id;
        //      }
        //    }
        //  });
        }
    }
]);
