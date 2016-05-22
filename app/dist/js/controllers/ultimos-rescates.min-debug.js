
//------------------------------------------------------------------------------------------------------------//
function ultimosRescates($scope, enAdopcion, $http, $state, ENV) {
    console.log("aa");
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.animales = enAdopcion.query();
    $scope.animales.$promise.then(function(data) {
        $scope.animalesRes = data.results;
    });
}
ultimosRescates.$inject = ['$scope', 'enAdopcion', '$http', '$state', 'ENV'];
adopteitorApp.controller('ultimosRescates', ultimosRescates);

//------------------------------------------------------------------------------------------------------------//
