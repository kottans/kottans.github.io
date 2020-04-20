'use strict';

window.bit = {
    init: () => {
      bit.initTyped();
      bit.initMenu();
      bit.initReadMoreToggle();
      bit.initQuestionToggle();
      bit.initOnlineToggle();
      bit.initComments();
      bit.initMentors();
      bit.initTeamSlider();
      bit.initMentorsSlider();
      bit.initScrollTarget();
    },

    initTyped: () => {
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

    initMenu: () => {
      const mobileMenu = document.querySelector('.mobile_menu_js');

      mobileMenu.addEventListener('click', () => {
        document.body.classList.toggle('active-menu');
      })

      document.addEventListener('click', ev => {
        const container = document.querySelector('.mob-menu, .mobile_menu_js');

        if (container !== ev.target && !container.contains(ev.target)) {
          document.body.classList.remove('active-menu')
        }
      });
    },

    initReadMoreToggle: () => {
      let btns = document.querySelectorAll('.read_more__js');

      btns.forEach(btn => {
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
      });
    },

    initQuestionToggle: () => {
      let questionBtns = document.querySelectorAll('.question_js');

      questionBtns.forEach(questionBtn => {
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
      });
    },

    initOnlineToggle: () => {
      let onlineToggleBtn = document.querySelector('.online_toggle_js');
      onlineToggleBtn.addEventListener('click', el => {
        el.target.closest('.online-block').classList.toggle('active');
      });

      setTimeout(function () {
        document.querySelector('.online-block').classList.add('visible');
        document.querySelector('.online-block').classList.remove('hidden');
      }, 2000);
    },

    initComments: () => {
      let comments = document.querySelectorAll('.comment_js');

      comments.forEach(comment => {
        comment.addEventListener('click', el => {
          let thisEl = el.target.closest('.comment_js');
          if (thisEl.classList.contains('active')) return false;

          var activeEl = document.querySelector(".comment_js.active");
          activeEl.classList.remove('active');

          thisEl.classList.add('active');

          document.querySelector('.comment_text_js.active').style.display = "none"; // no animation

          for(i=0; i < comments.length; i++) {
            comments[i].index = i;
          }

          let elIndex = thisEl.index + 1;

          document.querySelector('.comment_text_js.active').classList.remove('active');
          document.querySelector('.comment_text_js:nth-child('+elIndex+'n)').classList.add('active');
          document.querySelector('.comment_text_js:nth-child('+elIndex+'n)').style.display = "block"; // no animation

          let img = 'url(' + thisEl.dataset.fullImg + ')';
          let name = thisEl.dataset.name;
          let position = thisEl.dataset.position;

          document.querySelector('.review_img_js').style.backgroundImage = img;
          document.querySelector('.review_name_js').innerHTML = name;
          document.querySelector('.review_position_js').innerHTML = position;
        });
      });
    },

    initMentors: () => {
      let mentorTab = document.querySelectorAll('.tabs_js .mentors-block__tab');

      mentorTab.forEach((item, i) => {
        item.addEventListener('click', function(){
          document.querySelector('.mentors-block__tab.active').classList.remove('active');
          item.classList.add('active');
          document.querySelector('.mentors-block__slider.active').classList.remove('active');
          document.querySelector('.mentors-block__slider:nth-of-type(' + (i + 1) + ')').classList.add('active');
        });
      });
    },

    initTeamSlider: () => {
      let teamSlider = document.querySelector('.our_team_slider_js');

      new Glider(teamSlider, {
        dots: '.dots-block',
        draggable: true,
        responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },{
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          }
        }
      ]
      });
    },

    initMentorsSlider: () => {
      let mentorsSlider = document.querySelectorAll('.mentors_slider_js');

      mentorsSlider.forEach((slider, i) => {
        slider.insertAdjacentHTML('afterend', '<div class="dots_block_'+(i+1)+'"></div>');
        new Glider(slider, {
          dots: '.dots_block_'+ (i+1),
          slidesToScroll: 1,
          draggable: true,
          responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            }
          },{
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          },{
            breakpoint: 1300,
            settings: {
              slidesToShow: 4,
            }
          }
        ]
        });
      });
    },

    initScrollTarget: () => {
      let targetItems = document.querySelectorAll('.target');
      document.addEventListener('scroll', () => {
        targetItems.forEach(item => {
            if (window.scrollY >= item.offsetTop - 62 && window.scrollY < item.offsetTop + item.offsetHeight){
                  document.querySelector('.main-nav a.active').classList.remove('active');
                  document.querySelector('.main-nav a[data-target="' + item.id + '"]').classList.add('active');
            }
        });
      });
    }

}

bit.init();




(function ($) {
  'use strict';

  window.bit = $.extend(
    {},
    {
      init: function () {
        bit.initScrollAnimation();
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
          var animOffset = $(window).height() / 1.3;

          animateBlock.each(function () {
            var offset = $(this).offset().top;
            if ($(this).hasClass('ab--b')) {
              if (
                offset <= window.scrollY + animOffset ||
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
            if (window.scrollY > 10) {
              newOffset = 0.5;
            }
            if (!$(this).hasClass('bg_done')) {
              if (offset <= window.scrollY + $(window).height() / newOffset) {
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
          if (window.scrollY > 23) {
            header.addClass('active');
          } else {
            header.removeClass('active');
          }
          if (window.scrollY > 100) {
            $('.online-block').removeClass('active');
          }

          var bottom =
            window.scrollY + window.innerHeight + $('.main-footer').height();

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

          if (window.scrollY > window.innerHeight || window.innerWidth < 600) {
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

        setTimeout(function () {
          animate();
        }, 800);
      },

    },
  );

  bit.init();
})(jQuery);
