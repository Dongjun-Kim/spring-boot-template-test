'use strict';

angular.module('11st').controller('LoginController', function($rootScope, $scope, $timeout, $http, $state, notifier, menu){
    var $ = window.jQuery;

    $scope.email = '';
    $scope.password = '';

    $scope.init = function(){
        $timeout(function(){
            $('.11st-menu').hide();
            $('#page-wrapper').css('margin-left', 0);
            $('#email').focus();
        }, 0);
    };

    $scope.login = function(){
        var isValid = true;
        if($scope.email === ''){
            notifier.message('email을 입력하세요.', function(){
                $('#email').focus();
            });
            isValid = false;
        }
        if($scope.password === ''){
            notifier.message('password를 입력하세요.', function(){
                $('#password').focus();
            });
            isValid = false;
        }

        if(isValid){
            $http
                .post('/login/login', {
                    email: $scope.email,
                    password: $scope.password
                })
                .success(function(result){
                    window.user = result.employee;
                    window.userRoles = result.userRoles;
                    console.log('login user', window.user);

                    $('.hrms-menu').show();
                    $('#page-wrapper').css('margin-left', '250px');

                    // menu 노출 설정
                    menu.filterMenu();


                    // 이전 페이지 기록이 있으면 이전 페이지로 이동시킴
                    if($rootScope.prevState !== undefined && $rootScope.prevState.name){
                        var redirectStateName = $rootScope.prevState.name;
                        $rootScope.prevState = undefined;

                        if(redirectStateName === 'login'){
                            $state.go('index');
                        }else{
                            $state.go(redirectStateName);
                        }

                    }else{
                        $state.go('my profile');
                    }

                })
                .error(function(){
                    notifier.message('로그인에 실패하였습니다.', function(){
                        $('#password').focus();
                    });
                });
        }
    };

    $scope.loginByEnterKey = function(keyCode){
        if(keyCode === 13){
            $scope.login();
        }
    };
});