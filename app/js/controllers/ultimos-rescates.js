adopteitorApp.controller('ultimosRescates', ['$scope', 'enAdopcion', '$http', '$state', 'ENV',
    function($scope, enAdopcion, $http, $state, ENV) {
        console.log("aa");
        $scope.apiEndpoint = ENV.apiEndpoint;
        $scope.animales = enAdopcion.query();
        $scope.animales.$promise.then(function(data) {
            $scope.animalesRes = data.results;
        });
    }
]);
