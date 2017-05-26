
//------------------------------------------------------------------------------------------------------------//

function perfilAnimal($scope, $http, $state, sliderService, $log, allAnimalsFilter, $stateParams, _, $location, ENV, $q) {
    $log.debug('[perfilAnimalBeta.js]');
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    allAnimals = [];
    $scope.thereAreNoMoreAnimals = false;
    $scope.thereAreNoLessAnimals = false;
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.currentDomain = ENV.currentDomain;

    var getGalgosEnAdopcion = function() {
      var galgosEnAdopcionPromise = new Promise(function(resolve, reject){
          allAnimalsFilter.query({},{}).$promise.then(function(data){
            console.log(data)
              resolve(data);
          })
      });
      return galgosEnAdopcionPromise
    }

    $scope.showImage = function(image) {
        $scope.currentImage = image;
    }

    renderAnimal = function(animal) {

      $log.debug("[renderAnimal]");
      $log.debug(animal);
      var renderAnimalPromise = $q.defer();

      if (animal) {
        Array.prototype.current = allAnimals.indexOf(_.findWhere(allAnimals, {id: Number($stateParams.animalId)})) || 0;
        if(animal['genero']=='m'){
          $scope.genero = "m";
        }
        else{
          $scope.genero = "h";
        }
        $scope.currentImage = animal.fotos[0];
        renderAnimalPromise.resolve(animal);
      } else {
        renderAnimalPromise.reject("[renderAnimal] Animal is undefined");
      }

      return renderAnimalPromise.promise;
    }

    getGalgosEnAdopcion().then(function (response) {
      allAnimals = response;
      Array.prototype.next = function() {
        if (!((this.current + 1) in this)) return false;
        return this[++this.current];
      };
      Array.prototype.prev = function() {
          if (!((this.current - 1) in this)) return false;
          return this[--this.current];
      };

      renderAnimal(_.findWhere(allAnimals, {id: Number($stateParams.animalId)}))
        .then(function (animal) {
          $scope.animal = animal;
        })
        .catch(function (error) {
          $log.debug(error)
        });

    })
    .catch(function(error){
      $log.debug(error)
    })

    $scope.nextAnimal = function() {
      $scope.thereAreNoLessAnimals = false;
      $scope.thereAreNoMoreAnimals = false;
      var nextAnimal = allAnimals.next();
      if(nextAnimal){
        renderAnimal(nextAnimal)
          .then(function (animal) {
            $scope.animal = animal;
            $state.transitionTo('perfilAnimal', {animalId: animal.id}, { notify: false });
            if(allAnimals.indexOf(animal) >= allAnimals.length-1){
              $scope.thereAreNoMoreAnimals = true;
            } else {
              $scope.thereAreNoMoreAnimals = false;
            }
          })
          .catch(function (error) {
            $log.debug(error)
          });
      }
      else {
        $log.debug("[nextAnimal] allAnimals.next() is false")
      }
    }

    $scope.previousAnimal = function() {
      $scope.thereAreNoLessAnimals = false;
      $scope.thereAreNoMoreAnimals = false;
      var previousAnimal = allAnimals.prev();
      if(previousAnimal){
        renderAnimal(previousAnimal)
          .then(function (animal) {
            $scope.animal = animal;
            $state.transitionTo('perfilAnimal', {animalId: animal.id}, { notify: false });
            if(allAnimals.indexOf(animal) === 0){
              $scope.thereAreNoLessAnimals = true;
            } else {
              $scope.thereAreNoLessAnimals = false;
            }
          })
          .catch(function (error) {
            $log.debug(error)
          });
      }
      else {
        $log.debug("[previousAnimal] allAnimals.next() is false")
      }
    }

}
perfilAnimal.$inject = ['$scope', '$http', '$state', 'sliderService', '$log', 'allAnimalsFilter', '$stateParams', '_', '$location', 'ENV', '$q'];
adopteitorApp.controller('perfilAnimal', perfilAnimal);

//------------------------------------------------------------------------------------------------------------//
