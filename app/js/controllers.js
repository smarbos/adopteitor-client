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

adopteitorApp.controller('GalgosEnAdopcion', ['$scope', '$location', 'enAdopcion', '$uibModal', 'ENV',
    function ($scope, $location, enAdopcion, $uibModal, ENV) {

              $scope.galgosEnAdopcion = enAdopcion.query();
              $scope.galgosEnAdopcion.$promise.then(function(data) {
                  $scope.galgosEnAdopcionRes = data.results;
              });
              $scope.apiEndpoint = ENV.apiEndpoint;
    }
]);

adopteitorApp.controller('animalByID', ['$scope', '$location', 'getAnimalByID', '$uibModal', '$stateParams', 'ENV',
    function ($scope, $location, getAnimalByID, $uibModal, $stateParams, ENV) {
        $scope.apiEndpoint = ENV.apiEndpoint;
        $scope.animalByID = getAnimalByID.query({},{'id': $stateParams.id});

        $scope.animalByID.$promise.then(function(data) {
            $scope.animal = data;
        }, function(error) {
            console.log('error', error);
        }
        );

        $scope.mostrarFormularioAdopcion = function(){
          var modalInstance = $uibModal.open({
           animation: $scope.animationsEnabled,
           templateUrl: 'views/formularioAdopcion.html',
          //  controller: 'formularioAdopcion',
           resolve: {
             items: function () {
               return $scope.items;
             }
           }
         });
        }

    }
]);
