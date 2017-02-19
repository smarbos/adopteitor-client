
//------------------------------------------------------------------------------------------------------------//

function mision($scope, $http, $state, sliderService, $log) {
    $log.debug('[Mision.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
mision.$inject = ['$scope', '$http', '$state', 'sliderService', '$log'];
adopteitorApp.controller('mision', mision);

//------------------------------------------------------------------------------------------------------------//
