function tabs() {
  const currentItem = document.querySelector('.review__current');
  const elements = document.querySelectorAll('.review__item');
  
  const options = {
    root: document.querySelector('.review__feed'),
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentItem.innerHTML = `0${entry.target.dataset.id}`;
      }
    });
  }, options);


  elements.forEach(element => observer.observe(element));
}

module.exports = tabs;
