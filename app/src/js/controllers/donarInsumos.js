
//------------------------------------------------------------------------------------------------------------//

function donarInsumos($scope, $http, $state, sliderService, $log) {
    $log.debug('[donarInsumos.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
donarInsumos.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('donarInsumos', donarInsumos);

//------------------------------------------------------------------------------------------------------------//
