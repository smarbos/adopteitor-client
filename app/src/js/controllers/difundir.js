
//------------------------------------------------------------------------------------------------------------//

function difundir($scope, $http, $state, sliderService, $log) {
    $log.debug('[difundir.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
difundir.$inject = ['$scope', '$http', '$state', 'sliderService', '$log'];
adopteitorApp.controller('difundir', difundir);

//------------------------------------------------------------------------------------------------------------//
