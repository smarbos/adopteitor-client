
//------------------------------------------------------------------------------------------------------------//
function ultimosRescates($scope, enAdopcion, $http, $state, ENV, $log) {
    $log.debug("ultimosRescates");
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.animales = enAdopcion.query();
    $scope.animales.$promise.then(function(data) {
        $scope.animalesRes = data.results;
    });
}
ultimosRescates.$inject = ['$scope', 'enAdopcion', '$http', '$state', 'ENV', '$log'];
adopteitorApp.controller('ultimosRescates', ultimosRescates);

//------------------------------------------------------------------------------------------------------------//
