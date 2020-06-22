import Typed from 'typed.js';

function initTypedText() {
  const options = {
    strings: [
      'for developers',
      'for students',
      'for housewives',
      'for switchers',
      'for cats',
    ],
    loop: true,
    typeSpeed: 40,
    backSpeed: 40,
    backDelay: 1500,
  };

  const text = new Typed('#hero__target', options);

  return text;
}
module.exports = initTypedText;
