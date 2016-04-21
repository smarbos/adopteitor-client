adopteitorApp.controller('formularioAdopcion', ['$scope', 'FormularioAdopcion', '$http', 'id',
    function($scope, FormularioAdopcion, $http, id) {
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

    }
]);
