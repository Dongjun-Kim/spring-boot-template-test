'use strict';

angular.module('11st').factory('loading', function(viewLoader){
    angular
        .element(window)
        .bind('resize', function(){

        });

    var viewUrl = '/views/common/loading.html';
    if(!viewLoader.isLoaded('.loading-wrapper')){
        viewLoader.load(viewUrl, function(html){
            angular.element('body').append(html);
            loading.init();
        });
    }

    var loading = {
        $loadingWrapper: angular.element('.loading-wrapper'),
        init: function(){
            this.$loadingWrapper = angular.element('.loading-wrapper');
        },
        show: function(){
            this.$loadingWrapper.show();
        },
        hide: function(){
            this.$loadingWrapper.hide();
        }
    };

    return loading;
});