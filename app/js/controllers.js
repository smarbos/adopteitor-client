'use strict';

adopteitorApp.factory('enAdopcion', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/Animal/', null, {'query':{method: 'GET', isArray: true}});
}]);

adopteitorApp.factory('getAnimalByID', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/:id/',
        {id:'@id'},
        {'query':{method: 'GET', isArray: false}}
    );
}]);

adopteitorApp.factory('FormularioAdopcion', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/FormularioAdopcion/',
        {id:'@id'},
        {'query':{method: 'GET', isArray: false},
        'update':
        { method:'PUT' }
    }
);
}]);

adopteitorApp.controller('GalgosEnAdopcion', ['$scope', '$location', 'enAdopcion', 'ModalService', 'ENV',
    function ($scope, $location, enAdopcion, ModalService, ENV) {

        $scope.currentPage = 1;
        $scope.pageSize = 10;
                $scope.galgosEnAdopcion = enAdopcion.query();
              $scope.galgosEnAdopcion.$promise.then(function(data) {
                  $scope.galgosEnAdopcionRes = data.results;
              });
              $scope.apiEndpoint = ENV.apiEndpoint;

              $scope.mostrarTarjetaEnAdopcion = function($galgoID){
                  ModalService.showModal({
          templateUrl: "views/modal-tarjeta-en-adopcion.html",
          controller: "animalByID",
          inputs: {
            id: "1"
          }
        }).then( function(modal)
 {
     modal.element.show();
 });

                //   ModalService.showModal({
                //     templateUrl: "views/modal-tarjeta-en-adopcion.html",
                //     controller: "animalByID",
                //      inputs: {
                //        id: $galgoID
                //      }
                //   }).then(function(modal) {
                //     modal.close.then(function(result) {
                //       $scope.customResult = "All good!";
                //     });
                //   });


            //     var modalInstance = $uibModal.open({
            //      animation: $scope.animationsEnabled,
            //      templateUrl: 'views/modal-tarjeta-en-adopcion.html',
            //      controller: 'animalByID',
            //      windowClass: 'center-modal',
            //      resolve: {
            //        id: function () {
            //          return $galgoID;
            //        }
            //      }
            //    });
              }
    }
]);

adopteitorApp.controller('animalByID', ['$scope', '$location', 'getAnimalByID', 'ModalService', '$stateParams', 'ENV', 'id',
    function ($scope, $location, getAnimalByID, ModalService, $stateParams, ENV, id) {
        $scope.apiEndpoint = ENV.apiEndpoint;
        $scope.animalByID = getAnimalByID.query({},{'id': id});
        $scope.animalByID.$promise.then(function(data) {
            $scope.animal = data;
            if($scope.animal['genero']=='m'){
                $scope.animal['genero'] = 'macho';
            }
            else{
                $scope.animal['genero'] = 'hembra';
            }
        }, function(error) {
            console.log('error', error);
        }
        );
        $scope.mostrarFormularioAdopcion = function(id){
            ModalService.showModal({
              templateUrl: "views/formularioAdopcion.html",
              controller: "formularioAdopcion",
              inputs: {
                id: id
              }
            });
        //   var modalInstance = $uibModal.open({
        //    animation: $scope.animationsEnabled,
        //    templateUrl: 'views/formularioAdopcion.html',
        //    windowClass: 'center-modal',
        //    controller: 'formularioAdopcion',
        //    resolve: {
        //      items: function () {
        //        return $scope.items;
        //    },
        //      id: function () {
        //        return id;
        //      }
        //    }
        //  });
        }
    }
]);

adopteitorApp.controller('contacto', ['$scope', '$location', 'getAnimalByID', '$uibModal', '$stateParams', 'ENV',
    function ($scope, $location, getAnimalByID, $uibModal, $stateParams, ENV) {
        console.log("CONTACTO!");

        $scope.save = function(contactform){
            console.log(contactform.apellido.$viewValue);
        }
    }
]);

