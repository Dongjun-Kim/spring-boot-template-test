'use strict';
angular.module('11st').controller('MenuController', function($scope, $timeout, $state, menu){
    var $ = window.jQuery;

    $timeout(function(){
        var $sideMenu = $('#side-menu');
        $sideMenu.metisMenu();

    }, 0);

});