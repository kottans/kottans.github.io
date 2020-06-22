function initVerticalSlider() {
  let slide = 0;

  const slides = document.querySelectorAll('.js-slider__item');
  const menuSlider = document.querySelector('.js-menuSlider__list');
  const numSlides = slides.length;

  const setCurrentSlide = () => {
    const itemToShow = Math.abs(slide % numSlides);

    slides.forEach(el => {
      el.classList.remove('slider__item--active');
    });

    slides[itemToShow].classList.add('slider__item--active');
  };

  const next = () => {
    slide += 1;
    setCurrentSlide();
  };

  const prev = () => {
    slide -= 1;
    setCurrentSlide();
  };

  menuSlider.addEventListener('click', e => {
    e.preventDefault();
    const sliderItem = e.target.closest('.js-menuSlider__item');
    slide = Number(sliderItem.dataset.sliderId) - 1;
    setCurrentSlide();
  });

  // setInterval(next, 10000);

  document.getElementById('slider__next').addEventListener('click', next);
  document.getElementById('slider__previous').addEventListener('click', prev);
}

module.exports = initVerticalSlider;
