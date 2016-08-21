// 'use strict';

//------------------------------------------------------------------------------------------------------------//

var adopteitorApp = angular.module('adopteitorApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'config', 'angularUtils.directives.dirPagination', '720kb.socialshare', 'ngCookies']);


//------------------------------------------------------------------------------------------------------------//
function routes($stateProvider, $urlRouterProvider) {

    // $rootScope.$on('$stateChangeError', function(event) {
    //   $state.go('404');
    // });
    $stateProvider

        .state('home', {
            url: '/home',
            controller: 'home',
            templateUrl: 'views/home.html'
        })
        .state('en-adopcion', {
            url: '/en-adopcion/:filter',
            controller: 'GalgosEnAdopcion',
            cache: false,
            templateUrl: 'views/en-adopcion.html'
        })
        .state('mision', {
            url: '/mision',
            controller: 'mision',
            templateUrl: 'views/mision.html'
        })
        .state('como-trabajamos', {
            url: '/como-trabajamos',
            controller: 'comoTrabajamos',
            templateUrl: 'views/como-trabajamos.html'
        })
        .state('experiencia-de-voluntarios', {
            url: '/experiencia-de-voluntarios',
            controller: 'experienciaVoluntarios',
            templateUrl: 'views/experiencia-de-voluntarios.html'
        })
        .state('difundir', {
            url: '/difundir',
            controller: 'difundir',
            templateUrl: 'views/difundir.html'
        })
        .state('donar-insumos', {
            url: '/donar-insumos',
            controller: 'donarInsumos',
            templateUrl: 'views/donar-insumos.html'
        })
        .state('transitos', {
            url: '/transitos',
            controller: 'transitos',
            templateUrl: 'views/transitos.html'
        })
        .state('finales-felices', {
            controller: 'finalesFelices',
            url: '/finales-felices',
            templateUrl: 'views/finales-felices.html'
        })
        .state('shop', {
            url: '/shop',
            templateUrl: 'views/shop.html'
        })
        .state('contacto', {
            url: '/contacto',
            controller: "contacto",
            templateUrl: 'views/contacto.html'
        })
        .state('donaciones', {
            url: '/donaciones',
            controller: 'donaciones',
            templateUrl: 'views/donaciones.html'
        })
        .state('perfilAnimal', {
            url: '/perfilAnimal/:id',
            controller: 'animalByID',
            templateUrl: 'views/perfil-animal.html'
        })
        .state('not-found', {
            url: '/not-found',
            controller: 'notFound',
            templateUrl: 'views/not-found.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'register',
            controllerAs: 'vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('formulario-adopcion', {
            url: '/formulario-adopcion/:id',
            controller: 'formularioAdopcion',
            templateUrl: 'views/formulario-adopcion.html'
        });

        $urlRouterProvider.otherwise('/home');

}
routes.$inject = ['$stateProvider', '$urlRouterProvider'];
adopteitorApp.config(routes);

//------------------------------------------------------------------------------------------------------------//
