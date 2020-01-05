function initVerticalSlider() {
  let slide = 0;

  const slides = document.querySelectorAll('#slides > li');
  const menuSlider = document.querySelector('.slider__menu');
  const numSlides = slides.length;

  slides[0].classList.add('slideActive');

  const setCurrentSlide = () => {
    const itemToShow = Math.abs(slide % numSlides);

    slides.forEach(el => {
      el.classList.remove('slideActive');
    });

    slides[itemToShow].classList.add('slideActive');
  };

  const next = () => {
    slide += 1;
    setCurrentSlide();
  };

  const prev = () => {
    slide -= 1;
    setCurrentSlide();
  };

  menuSlider.addEventListener('click', ({ target }) => {
    const sliderItem = target.closest('.slider__menu--item');
    slide = Number(sliderItem.dataset.sliderId) - 1;
    setCurrentSlide();
  });

  // setInterval(next, 10000);

  document.querySelector('#next').addEventListener('click', next);
  document.querySelector('#previous').addEventListener('click', prev);
}

module.exports = initVerticalSlider;
