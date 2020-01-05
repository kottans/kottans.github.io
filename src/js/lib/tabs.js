function initiateTabs() {
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
    const bindAll = () => {
      const menuElements = document.querySelectorAll('[data-tab-name]');
      
      for (let i = 0; i < menuElements.length; i++) {
        menuElements[i].addEventListener('click', change, false);
      }
    };

    bindAll();
  }
}
module.exports = initiateTabs;
