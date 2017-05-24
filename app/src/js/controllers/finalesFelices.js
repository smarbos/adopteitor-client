
//------------------------------------------------------------------------------------------------------------//
function finalesFelices($scope, $location, finalesFelicesFilter, $stateParams, ENV, sliderService, enAdopcionFilter, $log) {

    $log.debug('[finalesFelices.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.currentDomain = ENV.currentDomain;
    $scope.galgosEnAdopcion = finalesFelicesFilter.query({},{'estado': "2"});
    $scope.galgosEnAdopcion.$promise.then(function(data) {

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
finalesFelices.$inject = ['$scope', '$location', 'finalesFelicesFilter', '$stateParams', 'ENV', 'sliderService', 'enAdopcionFilter', '$log'];
adopteitorApp.controller('finalesFelices', finalesFelices);
