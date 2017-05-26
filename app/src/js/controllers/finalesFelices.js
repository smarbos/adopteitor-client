
//------------------------------------------------------------------------------------------------------------//
function finalesFelices($scope, $location, finalesFelicesFilter, $stateParams, ENV, sliderService, $log) {

    $log.debug('[finalesFelices.js]');
    console.log("finalesfelices")
    sliderService.updateStatus(false);
    $scope.currentPage = 1;
    $scope.$emit('checkSliderStatus');
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.currentDomain = ENV.currentDomain;
    galgosAdoptados = finalesFelicesFilter.query({},{});
    galgosAdoptados.$promise.then(function(data) {
      console.log(data)
      $scope.adoptedAnimals = data;
        $scope.totalAnimalAmount = data.length;
    }, function(error) {
      console.log(error)
        $log.debug('error', error);
    }
    );
    // $scope.currentImage = $scope.animal.fotos[0];


    $scope.showImage = function(image) {
        $scope.currentImage = image;
    }

}
finalesFelices.$inject = ['$scope', '$location', 'finalesFelicesFilter', '$stateParams', 'ENV', 'sliderService', '$log'];
adopteitorApp.controller('finalesFelices', finalesFelices);
