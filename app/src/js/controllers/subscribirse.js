
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

            swal({
              title: 'Subscripcion:',
              text: 'Ingresa tu email:',
              input: 'email'
            }).then(
              function (email) {
                  $http({
                    method: 'GET',
                    url: '/mpauth.php'
                  }).then(function successCallback(response) {
                      var access_token = response.data;
                      $log.debug(access_token);
                      $log.debug('monto:'+  $scope.montoSubscripcion);
                      $http({
                        method: 'POST',
                        url: '/mp_create_preapproval.php?monto='+$scope.montoSubscripcion+'&email='+email
                      }).then(function successCallback(response) {
                          $log.debug(response);
                          swal({
                                width: '800',
                                height: '800',
                                html: '<iframe width=\"100%\" height=\"400px\" src='+response.data.response.init_point+'></iframe>',
                                showCloseButton: false,
                                showCancelButton: false,
                                showConfirmButton: false,
                                customClass: 'subscribirseModal',
                                confirmButtonText:
                                  '<i class="fa fa-thumbs-up"></i> Great!',
                                cancelButtonText:
                                  '<i class="fa fa-thumbs-down"></i>'
                              });
                              $scope.procesando = false;
                      }, function errorCallback(error) {
                            $log.error(error);
                        });
                  }, function errorCallback(error) {
                        $log.error(error);
                    });
              },
              function (dismiss) {
                if (dismiss === 'timer') {
                  console.log('I was closed by the timer')
                }
              }
            )

        }else{
            swal('Debes ingresar un monto a donar.');
            $scope.procesando = false;
        }

    }

}
subscribirse.$inject = ['$scope', '$http', '$state', 'sliderService', '$log'];
adopteitorApp.controller('subscribirse', subscribirse);

//------------------------------------------------------------------------------------------------------------//
