
//------------------------------------------------------------------------------------------------------------//

function finalesFelices($scope, $http, $state, sliderService, $log) {
    $log.debug('[finalesFelices.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
finalesFelices.$inject = ['$scope', '$http', '$state', 'sliderService', '$log'];
adopteitorApp.controller('finalesFelices', finalesFelices);

//------------------------------------------------------------------------------------------------------------//
