
//------------------------------------------------------------------------------------------------------------//
function contacto($scope, $location, getAnimalByID, $stateParams, ENV, $http, $state, sliderService) {
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.success = false;
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.newFormularioAdopcion;
    $scope.save = function(contactform, formData) {
        $scope.submitted = true;
        event.preventDefault();
        $scope.submitButtonDisabled = true;
        if (formData.$valid) {
            $http({
                method  : 'POST',
                url     : 'contacto-send-mail.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                if (data.success) {
                    $scope.submitButtonDisabled = true;
                    $scope.success = true;
                    swal({
                      title: 'Formulario enviado!',
                      text: data.message,
                      type: 'success',
                      showCancelButton: false,
                      confirmButtonText: 'Continuar!',
                    }).then(function(isConfirm) {
                      if (isConfirm === true) {
                        $state.transitionTo('home');
                      } else {
                        $state.transitionTo('home');
                      }
                    });
                } else {
                    console.error("failure");
                    $scope.submitted = false;
                    $scope.submitButtonDisabled = false;
                }
                $scope.resultMessage = data.message;
            });
        } else {
            $scope.submitted = false;
        }
    }
}
contacto.$inject = ['$scope', '$location', 'getAnimalByID', '$stateParams', 'ENV', '$http', '$state', 'sliderService'];
adopteitorApp.controller('contacto', contacto);

//------------------------------------------------------------------------------------------------------------//
