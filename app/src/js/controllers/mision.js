
//------------------------------------------------------------------------------------------------------------//

function mision($scope, $http, $state, sliderService, $log) {
    $log.debug('[Mision.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
mision.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('mision', transitos);

//------------------------------------------------------------------------------------------------------------//
