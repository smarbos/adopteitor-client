
//------------------------------------------------------------------------------------------------------------//

function formularioAdopcion($scope, FormularioAdopcionFactory, $http, getAnimalByID, ENV, $stateParams, $state, sliderService, $log) {
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.animalByID = getAnimalByID.query({},{'id': $stateParams.id});
    $scope.animalByID.$promise.then(function(data) {
        $scope.animal = data;
        if($scope.animal['genero']=='m'){
            $scope.animal['genero'] = 'macho';
        }
        else{
            $scope.animal['genero'] = 'hembra';
        }
    }, function(error) {
        $log.error(error);
    }
    );
    id = $stateParams.id;
    $scope.success = false;
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.newFormularioAdopcion;
    $scope.save = function(contactform, formData) {
        $scope.submitted = true;
        event.preventDefault();
        $scope.submitButtonDisabled = true;
        $scope.formData.animal_id = id;
        if (formData.$valid) {
            $http({
                method  : 'POST',
                url     : 'adopcion-send-mail.php',
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
formularioAdopcion.$inject = ['$scope', 'FormularioAdopcionFactory', '$http', 'getAnimalByID', 'ENV', '$stateParams', '$state', 'sliderService', '$log'];
adopteitorApp.controller('formularioAdopcion', formularioAdopcion);

//------------------------------------------------------------------------------------------------------------//
