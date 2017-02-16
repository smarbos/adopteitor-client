
//------------------------------------------------------------------------------------------------------------//

function subscribirse($scope, $http, $state, sliderService, $log) {
    // $log.debug('[donaciones.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.montoSubscripcion;
    $scope.procesando = false;

    $scope.donarDeposito = function(){
        $scope.procesando = true;
        if($scope.montoSubscripcion){
            $http({
              method: 'GET',
              url: '/mpauth.php'
            }).then(function successCallback(response) {
                var access_token = response.data;
                console.log(access_token);
                console.log('monto:'+  $scope.montoSubscripcion);
                $http({
                  method: 'POST',
                  url: '/mp_create_preapproval.php?monto='+$scope.montoSubscripcion
                }).then(function successCallback(response) {
                    console.log(response);
                    swal({
                          width: '800',
                          height: '800',
                          html: '<iframe width=\"100%\" height=\"400px\" src='+response.data.response.init_point+'></iframe>',
                          showCloseButton: false,
                          showCancelButton: false,
                          showConfirmButton: false,
                          confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Great!',
                          cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i>'
                        });
                        $scope.procesando = false;
                }, function errorCallback(error) {
                      console.log(error);
                  });
            }, function errorCallback(error) {
                  console.log(error);
              });

        }else{
            swal('Debes ingresar un monto a donar.');
            $scope.procesando = false;
        }

    }

}
subscribirse.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('subscribirse', subscribirse);

//------------------------------------------------------------------------------------------------------------//
