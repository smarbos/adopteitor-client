'use strict';


adopteitorApp.factory('enAdopcion', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/Animal/', null, {'query':{method: 'GET', isArray: true}});
}]);

adopteitorApp.factory('getAnimalByID', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/:id/',
        {id:'@id'},
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


adopteitorApp.controller('GalgosEnAdopcion', ['$scope', '$location', 'enAdopcion', 'ENV', '$stateParams',
    function ($scope, $location, enAdopcion, ENV, $stateParams) {

        $scope.currentPage = 1;
        $scope.pageSize = 10;
                $scope.galgosEnAdopcion = enAdopcion.query();
              $scope.galgosEnAdopcion.$promise.then(function(data) {
                  $scope.galgosEnAdopcionRes = data.results;
              });
              $scope.apiEndpoint = ENV.apiEndpoint;

              $scope.params = $stateParams;
              $scope.mostrarTarjetaEnAdopcion = function($galgoID){
                //   ModalService.showModal({
                //     templateUrl: "views/modal-tarjeta-en-adopcion.html",
                //     controller: "animalByID",
                //      inputs: {
                //        id: $galgoID
                //      }
                //   }).then(function(modal) {
                //     modal.close.then(function(result) {
                //       $scope.customResult = "All good!";
                //     });
                //   });


            //     var modalInstance = $uibModal.open({
            //      animation: $scope.animationsEnabled,
            //      templateUrl: 'views/modal-tarjeta-en-adopcion.html',
            //      controller: 'animalByID',
            //      windowClass: 'center-modal',
            //      resolve: {
            //        id: function () {
            //          return $galgoID;
            //        }
            //      }
            //    });
              }
    }
]);

adopteitorApp.controller('animalByID', ['$scope', '$location', 'getAnimalByID', '$stateParams', 'ENV', 'id',
    function ($scope, $location, getAnimalByID, $stateParams, ENV, id) {
        $scope.apiEndpoint = ENV.apiEndpoint;
        $scope.animalByID = getAnimalByID.query({},{'id': id});
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
