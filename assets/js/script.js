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
    bit.initOnlineBlock();
    bit.initScrollEvents();
    bit.initScrollAnimation();
    bit.initSchedule();
    bit.initTestimonialsSlider();
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

    let typedBlock = document.querySelector('.typed_js');
    if (typedBlock) var typed = new Typed('.typed_js', options);
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

    let navItems = document.querySelectorAll('.main_nav_click_js a');

    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('body').classList.remove('active-menu');
        document.querySelector('.main_nav_click_js a.active').classList.remove('active');
        item.classList.add('active');
        let target = document.querySelector('[id="' + item.dataset.target + '"]').offsetTop - 62;
        item.dataset.target == 1 ? window.scrollTo({ 'top': 0 }) : window.scrollTo({ 'top': target });
      });
    });
    document.querySelector('.main-header__logo').addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ 'top': 0 });
      document.querySelector('.scroll_nav_js a.active').classList.remove('active');
      document.querySelector('.scroll_nav_js li:nth-of-type(1) a').classList.add('active');
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
    onlineToggleBtn && onlineToggleBtn.addEventListener('click', el => {
      el.target.closest('.online-block').classList.toggle('active');
    });

    setTimeout(function () {
      if (!onlineToggleBtn) return false;
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

        comments.forEach((comment, i) => {
          comment.index = i;
        })

        let elIndex = thisEl.index + 1;

        document.querySelector('.comment_text_js.active').classList.remove('active');
        document.querySelector(`.comment_text_js:nth-child(${elIndex}n)`).classList.add('active');
        document.querySelector(`.comment_text_js:nth-child(${elIndex}n)`).style.display = "block"; // no animation

        let img = `url(${thisEl.dataset.fullImg})`;
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
      item.addEventListener('click', function () {
        document.querySelector('.mentors-block__tab.active').classList.remove('active');
        item.classList.add('active');
        document.querySelector('.mentors-block__slider.active').classList.remove('active');
        document.querySelector(`.mentors-block__slider:nth-of-type(${(i + 1)})`).classList.add('active');
      });
    });
  },

  initTeamSlider: () => {
    let teamSlider = document.querySelector('.our_team_slider_js');

    if (!teamSlider) return false;

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
        }, {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        }, {
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

    if (!mentorsSlider) return false;

    mentorsSlider.forEach((slider, i) => {
      slider.insertAdjacentHTML('afterend', `<div class="dots_block_${i + 1}"></div>`);
      new Glider(slider, {
        dots: '.dots_block_' + (i + 1),
        slidesToScroll: 1,
        draggable: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            }
          }, {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          }, {
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
    if (!targetItems) return false;

    document.addEventListener('scroll', () => {
      targetItems.forEach(item => {
        if (window.scrollY >= item.offsetTop - 62 && window.scrollY < item.offsetTop + item.offsetHeight) {
          document.querySelector('.scroll_nav_js a.active').classList.remove('active');
          document.querySelector('.scroll_nav_js a[data-target="' + item.id + '"]').classList.add('active');
        }
      });
    });
  },

  initOnlineBlock: () => {
    let onlineBlock = document.querySelector('.online-block');
    onlineBlock && onlineBlock.addEventListener('mouseenter', () => {
      onlineBlock.classList.remove('hidden');
    });
  },

  initScrollEvents: () => {
    let header = document.querySelector('.header_js');
    let mainHeader = document.querySelector('.main-nav');
    let onlineBlock = document.querySelector('.online-block');

    document.addEventListener('scroll', () => {
      if (!onlineBlock) return false;
      window.scrollY > 23 ? header.classList.add('active') : header.classList.remove('active');
      if (window.scrollY > 100) document.querySelector('.online-block').classList.remove('active');

      let bottom = window.scrollY + window.innerHeight + document.querySelector('.main-footer').offsetHeight;

      if (bottom + 20 > document.body.clientHeight) {
        var offsetBottom = bottom - document.body.clientHeight;

        document.querySelector('.online-block').style.transform = `translateY(${-offsetBottom}px)`;
      } else {
        document.querySelector('.online-block').style.transform = `translateY(0px)`;
      }

      if (window.scrollY > window.innerHeight || window.innerWidth < 600) {
        document.querySelector('.online-block').classList.add('hidden');
      } else {
        document.querySelector('.online-block').classList.remove('hidden');
      }
    });

    document.addEventListener('scroll', () => {
      if (!mainHeader) return false;
      let bottom = window.scrollY + window.innerHeight + document.querySelector('.main-footer').offsetHeight;

      if (bottom + 20 > document.body.clientHeight) {
        var offsetBottom = bottom - document.body.clientHeight;
        if (mainHeader) mainHeader.style.transform = `translateY(${-offsetBottom}px)`;
      } else {
        if (mainHeader) mainHeader.style.transform = `translateY(0px)`;
      }
    });


  },

  initCounter: function (self) {
    for (let to = 0; to <= parseInt(self.dataset.count); to++) {
      setTimeout(() => {
        self.innerHTML = to;
      }, to * 80, to);
    }
  },

  initScrollAnimation: () => {
    let animateBlock = document.querySelectorAll('.ab');

    function animate() {
      let animOffset = window.innerHeight / 1.3;

      animateBlock.forEach(item => {
        if (item.classList.contains('ab--b')) {
          if (item.getBoundingClientRect().y - animOffset < 0 || item.classList.contains('instant')) {
            item.classList.remove('ab--b');
            if (item.classList.contains('animate_count')) {
              var self = item;
              setTimeout(function () {
                bit.initCounter(self);
              }, 400);
            }
          }
        }
      });


      let bg = document.querySelectorAll('.bg__js');
      bg.forEach(item => {
        if (item.classList.contains('instant')) {
          let dataImg = item.dataset.img;
          item.style.backgroundImage = `url(${dataImg})`;
        }
        if (!item.classList.contains('bg_done')) {
          if (item.getBoundingClientRect().y - window.innerHeight * 2 < 0) {
            if (!item.classList.contains('img')) {
              let dataImg = item.dataset.img;
              let imgBg = `url(${dataImg})`;
              item.style.backgroundImage = imgBg;
            } else {
              let imgBg = item.dataset.img;
              item.setAttribute('src', imgBg)
            }

            item.classList.add('bg_done');
          }
        }
      });
    }

    document.addEventListener('scroll', () => {
      animate();
    });

    setTimeout(function () {
      animate();
    }, 800);
  },

  initSchedule: () => {
    let dateItem = document.querySelectorAll('.schedule__tab');

    dateItem.forEach((item, i) => {
      item.addEventListener('click', () => {
        document.querySelector('.schedule__tab.active').classList.remove('active');
        item.classList.add('active');
        document.querySelector('.schedule__day.active').classList.remove('active');
        document.querySelector(`.schedule__day:nth-child(${i + 1}n)`).classList.add('active');
      });
    });
  },

  initTestimonialsSlider: () => {
    let testimonialsSlider = document.querySelectorAll('.testimonials_slider_js');

    if (!testimonialsSlider) return false;

    testimonialsSlider.forEach((slider, i) => {
      slider.insertAdjacentHTML('afterend', `<div class="dots_block_${i + 1}"></div>`);
      new Glider(slider, {
        dots: '.dots_block_' + (i + 1),
        slidesToScroll: 1,
        draggable: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            }
          }, {
            breakpoint: 1300,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
      });
    });
  }

}

bit.init();
