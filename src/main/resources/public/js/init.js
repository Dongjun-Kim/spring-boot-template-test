'use strict';

angular.module('11st', ['ui.bootstrap', 'ui.router', 'ngResource', 'ui.sortable', 'angularFileUpload', 'ngAnimate'])
    .factory('httpWorkingTimeLogger', function(){
        return {
            request: function(config) {
                config.requestTimestamp = new Date().getTime();
                return config;
            },
            response: function(response) {
                if(response.config.url.indexOf('.html') === -1){
                    console.log('[' + response.config.method + '] ' + response.config.url + ' - working time : ' +
                        (new Date().getTime() - response.config.requestTimestamp) + 'ms');
                }
                return response;
            }
        };

    })
    .factory('httpScreenBlocker', function($q, notifier, loading){
        return {
            request: function(config){
                if(config.params && config.params.hasOwnProperty('noBlocking') && config.params.noBlocking){
                    delete config.params.noBlocking;
                    return config;
                }else{
                    if(config.url.indexOf('.html') === -1){
                        loading.show();
                    }
                    return config;
                }

            },
            response: function(response){
                loading.hide();
                return response;
            },
            responseError: function(rejection){
                loading.hide();
                notifier.message(rejection.statusText);
                return $q.reject(rejection);
            }
        };
    })
    .factory('accessDenyCatcher', function($q){
        return {
        	request: function(config){
        		config.headers['session-token'] = window.sessionToken;
        		return config;
        	},
            responseError: function(rejection){
            	console.log(rejection);
            	if(rejection.status === 403){
            		//TODO callback URL 하드코딩 제거
            		//location.href="http://portal.itwise.co.kr?callback=hrms.itwise.co.kr:8080";
            	}else{
            		return $q.reject(rejection);            		
            	}
            }
        };
    })
    .config(function($httpProvider){    	
    	$httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push('httpWorkingTimeLogger');
        $httpProvider.interceptors.push('accessDenyCatcher');
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //delete $httpProvider.defaults.headers.post['Content-type'];
        //delete $httpProvider.defaults.headers.post['Access-Control-Request-Headers'];
    })
    .config(function(){
    	
    })
    .run(function($rootScope, $state, $http){

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            if(toState.isAuthenticate){
                $rootScope.prevState = toState;
                var callBackUrl = location.href;
              
            }
        });
        var resizeWindowHeight = function(){
            var $ = window.jQuery;
            var topOffset = $('.11st-menu').height();

            var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
            height = height - topOffset;
            if (height < 1) {
                height = 1;
            }
            if (height > topOffset) {
                $('#page-wrapper').css('min-height', (height- 15) + 'px');
            }
        };

        var resizePanelBodyHeight = function(){
            $('[data-auto-height=true]').each(function(){
                $(this).height(
                    $(window).height() - $(this).offset().top - 100
                );

                // panel이고 footer가 있는 경우는 한 번 더 계산
                var $panelFooter = $(this).parents('.panel').find('.panel-footer');
                if($panelFooter.size() > 0){
                    $(this).height(
                        $(this).height() - $panelFooter.height()
                    );
                }
            });
        };

        $rootScope.$on('$viewContentLoaded', function(){
            resizeWindowHeight();
            resizePanelBodyHeight();
            $(window).on('resize', function(){
                resizeWindowHeight();
                resizePanelBodyHeight();
            });
        });
    });