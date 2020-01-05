const handleReadMoreClick = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.classList.contains('read-more')) {
      const textContainer = document.querySelector(
        `[data-collapsed-text='${target.dataset.parent}']`
      );

      if (textContainer) {
        textContainer.classList.toggle('collapsed__text--show');

        if (textContainer.classList.contains('collapsed__text--show')) {
          target.innerHTML = 'Hide';
        } else {
          target.innerHTML = 'Read more';
        }
      }
    }
  });
};
module.exports = handleReadMoreClick;
