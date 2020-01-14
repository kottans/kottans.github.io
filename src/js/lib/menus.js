const CLASSNAMES = {
  ACTIVE_SIDEBAR: 'section__sidebar--isActive',
  VISIBLE_MOBILE_MENU: 'mobile__menu--visible',
  MOBILE_MENU_CONTAINER: 'mobile__menu__container',
  ACTIVE_HAMBURGER_BUTTON: 'hamburger--isActive',
  MENU: 'menu',
  MENU_ITEM: 'menu__item',
  ACTIVE_MENU_ITEM: 'menu__item--isActive'
};

const SECTIONS = {
  HERO: 'hero'
};

const hamburgerButton = document.querySelector('#hamburger');

const markAsActive = parentId => {
  const activeItems = document.querySelectorAll(
    `.${CLASSNAMES.ACTIVE_MENU_ITEM}`
  );

  activeItems.forEach(menuItem =>
    menuItem.classList.remove(CLASSNAMES.ACTIVE_MENU_ITEM)
  );

  const shouldBeActive = document.querySelectorAll(
    `[data-item-parent='${parentId}']`
  );

  shouldBeActive.forEach(menuItem => {
    menuItem.classList.add(CLASSNAMES.ACTIVE_MENU_ITEM);
  });
};

const handleMenuItemSelection = () => {
  document.addEventListener('click', ({ target }) => {
    const menuItem = target.closest(`.${CLASSNAMES.MENU_ITEM}`);

    if (!menuItem) {
      return;
    }

    markAsActive(menuItem.dataset.itemParent);
  });
};

const markActiveOnStart = () => {
  const { hash } = window.location;

  if (!hash) {
    markAsActive(SECTIONS.HERO);
  } else {
    const parentSection = hash.slice(1);
    markAsActive(parentSection);
  }
};

const handleHamburgerClick = () => {
  const menuWrapper = document.querySelector(`.${CLASSNAMES.MENU}`);

  hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle(CLASSNAMES.ACTIVE_HAMBURGER_BUTTON);
    menuWrapper.classList.toggle(CLASSNAMES.VISIBLE_MOBILE_MENU);
  });
};

const handleMobileMenuItemClick = () => {
  const mobileMenu = document.querySelector(
    `.${CLASSNAMES.MOBILE_MENU_CONTAINER}`
  );
  const menu = mobileMenu.querySelector(`.${CLASSNAMES.MENU}`);

  mobileMenu.addEventListener('click', ev => {
    if (
      ev.target.closest(`.${CLASSNAMES.MENU_ITEM}`) &&
      menu.classList.contains(CLASSNAMES.VISIBLE_MOBILE_MENU)
    ) {
      menu.classList.remove(CLASSNAMES.VISIBLE_MOBILE_MENU);
      hamburgerButton.classList.remove(CLASSNAMES.ACTIVE_HAMBURGER_BUTTON);
    }
  });
};

const initMenu = () => {
  markActiveOnStart();
  handleMenuItemSelection();
  handleHamburgerClick();
  handleMobileMenuItemClick();
};

module.exports = initMenu;
