const applyHorizontalScrollHandler = () => {
  let previousWheelData = 0;
  let wasTouched = false;

  const scrollHorizontally = ev => {
    const activeTab = ev.target.closest('.b-tab.active');
    const isHorizontalScroll = ev.wheelDeltaY === previousWheelData;

    /**
     * Browser will handle horizontal scroll by itself.
     * As well as touch events on mobile, tablets, etc.
     */

    if (!activeTab || isHorizontalScroll || wasTouched) {
      previousWheelData = ev.wheelDeltaY;
      return;
    }

    ev.preventDefault();

    const isMac = navigator.userAgent.includes('Macintosh');
    const mentorContainer = activeTab.querySelector('.mentor__container');

    if (isMac) {
      mentorContainer.scrollLeft -= ev.wheelDelta;
    } else {
      mentorContainer.scrollLeft += ev.wheelDelta;
    }
  };

  document
    .getElementById('mentor')
    .addEventListener('wheel', scrollHorizontally);

  document.addEventListener('touchstart', () => {
    wasTouched = true;
  });

  document.addEventListener('touchend', () => {
    wasTouched = false;
  });
};

const initiateTabs = () => {
  const clear = () => {
    const menuElements = document.querySelectorAll('[data-tab-name]');

    for (let i = 0; i < menuElements.length; i++) {
      menuElements[i].classList.remove('core__tabsButton--isActive');
      const id = menuElements[i].getAttribute('data-tab-name');
      document
        .getElementById(id)
        .classList.remove('core__tabsContent--isActive');
    }
  };

  const change = e => {
    clear();
    e.target.classList.add('core__tabsButton--isActive');
    const id = e.currentTarget.getAttribute('data-tab-name');
    document.getElementById(id).classList.add('core__tabsContent--isActive');
  };

  if (window.innerWidth < 768) {
    const menuElements = document.querySelectorAll('[data-tab-name]');
    menuElements.forEach(elem => elem.addEventListener('click', change));
  }
  applyHorizontalScrollHandler();
};
module.exports = initiateTabs;
