const initMenu = () => {
  const mobileMenu = document.querySelector('.mobile_menu_js');

  mobileMenu.addEventListener('click', () => {
    document.body.classList.toggle('active-menu');
  })

  document.addEventListener('click', ev => {
    const container = document.querySelector('.mob-menu, .mobile_menu_js');

    if (container !== ev.target && !container.contains(ev.target)) {
      document.body.classList.remove('active-menu')
    }
  })
}

const initScripts = () => {
  let btns = document.querySelectorAll('.read_more__js');

  for (const btn of btns) {
    btn.addEventListener('click', el => {
      let thisEl = el.target;
      if (!thisEl.classList.contains('active')) {
        thisEl.classList.add('active');
        thisEl.innerHTML = thisEl.dataset.hide;
        thisEl.previousElementSibling.style.display = "block"; // no animation
      } else {
        thisEl.classList.remove('active')
        thisEl.innerHTML = thisEl.dataset.show;
        thisEl.previousElementSibling.style.display = "none"; // no animation
      }
    });
  }
  
  let questionBtns = document.querySelectorAll('.question_js');
  for (const questionBtn of questionBtns) {
    questionBtn.addEventListener('click', el => {
      el.preventDefault();
      let question = el.target.closest('.question');
      if (!question.classList.contains('active')) {
        question.classList.add('active');
        question.querySelector('.question__inner').style.display = "block"; // no animation
      } else {
        question.classList.remove('active');
        question.querySelector('.question__inner').style.display = "none"; // no animation
      }
    });
  }

  let onlineToggleBtn = document.querySelector('.online_toggle_js');
  onlineToggleBtn.addEventListener('click', el => {
    el.target.closest('.online-block').classList.toggle('active');
  });

  setTimeout(function () {
    document.querySelector('.online-block').classList.add('visible');
    document.querySelector('.online-block').classList.remove('hidden');
  }, 2000);

  let comments = document.querySelectorAll('.comment_js');
  for (const comment of comments) {
    comment.addEventListener('click', el => {
      let thisEl = el.target.closest('.comment_js');
      if (thisEl.classList.contains('active')) return false;

      var activeEl = document.querySelector(".comment_js.active");
      activeEl.classList.remove('active');
      
      thisEl.classList.add('active');

      document.querySelector('.comment_text_js').style.display = "none"; // no animation

      // var index = el.index + 1;
      // $('.comment_text_js:nth-of-type(' + index + ')').slideDown();
  
      // var img = 'url(' + thisEl.data('full-img') + ')';
      // var name = thisEl.data('name');
      // var position = thisEl.data('position');
  
      // $('.review_img_js').css('background-image', img);
      // $('.review_name_js').html(name);
      // $('.review_position_js').html(position);
    });
  }
  
  
}


initScripts();
initMenu();

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
        bit.initScrollAnimation();
        bit.initSlider();
        bit.initTyped();
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

