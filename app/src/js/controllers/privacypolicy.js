
//------------------------------------------------------------------------------------------------------------//

function privacypolicy($scope, $http, $state, sliderService, $log) {
    $log.debug('[privacypolicy.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
privacypolicy.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('privacypolicy', privacypolicy);

//------------------------------------------------------------------------------------------------------------//
