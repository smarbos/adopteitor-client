
//------------------------------------------------------------------------------------------------------------//

function videos($scope, $http, $state, sliderService, $log) {
    var videoItems = document.getElementsByClassName("video-item");
    for(var i = 0; i < videoItems.length; i++){
        console.log(videoItems[i]);
    }

    angular.forEach(videoItems, function(value, key) {console.log(key) }, $log);
    $log.debug('[videos.js]');
    $scope.videos = [
        {
            'id': 1,
            'code': "t2KkSQc7Z98",
            'titulo': 'Olfato buscá, línea.',
            'desc': 'Cras sit amet nibh libero, in gravida nulla.',
            'img': 'olfato-busca-linea.jpg'
        },
        {
            'id': 2,
            'code': 'vhXEmjTNvgY',
            'titulo': 'Taller Emociones ',
            'desc': 'Cras sit amet nibh libero, in gravida nulla.',
            'img': 'taller-emociones.jpg'
        },
        {
            'id': 3,
            'code': 'msxd4H-gR3U',
            'titulo': 'Olfato Conos',
            'desc': 'Cras sit amet nibh libero, in gravida nulla.',
            'img': 'olfato-conos.jpg'
        },
        {
            'id': 4,
            'code': 'PCL2dgj5GW4',
            'titulo': 'Olfato Completo',
            'desc': 'Cras sit amet nibh libero, in gravida nulla.',
            'img': 'olfato-completo.jpg'
        }
    ];
    if($state.params['id']){
        $scope.currentVideo = $scope.videos[$state.params['id']-1];
        $scope.videoUrl = 'https://www.youtube.com/watch?v='+$scope.currentVideo['code'];
    }
    else{
        $scope.currentVideo = $scope.videos[$scope.videos.length-1];
        $scope.videoUrl = 'https://www.youtube.com/watch?v='+$scope.currentVideo['code'];
    }

    sliderService.updateStatus(false);
    $scope.$emit('checkSliderStatus');
}
videos.$inject = ['$scope', '$http', '$state', 'sliderService', '$log'];
adopteitorApp.controller('videos', videos);

//------------------------------------------------------------------------------------------------------------//
