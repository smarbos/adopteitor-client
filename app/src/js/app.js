// 'use strict';

//------------------------------------------------------------------------------------------------------------//

var adopteitorApp = angular.module('adopteitorApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'config', 'angularUtils.directives.dirPagination', '720kb.socialshare', 'ngCookies', 'youtube-embed', 'underscore']);

//------------------------------------------------------------------------------------------------------------//

function animalFilter($stateParams, $rootScope) {

    switch($stateParams.filter){
        case "a":
            console.log("Adulto");
            return function(input){
              var out = [];
              angular.forEach(input, function(etapa){
                  if(etapa.etapa == "a"){
                      console.log("ESTX ES UN ADULTO!");
                      out.push(etapa);
                  }

              })
              return out;
            }
            break;
        case "c":
            console.log("Cachorro");
            return function(input){
              var out = [];
              angular.forEach(input, function(etapa){
                  if(etapa.etapa == "c"){
                      console.log("ESTX ES UN CACHARRO!");
                      out.push(etapa);
                  }

              })
              return out;
            }
            break;
        case "h":
            console.log("Hembra");
            return function(input){
              var out = [];
              angular.forEach(input, function(etapa){
                  if(etapa.genero == "h"){
                      console.log("ESTX ES UN HEMBRA!");
                      out.push(etapa);
                  }

              })
              return out;
            }
            break;
        case "m":
            console.log("Macho");
            return function(input){
              var out = [];
              angular.forEach(input, function(etapa){
                  if(etapa.genero == "m"){
                      console.log("ESTX ES UN MACHO!");
                      out.push(etapa);
                  }

              })
              return out;
            }
            break;
        // case "buenos-aires":
        //     console.log("buenos-aires");
        //     return function(input){
        //       var out = [];
        //       angular.forEach(input, function(etapa){
        //           if(etapa.ubicacion == "buenos-aires"){
        //               console.log("buenos-aires!");
        //               out.push(etapa);
        //           }
        //
        //       })
        //       return out;
        //     }
        //     break;
        // case "neuquen":
        //     console.log("neuquen");
        //     return function(input){
        //       var out = [];
        //       angular.forEach(input, function(etapa){
        //           console.log("etapa");
        //           if(etapa.ubicacion == "neuquen"){
        //               console.log("neuquen!");
        //               out.push(etapa);
        //           }
        //
        //       })
        //       return out;
        //     }
        //     break;
    }

}
adopteitorApp.filter('animalFilter', animalFilter);

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
        .state('subscribirse', {
            url: '/subscribirse/:amount',
            params: {
            amount: {
              value: '100',
              squash: false
            },
            hiddenParam: 'YES',
          },
            controller: 'subscribirse',
            templateUrl: 'views/subscribirse.html'
        })
        .state('perfilAnimal', {
            url: '/perfilAnimal/:animalId',
            controller: 'perfilAnimal',
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
        .state('privacypolicy', {
            url: '/privacypolicy',
            templateUrl: 'views/privacypolicy.html',
            controller: 'privacypolicy',
        })
        .state('videos', {
            url: '/videos/:id',
            templateUrl: 'views/videos.html',
            controller: 'videos',
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
