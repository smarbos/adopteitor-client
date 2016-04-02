'use strict';

var adopteitorApp = angular.module('adopteitorApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'config']);


adopteitorApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('mision', {
            url: '/mision',
            templateUrl: 'views/mision.html'
        })
        .state('finales-felices', {
            controller: 'finales-felices',
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
            templateUrl: 'views/donaciones.html'
        })
        .state('perfilAnimal', {
            url: '/perfilAnimal/:id',
            controller: 'animalByID',
            templateUrl: 'views/perfilAnimal.html'
        });

        $urlRouterProvider.otherwise('/home');

});
