const CLASSNAMES = {
  ACTIVE_SIDEBAR: 'section__sidebar--isActive'
};

const handleMenuItemSelection = () => {
  const menus = document.querySelectorAll('.menu__list');

  menus.forEach(menu => {
    const parentSection = menu.closest('section');

    const activeItem = parentSection.querySelector(
      `[data-item-parent='${parentSection.id}']`
    );

    activeItem.classList.add('menu__item--isActive');
  });
};

const handleMobileMenuVisibility = () => {
  const hamburgerButton = document.querySelector('#hamburger');
  const menuWrapper = document.querySelector('.js-section__sidebar');

  hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('hamburger--isActive');
    menuWrapper.classList.toggle(CLASSNAMES.ACTIVE_SIDEBAR);
  });
};

const handleMobileMenuClick = () => {
  const firstMenu = document.querySelector('.menu__list');
  const firstSection = document.querySelector('.section__sidebar');

  firstMenu.addEventListener('click', ev => {
    if (
      ev.target.closest('.menu__item') &&
      firstSection.classList.contains(CLASSNAMES.ACTIVE_SIDEBAR)
    ) {
      firstSection.classList.remove(CLASSNAMES.ACTIVE_SIDEBAR);
    }
  });
};

const initMenu = () => {
  handleMenuItemSelection();
  handleMobileMenuVisibility();
  handleMobileMenuClick();
};

module.exports = initMenu;
