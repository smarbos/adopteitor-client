
//------------------------------------------------------------------------------------------------------------//

function experienciaVoluntarios($scope, $http, $state, sliderService, $log) {
    $log.debug('[experienciaVoluntarios.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
experienciaVoluntarios.$inject = ['$scope', '$http', '$state', 'sliderService', '$log'];
adopteitorApp.controller('experienciaVoluntarios', experienciaVoluntarios);

//------------------------------------------------------------------------------------------------------------//
