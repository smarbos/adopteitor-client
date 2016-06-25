
//------------------------------------------------------------------------------------------------------------//

function donaciones($scope, $http, $state, sliderService, $log) {
    $log.debug('[donaciones.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
donaciones.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('donaciones', transitos);

//------------------------------------------------------------------------------------------------------------//