adopteitorApp.controller('formularioAdopcion', ['$scope', '$uibModalInstance', 'FormularioAdopcion', '$http', 'id',
    function($scope, $modalInstance, FormularioAdopcion, $http, id) {
        $('#galgo').val(id);
        //console.log(id);
        $scope.result = 'hidden'
        $scope.resultMessage;
        $scope.formData; //formData is an object holding the name, email, subject, and message
	    console.log("currenlty show id ");
	    console.log(id);
        $scope.submitButtonDisabled = false;
        $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
        $scope.newFormularioAdopcion;
        $scope.galgo=id;
        // $scope.newFormularioAdopcion.nombre="carlitos";
        $scope.save = function(contactform, formData) {
        console.log("---contactform---");
        console.log(contactform);
        console.log("---formdata---");
        console.log(formData);
	    contactform.id = id;
        console.log("---new---contactoform----");
        console.log(contactform);
            console.log("Submit");

            var newFormularioAdopcion = new FormularioAdopcion(formularioAdopcion);
            //console.log(newFormularioAdopcion);
            //console.log(formularioAdopcion);
    		newFormularioAdopcion.$save(
                function(formularioAdopcion, putResponseHeaders) {
                    $scope.FormulariosAdopcion.push(formularioAdopcion);
                    console.info("SAVED OK");
                },
                function(err){
                    console.error(err);
                }
            );


            event.preventDefault();
            $scope.submitted = true;
            $scope.submitButtonDisabled = true;
            if (formData.$valid) {
                console.log("Valid"+formData.$valid);
                console.log(formData);
                console.log($.param(contactform));
                $http({
                    method  : 'POST',
                    url     : 'send-mail.php',
                    data    : $.param(contactform),  //param method from jQuery
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
                }).success(function(data){
                    if (data.success) { //success comes from the return json object
                        console.log("success");
                        console.log(data);
                        $scope.submitButtonDisabled = true;
                        $scope.resultMessage = data.message;
                        $scope.result='bg-success';
                    } else {
                        console.log(data);
                        console.log(data.message);
                        console.log("failure");
                        $scope.submitButtonDisabled = false;
                        $scope.resultMessage = data.message;
                        $scope.result='bg-danger';
                    }
                });
            } else {
                console.log("invalid");
                $scope.submitButtonDisabled = false;
                $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
                $scope.result='bg-danger';
            }
            console.log(formData);
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
    }
]);

adopteitorApp.controller('transitos', ['$scope', 'FormularioAdopcion', '$http',
    function($scope, FormularioAdopcion, $http) {
        $scope.result = 'hidden'
        $scope.resultMessage;
        $scope.formData; //formData is an object holding the name, email, subject, and message
        $scope.submitButtonDisabled = false;
        $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
        $scope.newFormularioAdopcion;
        // $scope.newFormularioAdopcion.nombre="carlitos";
        $scope.save = function(contactform, formData) {
            console.log(contactform);
            console.log(formData);
            console.log("Submit");

            // var newFormularioAdopcion = new FormularioAdopcion(formularioAdopcion);
            // console.log(newFormularioAdopcion);
            // console.log(formularioAdopcion);
    		// newFormularioAdopcion.$save(
            //     function(formularioAdopcion, putResponseHeaders) {
            //         $scope.FormulariosAdopcion.push(formularioAdopcion);
            //         console.log("SAVED OK");
            //     },
            //     function(err){
            //         console.log(err);
            //     }
            // );


            event.preventDefault();
            $scope.submitted = true;
            $scope.submitButtonDisabled = true;
            if (formData.$valid) {
                console.log("Valid"+formData.$valid);
                console.log(formData);
                console.log($.param(contactform));
                $http({
                    method  : 'POST',
                    url     : 'transito-send-mail.php',
                    data    : $.param(contactform),  //param method from jQuery
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
                }).success(function(data){
                    if (data.success) { //success comes from the return json object
                        console.log("success");
                        console.log(data);
                        $scope.submitButtonDisabled = true;
                        $scope.resultMessage = data.message;
                        $scope.result='bg-success';
                    } else {
                        console.log(data);
                        console.log(data.message);
                        console.log("failure");
                        $scope.submitButtonDisabled = false;
                        $scope.resultMessage = data.message;
                        $scope.result='bg-danger';
                    }
                });
            } else {
                console.log("invalid");
                $scope.submitButtonDisabled = false;
                $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
                $scope.result='bg-danger';
            }
            console.log(formData);
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
    }
]);
