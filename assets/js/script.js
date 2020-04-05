(function ($) {
  'use strict';

  window.bit = $.extend(
    {},
    {
      winWidth: $(window).width(),
      winHeight: $(window).height(),
      winScroll: $(window).scrollTop(),

      init: function () {
        $(window).scroll(function () {
          bit.winScroll = $(window).scrollTop();
        });

        $(window).resize(function () {
          bit.winWidth = $(window).width();
          bit.winHeight = $(window).height();
          bit.winScroll = $(window).scrollTop();
        });

        bit.initMenu();
        bit.initScrollAnimation();
        bit.initScripts();
        bit.initSlider();
        bit.initTyped();
      },

      initMenu: function () {
        var btn = $('.mobile_menu_js');
        btn.on('click', function () {
          $('body').toggleClass('active-menu');
        });
        $(document).on('click tap', function (e) {
          var container = $('.mob-menu, .mobile_menu_js');
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('body').removeClass('active-menu');
          }
        });
      },

      counter: function (self) {
        self.each(function () {
          var $el = $(this),
            countTo = $el.attr('data-count') * 1;
          $({ someValue: 0 }).animate(
            { someValue: countTo },
            {
              duration: 2000,
              easing: 'swing',
              step: function () {
                $el.text(commaSeparateNumber(Math.round(this.someValue)));
              },
              complete: function () {
                $el.text(this.countNum);
                $el.addClass('done');
                setTimeout(function () {
                  $el.removeClass('done');
                }, 400);
              },
            },
          );
          function commaSeparateNumber(val) {
            while (/(\d+)(\d{3})/.test(val.toString())) {
              val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ');
            }
            return val;
          }
        });
      },

      initScrollAnimation: function () {
        var animateBlock = $('.ab');

        function animate() {
          var winWidth = $(window).width();
          var winHeight = $(window).height();
          var winScroll = $(window).scrollTop();
          var animOffset = $(window).height() / 1.3;

          animateBlock.each(function () {
            var offset = $(this).offset().top;
            if ($(this).hasClass('ab--b')) {
              if (
                offset <= winScroll + animOffset ||
                $(this).hasClass('instant')
              ) {
                $(this).removeClass('ab--b');
                if ($(this).hasClass('animate_count')) {
                  var self = $(this);
                  setTimeout(function () {
                    bit.counter(self);
                  }, 400);
                }
              }
            }
          });

          var bg = $('.bg__js');
          bg.each(function () {
            var offset = $(this).offset().top;

            if ($(this).hasClass('instant')) {
              $(this).css(
                'background-image',
                'url(' + $(this).data('img') + ')',
              );
            }

            var newOffset = 1.001;
            if (winScroll > 10) {
              newOffset = 0.5;
            }
            if (!$(this).hasClass('bg_done')) {
              if (offset <= winScroll + $(window).height() / newOffset) {
                if (!$(this).hasClass('img')) {
                  var imgBg = 'url(' + $(this).data('img') + ')';
                  $(this).css('background-image', imgBg);
                } else {
                  var imgBg = $(this).data('img');
                  $(this).attr('src', imgBg);
                }

                $(this).addClass('bg_done');
              }
            }
          });
        }

        var header = $('.header_js');

        $(window).scroll(function () {
          animate();
          if (bit.winScroll > 23) {
            header.addClass('active');
          } else {
            header.removeClass('active');
          }
          if (bit.winScroll > 100) {
            $('.online-block').removeClass('active');
          }

          var bottom =
            bit.winScroll + bit.winHeight + $('.main-footer').height();

          if (bottom + 20 > $(document).height()) {
            var offsetBottom = bottom - $(document).height();
            $('.main_nav_js, .online-block').css(
              'transform',
              'translateY(' + -offsetBottom + 'px)',
            );
          } else {
            $('.main_nav_js, .online-block').css(
              'transform',
              'translateY(0px)',
            );
          }

          if (bit.winScroll > bit.winHeight || bit.winWidth < 600) {
            $('.online-block').addClass('hidden');
          } else {
            $('.online-block').removeClass('hidden');
          }
        });

        $('.online-block').on('mouseenter touchstart', function () {
          $(this).removeClass('hidden');
        });

        $('.main_nav_js a').on('click', function (e) {
          e.preventDefault();
          $('body').removeClass('active-menu');
          $('.main_nav_js a').removeClass('active');
          $(this).addClass('active');
          var target = $('#' + $(this).data('target')).offset().top - 62;
          if ($(this).closest('li').index() == 0) {
            target = 0;
          }
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: target,
            },
            600,
          );
        });

        $(window).on('scroll', function () {
          $('.target').each(function () {
            if (
              $(window).scrollTop() >= $(this).offset().top - 62 &&
              $(window).scrollTop() < $(this).offset().top + $(this).height()
            ) {
              $('.main-nav a').removeClass('active');
              $(
                '.main-nav a[data-target="' + $(this).attr('id') + '"]',
              ).addClass('active');
            }
          });
        });

        setTimeout(function () {
          animate();
        }, 800);
      },

      initScripts: function () {
        var btn = $('.read_more__js');

        btn.on('click', function () {
          if (!$(this).hasClass('active')) {
            $(this).addClass('active').html($(this).data('hide'));
            $(this).prev('.hidden_js').slideDown();
          } else {
            $(this).removeClass('active').html($(this).data('show'));
            $(this).prev('.hidden_js').slideUp();
          }
        });

        var questionBtn = $('.question__btn, .question__text');

        questionBtn.on('click', function () {
          var question = $(this).closest('.question');
          if (!question.hasClass('active')) {
            question.addClass('active');
            question.find('.question__inner').slideDown();
          } else {
            question.removeClass('active');
            question.find('.question__inner').slideUp();
          }
        });

        var onlineToggleBtn = $('.online_toggle_js');
        onlineToggleBtn.on('click', function () {
          $(this).closest('.online-block').toggleClass('active');
        });

        setTimeout(function () {
          $('.online-block').addClass('visible');
          $('.online-block').removeClass('hidden');
        }, 2000);

        $('.comment_js').on('click', function () {
          if ($(this).hasClass('active')) return false;
          $(this).addClass('active').siblings().removeClass('active');
          $('.comment_text_js').slideUp();
          var index = $(this).index() + 1;
          $('.comment_text_js:nth-of-type(' + index + ')').slideDown();

          var img = 'url(' + $(this).data('full-img') + ')';
          var name = $(this).data('name');
          var position = $(this).data('position');

          $('.review_img_js').css('background-image', img);
          $('.review_name_js').html(name);
          $('.review_position_js').html(position);
        });
      },

      initSlider: function () {
        var teamSlider = $('.our_team_slider_js');

        teamSlider.slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 960,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 660,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });

        var mentorsSlider = $('.mentors_slider_js');

        mentorsSlider.slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 960,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 660,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });

        $('.tabs_js .mentors-block__tab').on('click', function () {
          $(this).addClass('active').siblings().removeClass('active');
          $('.mentors_slider_js').removeClass('active');
          var index = $(this).index() + 1;
          $('.mentors_slider_js:nth-of-type(' + index + ')').addClass('active');
        });
      },

      initTyped: function () {
        var options = {
          strings: [
            'for students',
            'for cats',
            'for developers',
            'for housewives',
            'for switchers',
          ],
          loop: true,
          typeSpeed: 40,
          backSpeed: 40,
          backDelay: 1500,
        };

        var typed = new Typed('.typed_js', options);
      },
    },
  );

  bit.init();
})(jQuery);

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
