function scrollableTabs() {
  const SETTINGS = {
    navBarTravelling: false,
    navBarTravelDirection: '',
    navBarTravelDistance: 150,
  };

  const colours = {
    0: '#867100',
    1: '#7F4200',
    2: '#99813D',
    3: '#40FEFF',
    4: '#14CC99',
    5: '#00BAFF',
    6: '#0082B2',
  };

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('JS');

  const pnLeft = document.getElementById('mentor__btnLeft-pn');
  const pnRight = document.getElementById('mentor__btnRight-pn');
  const pnIndicator = document.getElementById('mentor__indicator-pn');

  const pnMentorNav = document.getElementById('mentor__nav');
  const pnMentorNavContents = document.getElementById('mentor___nav-contents');

  const determineOverflow = (content, container) => {
    const containerMetrics = container.getBoundingClientRect();
    const containerMetricsRight = Math.floor(containerMetrics.right);
    const containerMetricsLeft = Math.floor(containerMetrics.left);
    const contentMetrics = content.getBoundingClientRect();
    const contentMetricsRight = Math.floor(contentMetrics.right);
    const contentMetricsLeft = Math.floor(contentMetrics.left);
    if (
      containerMetricsLeft > contentMetricsLeft &&
      containerMetricsRight < contentMetricsRight
    ) {
      return 'both';
    }
    if (contentMetricsLeft < containerMetricsLeft) {
      return 'left';
    }
    if (contentMetricsRight > containerMetricsRight) {
      return 'right';
    }
    return 'none';
  };

  const moveIndicator = (item, color) => {
    const textPosition = item.getBoundingClientRect();
    const container = pnMentorNavContents.getBoundingClientRect().left;
    const distance = textPosition.left - container;
    const scroll = pnMentorNavContents.scrollLeft;
    pnIndicator.style.transform = `translateX(${distance +
      scroll}px) scaleX(${textPosition.width * 0.01})`;
    if (color) {
      pnIndicator.style.backgroundColor = color;
    }
  };

  pnMentorNav.setAttribute(
    'data-overflowing',
    determineOverflow(pnMentorNavContents, pnMentorNav)
  );

  moveIndicator(
    pnMentorNav.querySelector('[aria-selected="true"]'),
    colours[0]
  );

  let lastKnownScrollPosition = 0;
  let ticking = false;

  function doSomething() {
    pnMentorNav.setAttribute(
      'data-overflowing',
      determineOverflow(pnMentorNavContents, pnMentorNav)
    );
  }

  pnMentorNav.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        doSomething(lastKnownScrollPosition);
        ticking = false;
      });
    }
    ticking = true;
  });

  pnLeft.addEventListener('click', () => {
    if (SETTINGS.navBarTravelling === true) {
      return;
    }
    if (
      determineOverflow(pnMentorNavContents, pnMentorNav) === 'left' ||
      determineOverflow(pnMentorNavContents, pnMentorNav) === 'both'
    ) {
      const availableScrollLeft = pnMentorNav.scrollLeft;
      if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
        pnMentorNavContents.style.transform = `translateX(${availableScrollLeft}px)`;
      } else {
        pnMentorNavContents.style.transform = `translateX(${SETTINGS.navBarTravelDistance}px)`;
      }
      pnMentorNavContents.classList.remove(
        'mentor__nav_Contents-no-transition'
      );
      SETTINGS.navBarTravelDirection = 'left';
      SETTINGS.navBarTravelling = true;
    }
    pnMentorNav.setAttribute(
      'data-overflowing',
      determineOverflow(pnMentorNavContents, pnMentorNav)
    );
  });

  pnRight.addEventListener('click', () => {
    if (SETTINGS.navBarTravelling === true) {
      return;
    }
    if (
      determineOverflow(pnMentorNavContents, pnMentorNav) === 'right' ||
      determineOverflow(pnMentorNavContents, pnMentorNav) === 'both'
    ) {
      const navBarRightEdge = pnMentorNavContents.getBoundingClientRect().right;
      const navBarScrollerRightEdge = pnMentorNav.getBoundingClientRect().right;
      const availableScrollRight = Math.floor(
        navBarRightEdge - navBarScrollerRightEdge
      );
      if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
        pnMentorNavContents.style.transform = `translateX(-${availableScrollRight}px)`;
      } else {
        pnMentorNavContents.style.transform = `translateX(-${SETTINGS.navBarTravelDistance}px)`;
      }
      pnMentorNavContents.classList.remove(
        'mentor__nav_Contents-no-transition'
      );
      SETTINGS.navBarTravelDirection = 'right';
      SETTINGS.navBarTravelling = true;
    }
    pnMentorNav.setAttribute(
      'data-overflowing',
      determineOverflow(pnMentorNavContents, pnMentorNav)
    );
  });

  pnMentorNavContents.addEventListener(
    'transitionend',
    () => {
      const styleOfTransform = window.getComputedStyle(
        pnMentorNavContents,
        null
      );
      const tr =
        styleOfTransform.getPropertyValue('-webkit-transform') ||
        styleOfTransform.getPropertyValue('transform');
      const amount = Math.abs(parseInt(tr.split(',')[4], 10) || 0);
      pnMentorNavContents.style.transform = 'none';
      pnMentorNavContents.classList.add('mentor__nav__Contents-no-transition');
      // Now lets set the scroll position
      if (SETTINGS.navBarTravelDirection === 'left') {
        pnMentorNav.scrollLeft -= amount;
      } else {
        pnMentorNav.scrollLeft += amount;
      }
      SETTINGS.navBarTravelling = false;
    },
    false
  );

  pnMentorNavContents.addEventListener('click', e => {
    const links = [].slice.call(document.querySelectorAll('.mentor__nav-link'));
    links.forEach(item => {
      item.setAttribute('aria-selected', 'false');
    });
    e.target.setAttribute('aria-selected', 'true');
    moveIndicator(e.target, colours[links.indexOf(e.target)]);
  });

  function Tabs() {
    const clear = () => {
      const menuElements = document.querySelectorAll('[data-tab]');
      for (let i = 0; i < menuElements.length; i++) {
        menuElements[i].classList.remove('active');
        const id = menuElements[i].getAttribute('data-tab');
        document.getElementById(id).classList.remove('active');
      }
    };

    const change = e => {
      clear();
      e.target.classList.add('active');
      const id = e.currentTarget.getAttribute('data-tab');
      document.getElementById(id).classList.add('active');
    };

    const bindAll = () => {
      const menuElements = document.querySelectorAll('[data-tab]');
      for (let i = 0; i < menuElements.length; i++) {
        menuElements[i].addEventListener('click', change);
      }
    };

    bindAll();
  }

  // TODO: consider using of Tabs
  const connectTabs = new Tabs(); // eslint-disable-line
}
module.exports = scrollableTabs;
