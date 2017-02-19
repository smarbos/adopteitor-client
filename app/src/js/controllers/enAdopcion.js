//------------------------------------------------------------------------------------------------------------//
function GalgosEnAdopcion($scope, $location, enAdopcionFilter, ENV, $stateParams, sliderService, $log) {

    $log.debug("[GalgosEnAdopcion]");

    //Give current filtering option to mark it as active in the menu//
    $scope.currentFilter = $stateParams.filter;

    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    var filter;
    switch ($stateParams.filter) {
        case "a":
            filter = "galgo_etapa=a";
            break;
        case "c":
            filter = "galgo_etapa=c";
            break;
        case "h":
            filter = "galgo_genero=h";
            break;
        case "m":
            filter = "galgo_genero=m";
            break;
        case "buenos-aires":
            filter = "galgo_filter=buenos-aires";
            break;
        case "neuquen":
            filter = "galgo_filter=neuquen";
            break;
    }
    var galgosEnAdopcion = function() {
      var galgosEnAdopcionPromise = new Promise(function(resolve, reject){
          enAdopcionFilter.query({},{'filter': filter}).$promise.then(function(data){
              resolve(data);

          })
      });

      return galgosEnAdopcionPromise
    }


    var getGalgosDone = false;

    var getGalgos = function(){
      $log.debug('getGalgos start');
      var getGalgosPromise = new Promise(function(resolve, reject){
          galgosEnAdopcion().then(function(data){
              resolve(data);
              getGalgosDone = true;
          }).catch(function (error){
              $log.error(error);
          });

      });
      return getGalgosPromise;
    }

    getGalgos().then(function(data){
        $log.debug('getGalgos.then');
        $log.debug(data);
        $scope.galgosEnAdopcion = data;
    }).catch(function(error){
        $log.debug('getGalgos.catch');
        $log.debug(error);
    });
    $scope.apiEndpoint = ENV.apiEndpoint;
    $scope.params = $stateParams;

}
GalgosEnAdopcion.$inject = ['$scope', '$location', 'enAdopcionFilter', 'ENV', '$stateParams', 'sliderService', '$log'];
adopteitorApp.controller('GalgosEnAdopcion', GalgosEnAdopcion);

//------------------------------------------------------------------------------------------------------------//
