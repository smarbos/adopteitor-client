
//------------------------------------------------------------------------------------------------------------//

function donaciones($scope, $http, $state, sliderService, $log) {
    // $log.debug('[donaciones.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');

    $scope.donar = function(){
        console.log("DONATION");
        console.log($scope.monto_a_donar);

        $http({
          method: 'GET',
          url: 'https://www.adoptaungalgoenargentina.com/create_payment.php?amount='+$scope.monto_a_donar
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            swal({
                  title: '<i>HTML</i> <u>example</u>',
                  type: 'info',
                  html: '<iframe src='.response.init_point.'></iframe>',
                  showCloseButton: true,
                  showCancelButton: true,
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                  cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>'
                });
          }, function errorCallback(response) {
              console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }

}
donaciones.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('donaciones', donaciones);

//------------------------------------------------------------------------------------------------------------//
