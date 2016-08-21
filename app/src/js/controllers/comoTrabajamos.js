
//------------------------------------------------------------------------------------------------------------//

function comoTrabajamos($scope, $http, $state, sliderService, $log) {
    $log.debug('[comoTrabajamos.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
comoTrabajamos.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('comoTrabajamos', comoTrabajamos);

//------------------------------------------------------------------------------------------------------------//
