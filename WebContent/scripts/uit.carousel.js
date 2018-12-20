(function(root, factory) {
    var version = {carousel: '1.0.2'};
    root.uit = root.uit || {};
    root.uit.version = root.uit.version || {};
    if (typeof Object.assign == 'function') {
        // console.log('assign');
        root.uit = Object.assign(root.uit, factory(jQuery));
        root.uit.version = Object.assign(root.uit.version, version);
    } else {
        // console.log('jQuery');
        root.uit = jQuery.extend(root.uit, factory(jQuery));
        root.uit.version = jQuery.extend(root.uit.version, version);
    }
})(this, function($) {

    'use strict';

    var uit = {};

    var carousel = uit.carousel = function(container, options) {
        if (!(this instanceof carousel)) {
            return new carousel(container, options);
        }

        if (!container) {
            return false;
        }

        var defaults = {
            timerDur: 5000,
            duration: 300,
            autoplay: true,
            viewTimerBar: false,
            slideHover: true,
            random: false,
            animation: true,
            hoverAnimationBtn: false,
            hoverAnimationBtn_inValue: '0px',
            hoverAnimationBtn_outValue: '-25px',
            wrapper: '.carousel-wrapper',
            slide: '.carousel-slide',
            playButton: '.carousel-btn-play',
            stopButton: '.carousel-btn-stop',
            nextButton: '.carousel-btn-next',
            prevButton: '.carousel-btn-prev',
            pagination: '.carousel-pagination-bullet',
            timerBar: '.carousel-timer-bar'
        };
        var c = this,
            slideTimer,
            o = $.extend(defaults, options),
            $container = $(container),
            $wrapper = $container.find(o.wrapper),
            $slide = $wrapper.find(o.slide),
            maxNum = $slide.size()-1,
            $playButton = $container.find(o.playButton),
            $stopButton = $container.find(o.stopButton),
            $nextButton = $container.find(o.nextButton),
            $prevButton = $container.find(o.prevButton),
            $pagination = $container.find(o.pagination);

        if (o.viewTimerBar) {
            var $timerBar = $container.find(o.timerBar);
        }

        function nextNumber(num, type) {
            if (type == "next") {
                if (num != maxNum) {
                    num++;
                } else {
                    num = 0;
                }
            } else if (type == "prev") {
                if (num != 0) {
                    num--;
                } else {
                    num = maxNum;
                }
            }
            return num;
        }

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        c.init = function() {
            // random view option init
            var viewNo = 0;
            if (o.random) {
                // console.log(getRandom(0, maxNum));
                viewNo = getRandom(0, maxNum);
            }
            // slide size view init
            if (maxNum > 0) {
                $slide.eq(viewNo).addClass('on');
                $pagination.eq(viewNo).addClass('on');
            } else if (maxNum == 0) {
                $slide.eq(0).addClass('on');
                $pagination.hide();
                return false;
            } else {
                $container.hide();
                return false;
            }

            // autoplay(+play, stop) init
            if (o.autoplay) {
                $playButton.addClass('on');
                $stopButton.removeClass('on');
                if (o.viewTimerBar) {
                    $timerBar.stop().css('width', 0).animate({'width': '100%'}, o.timerDur);
                }
                slideTimer = setTimeout(function(){
                    c.render(viewNo, nextNumber(viewNo, "next"), "next");
                }, o.timerDur);
            } else {
                $playButton.removeClass('on');
                $stopButton.addClass('on');
            }

            // btn(prev next) hover event bind
            if (o.hoverAnimationBtn) {
                c.event.hoverAnimation();
            }

            // button event init
            if ($pagination.length > 0) {
                c.event.clickPagination();
            }
            if (($nextButton.length > 0) && ($prevButton.length > 0)) {
                c.event.clickNext();
                c.event.clickPrev();
            }
            if (($playButton.length > 0) && ($stopButton.length > 0)) {
                c.event.clickPlay();
                c.event.clickStop();
            }

            // hover event init
            if (o.slideHover) {
                c.event.hoverSlide();
            }
        };

        c.event = {
            clickPagination: function() {
                $pagination.on('click.clickPagination', function() {
                    var clickIndex = $pagination.index($(this));
                    if ($(this).hasClass('on')) {
                        return false;
                    }
                    c.clickRender("next", clickIndex);
                });
            },
            clickNext: function() {
                $nextButton.on('click.clickNext', function() {
                    c.clickRender("next");
                });
            },
            clickPrev: function() {
                $prevButton.on('click.clickPrev', function() {
                    c.clickRender("prev");
                });
            },
            clickPlay: function() {
                $playButton.on('click.clickPlay', c.play);
            },
            clickStop: function() {
                $stopButton.on('click.clickStop', c.stop);
            },
            hoverSlide: function() {
                $slide.on('mouseenter.hoverSlide', function() {
                    clearTimeout(slideTimer);
                    if (o.viewTimerBar) {
                        $timerBar.stop();
                    }
                });
                $slide.on('mouseleave.hoverSlide', function() {
                    if (o.autoplay) {
                        var onIndex = $wrapper.find(o.slide+'.on').index(),
                            timerDur = o.timerDur/2,
                            timerBarWidth;
                        if (o.viewTimerBar) {
                            // $timerBar[0].style.width
                            timerBarWidth = ($timerBar[0].style.width).replace('%','');
                            timerDur = o.timerDur * (1 - timerBarWidth / 100);
                            //console.log(timerBarWidth, timerDur );
                            $timerBar.stop().animate({'width': '100%'}, timerDur);
                        }
                        slideTimer = setTimeout(function(){
                            c.render(onIndex, nextNumber(onIndex, "next"), "next");
                        }, timerDur);
                    }
                });
            },
            hoverAnimation: function() {
                $container.on('mouseenter.hoverAnimation', function() {
                    $prevButton.stop().animate({left: o.hoverAnimationBtn_inValue}, 200);
                    $nextButton.stop().animate({right: o.hoverAnimationBtn_inValue}, 200);
                });
                $container.on('mouseleave.hoverAnimation', function() {
                    $prevButton.stop().animate({left: o.hoverAnimationBtn_outValue}, 200);
                    $nextButton.stop().animate({right: o.hoverAnimationBtn_outValue}, 200);
                });
            }
        };

        c.clickRender = function(type, nextNum) {
            if ($slide.is(":animated")) {
                return false;
            }
            var onIndex = $wrapper.find(o.slide+'.on').index();
            if (nextNum == null) {
                nextNum = nextNumber(onIndex, type);
            } else {
                if (onIndex > nextNum) {
                    type = "prev";
                }
            }

            c.render(onIndex, nextNum, type);

        };

        c.play = function() {
            var onIndex = $wrapper.find(o.slide+'.on').index();

            if (o.autoplay) {
                return false;
            }
            o.autoplay = true;
            $playButton.addClass('on');
            $stopButton.removeClass('on');
            if (o.viewTimerBar) {
                $timerBar.stop().css('width', 0).animate({'width': '100%'}, o.timerDur);
            }
            slideTimer = setTimeout(function(){
                c.render(onIndex, nextNumber(onIndex, "next"), "next");
            }, o.timerDur);
        };

        c.stop = function() {
            clearTimeout(slideTimer);
            o.autoplay = false;
            $playButton.removeClass('on');
            $stopButton.addClass('on');
            if (o.viewTimerBar) {
                $timerBar.stop().animate({'width': 0}, 300);
            }
        };

        c.render = function(onNum, nextNum, type) {
            clearTimeout(slideTimer);
            if (o.animation) {
                var leftValue = '100%',
                    on_leftValue = '-100%';
                if (type == "prev") {
                    leftValue = '-100%';
                    on_leftValue = '100%';
                }
                $slide.eq(onNum).css('display', 'block').removeClass('on').animate({
                    'left' : on_leftValue
                }, {
                    duration : o.duration,
                    complete : function() {
                        $(this).removeAttr('style');
                        $pagination.eq(onNum).removeClass('on');
                    }
                });
                $slide.eq(nextNum).css('left', leftValue).addClass('on').animate({
                    'left' : 0
                }, {
                    duration : o.duration,
                    complete : function() {
                        $(this).removeAttr('style');
                        $pagination.eq(nextNum).addClass('on');
                    }
                });
            } else {
                $slide.eq(onNum).removeClass('on');
                $pagination.eq(onNum).removeClass('on');
                $slide.eq(nextNum).addClass('on');
                $pagination.eq(nextNum).addClass('on');
            }
            if (o.autoplay) {
                slideTimer = setTimeout(function(){
                    c.render(nextNum, nextNumber(nextNum, "next"), "next");
                }, o.timerDur);
            }
            if (o.viewTimerBar) {
                if (o.autoplay) {
                    $timerBar.stop().css('width', 0).animate({'width': '100%'}, o.timerDur);
                } else {
                    $timerBar.stop().css('width', 0);
                }
            }
        };

        c.init();
    };

    return uit;
});
