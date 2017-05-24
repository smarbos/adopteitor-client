
//------------------------------------------------------------------------------------------------------------//
function finalesFelices($scope, $location, finalesFelicesFilter, $stateParams, ENV, sliderService, enAdopcionFilter, $log) {

    $log.debug('[finalesFelices.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.currentDomain = ENV.currentDomain;
    $scope.animalByID = finalesFelicesFilter.query({},{'id': $stateParams.id});
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

    $scope.allAnimals = finalesFelicesFilter.query({},{'estado': "2"});
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
finalesFelices.$inject = ['$scope', '$location', 'finalesFelicesFilter', '$stateParams', 'ENV', 'sliderService', 'enAdopcionFilter', '$log'];
adopteitorApp.controller('finalesFelices', finalesFelices);
