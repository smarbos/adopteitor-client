
//------------------------------------------------------------------------------------------------------------//

function videos($scope, $http, $state, sliderService) {
    // $log.debug('[videos.js]');
    if($state.params['code']){
        $scope.anotherGoodOne = 'https://www.youtube.com/watch?v='+$state.params['code'];
    }
    else{
        $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
    }
    $scope.videos = [
        {
            'code': "18-xvIjH8T4",
            'titulo': 'Taller Emociones',
            'desc': 'Cras sit amet nibh libero, in gravida nulla.'
        },
        {
            'code': 'qJQHjy9p_rk',
            'titulo': 'Taller Emociones',
            'desc': 'Cras sit amet nibh libero, in gravida nulla.'
        },
        {
            'code': '18-xvIjH8T4',
            'titulo': 'Taller Emociones',
            'desc': 'Cras sit amet nibh libero, in gravida nulla.'
        }
    ];
    console.log($scope.videos.length);
    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
videos.$inject = ['$scope', '$http', '$state', 'sliderService'];
adopteitorApp.controller('videos', videos);

//------------------------------------------------------------------------------------------------------------//
