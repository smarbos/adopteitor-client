
//------------------------------------------------------------------------------------------------------------//

function donaciones($scope, $http, $state, sliderService, $log) {
    // $log.debug('[donaciones.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');

    $scope.donarMP = function(){
        console.log("DONATION");
        console.log($scope.monto_a_donar);

        $http({
          method: 'GET',
          url: 'https://www.adoptaungalgoenargentina.com/create_payment.php?amount='+$scope.monto_a_donar
        }).then(function successCallback(response) {
            console.log(response);
            swal({
                  width: '800',
                  html: '<iframe width=\"100%\" height=\"400px\" src='+response.data.response.init_point+'></iframe>',
                  showCloseButton: false,
                  showCancelButton: false,
                  showConfirmButton: false,
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                  cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>'
                });
          }, function errorCallback(response) {
              console.log(response);
          });
    }

    $scope.donarDeposito = function(){
        swal({
          title: 'Deposito Bancario',
          type: 'info',
          html:
            'Banco de la Nacion Argentina<br> ' +
            'Sucursal Virreyes, Provincia de Buenos Aires. <br> ' +
            '<strong>Cuenta Corriente Nro.:</strong> <i>6200384/25</i> <br>' +
            '<strong>CBU Nro.:</strong> <i>0110620220062000384256</i> <br>' +
            '<strong>Titular:</strong> <i>ASOCIACION CIVIL ADOPTA UN GALGO EN ARGENTINA</i> <br>' +
            '<strong>CUIT:</strong> <i>30-71502788-3</i>',
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText:
            'Listo!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>'
        });
    }

}
donaciones.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('donaciones', donaciones);

//------------------------------------------------------------------------------------------------------------//
