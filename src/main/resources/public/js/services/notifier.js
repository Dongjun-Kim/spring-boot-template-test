'use strict';

angular.module('11st').factory('notifier', function(viewLoader){
    var $ = window.jQuery;
    var viewUrl = '/views/common/notifier.html';
    var NOTIFIER_EL_EXPRESSION = '.notifier-wrapper';

    // view가 로딩되어있지 않다면 로딩함
    if(!viewLoader.isLoaded('.notifier-wrapper')){
        viewLoader.load(viewUrl, function(html){
           $('body').append(html);

            notifier.init();
        });
    }

    var notifier = {
        $notifierWrapper : $(NOTIFIER_EL_EXPRESSION),
        $notifier: $(NOTIFIER_EL_EXPRESSION).find('.notifier'),
        init: function(){
            this.$notifierWrapper = $(NOTIFIER_EL_EXPRESSION);
            this.$notifier = $(NOTIFIER_EL_EXPRESSION).find('.notifier');
        },
        heightPositioning: function(){
            if($(window).width() > 768){
                this.$notifier
                    .css('margin-top', -(this.$notifier.height() / 2));
            }else{
                this.$notifier
                    .css('top', (this.$notifier.height() / 2) + 'px');
            }
        },
        show: function(text){
            this.$notifierWrapper.show();
            this.setText(text);
            this.heightPositioning();
        },
        setText: function(text){
            this.$notifierWrapper.find('.notifier-text').html(text);
        },
        message: function(text, okCallback){
            var that = this;
            this.showButtons('message');
            this.show(text);

            this.$notifierWrapper
                .find('.notifier-message-buttons .notifier-close-button')
                .focus()
                .off('click')
                .on('click', function(){
                    if(angular.isFunction(okCallback)){
                        okCallback();
                    }
                    that.hide();
                });

        },
        resizeWidth: function(width){
            this.$notifier
                .css('width', width)
                .css('margin-left', -(width / 2));
        },
        resizeHeight: function(height){
            this.$notifier
                .css('height', height)
                .css('margin-top', -(height / 2));
        },
        resize: function(width, height){
            if($(window).width() > 768){
                if(width){
                    this.resizeWidth();
                }

                if(height){
                    this.resizeHeight();
                }
            }
        },
        confirm: function(text, okCallback, cancelCallback){
            var that = this;
            this.showButtons('confirm');
            this.show(text);

            // buttons별 callback 연결
            var $nofitierConfirmButtons = this.$notifierWrapper.find('.notifier-confirm-buttons');
            $nofitierConfirmButtons.find('.notifier-confirm-ok-button')
                .off('click')
                .on('click', function(){
                    if(angular.isFunction(okCallback)){
                        okCallback();
                        that.hide();
                    }
                });

            $nofitierConfirmButtons.find('.notifier-confirm-cancel-button')
                .off('click')
                .on('click', function(){
                    if(angular.isFunction(cancelCallback)){
                        cancelCallback();
                        that.hide();
                    }else{
                        that.hide();
                    }
                });

        },
        hide: function(){
            this.$notifierWrapper.hide();
        },
        showButtons: function(buttonType){
            var $notifierMessageButtons = this.$notifierWrapper.find('.notifier-message-buttons');
            var $nofitierConfirmButtons = this.$notifierWrapper.find('.notifier-confirm-buttons');
            if(buttonType === 'confirm'){
                $nofitierConfirmButtons.show();
                $notifierMessageButtons.hide();
            }else{
                $nofitierConfirmButtons.hide();
                $notifierMessageButtons.show();
            }
        }

    };
    $(NOTIFIER_EL_EXPRESSION + ' .notifier-close-button').on('click', function(){
        notifier.hide();
    });

    return notifier;

});