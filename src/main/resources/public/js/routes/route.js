'use strict';
angular.module('11st').config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/login/login',
            templateUrl: '/views/login/login.html',
            isAuthenticate: false
        });
});
