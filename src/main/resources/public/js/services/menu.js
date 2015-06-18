'use strict';
angular.module('11st').factory('menu', function(){
    var $ = window.jQuery;
    return {
        hasRole: function(userRoles, requireRoles){
            for(var i = 0; i < requireRoles.length; i++){
                for(var k = 0; k < userRoles.length; k++){
                    if(requireRoles[i] === userRoles[k].authority){
                        return true;
                    }
                }
            }

            return false;
        },
        parseRequireRolesString: function($el){
            var requireRolesString = $el.attr('data-require-role');
            if(requireRolesString === undefined || requireRolesString === ''){
                requireRolesString = $el.attr('require-role');
            }

            if(requireRolesString !== undefined && requireRolesString !== ''){
                return requireRolesString.split(',');
            }else{
                return [];
            }
        },
        filterMenu: function(){
            var that = this;
            var $sideMenu = $('#side-menu');

            // 현재 사용자 권한에 따라 메뉴를 날려버립시다.
            var userRoles = window.userRoles;
            var user = window.user;

            if(user && userRoles){
                $sideMenu.find('li').each(function(){
                    var requireRoles = that.parseRequireRolesString($(this));
                    if(requireRoles.length > 0){
                        if(that.hasRole(userRoles, requireRoles)){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    }else{
                        // permission 기준 체크인지 확인
                        var requirePermission = $(this).attr('data-require-permission');
                        if(requirePermission !== undefined && requirePermission !== ''){
                            requirePermission  = parseInt(requirePermission, 10);
                            if(user.rank < requirePermission){
                                $(this).show();
                            }else{
                                $(this).hide();
                            }
                        }
                    }
                });

            }


        },
    }
});