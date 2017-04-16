
//------------------------------------------------------------------------------------------------------------//

function perfilAnimalBeta($scope, $http, $state, sliderService, $log, enAdopcionFilter, $stateParams, _, $location, ENV) {
    $log.debug('[perfilAnimalBeta.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.allAnimals = [];

    var getGalgosEnAdopcion = function() {
      var galgosEnAdopcionPromise = new Promise(function(resolve, reject){
          enAdopcionFilter.query({},{}).$promise.then(function(data){
              resolve(data);
          })
      });
      return galgosEnAdopcionPromise
    }

    getGalgosEnAdopcion().then(function(response){
      $scope.apiEndpoint = ENV.apiEndpoint;
      $scope.currentDomain = ENV.currentDomain;

      $scope.allAnimals = response;
      $scope.animal = _.findWhere($scope.allAnimals, {id: Number($stateParams.animalId)});
      $scope.$apply(function () {
            $scope.animal = $scope.animal;
      });
      $scope.currentImage = $scope.animal.fotos[0];
      if($scope.animal['genero']=='m'){
          $scope.genero = "m";
      }
      else{
          $scope.genero = "h";
      }
      Array.prototype.current = $scope.allAnimals.indexOf(_.findWhere($scope.allAnimals, {id: Number($stateParams.animalId)})) || 0;
      Array.prototype.next = function() {
        return this[++this.current];
      };
      Array.prototype.prev = function() {
          return this[--this.current];
      };
    })
    .catch(function(error){
      console.log(error)
    })

    $scope.nextAnimal = function() {
      $scope.animal = $scope.allAnimals.next();
      if (!$scope.animal) {
        $scope.animal = $scope.allAnimals.prev();
      }
      $state.transitionTo('perfilAnimalBeta', {animalId: $scope.animal.id}, { notify: false });
    }

    $scope.previousAnimal = function() {
      $scope.animal = $scope.allAnimals.prev();
      if (!$scope.animal) {
        $scope.animal = $scope.allAnimals.next();
      }
      $state.transitionTo('perfilAnimalBeta', {animalId: $scope.animal.id}, { notify: false });
    }

}
perfilAnimalBeta.$inject = ['$scope', '$http', '$state', 'sliderService', '$log', 'enAdopcionFilter', '$stateParams', '_', '$location', 'ENV'];
adopteitorApp.controller('perfilAnimalBeta', perfilAnimalBeta);

//------------------------------------------------------------------------------------------------------------//
