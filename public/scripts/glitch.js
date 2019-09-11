const headerLogoEl = document.getElementById('header-logo');

headerLogoEl.addEventListener(
  'click',
  event => {
    event.preventDefault();
    setUpGlitchCounter(headerLogoEl);
  },
  { once: true }
);

function setUpGlitchCounter(logoElement) {
  createCounterTemplate(logoElement);
  const counterEl = document.getElementById('glitch-counter');

  const secretDate = new Date(2019, 10, 10);
  const currentDate = new Date();
  getDatesDifference(currentDate, secretDate, counterEl);

  setCounterUpdater(counterEl);
}

function createCounterTemplate(logoElement) {
  const template = `<h2 id="glitch-counter">XX:XX</h2>`;
  logoElement.classList.add('logo-counter-mode');
  logoElement.innerHTML = '';
  logoElement.innerHTML = template;
}

function setCounterUpdater(counterEl) {
  const secretDate = new Date(2019, 9, 1);
  setInterval(() => {
    const currentDate = new Date();
    getDatesDifference(currentDate, secretDate, counterEl);
  }, 1000);
}

function getDatesDifference(currentDate, secretDate, counterEl) {
  let seconds = Math.floor((secretDate - currentDate) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  const datesDifferenceObject = {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  createCounterString(datesDifferenceObject, counterEl);
}

function createCounterString(datesDifferenceObject, counterEl) {
  const o = datesDifferenceObject;
  const hoursPart = Math.abs(o.hours) < 10 ? `0${o.hours}` : `${o.hours}`;
  const minPart = Math.abs(o.minutes) < 10 ? `0${o.minutes}` : `${o.minutes}`;
  const secPart = Math.abs(o.seconds) < 10 ? `0${o.seconds}` : `${o.seconds}`;

  const hoursDots = o.hours && `:`;
  let daysWord = '';
  if (o.days) {
    o.days > 1 ? (daysWord = ' DAYS + ') : (daysWord = ' DAY + ');
  }

  const datesDifferenceString = `${o.days}${daysWord}${hoursPart}${hoursDots}${minPart}:${secPart}`;
  updateCounter(datesDifferenceString, counterEl);
}

function updateCounter(datesDifferenceString, counterEl) {
  counterEl.innerHTML = datesDifferenceString;
  counterEl.setAttribute('glitch-string', datesDifferenceString);
}
