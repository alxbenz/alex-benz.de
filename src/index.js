import './scss/main.scss';

import { getReadablePhone, getReadableEMail, createId } from './scripts/helper';
import { createRing, setProgress } from './scripts/progressRing';

const replacePhoneNumber = () => {
  const phoneElements = document.querySelectorAll('.phone');

  Array.from(phoneElements).map(phoneElement => {
    const phoneNr = phoneElement.innerHTML;
    const readablePhoneNr = getReadablePhone(phoneNr);
    phoneElement.innerHTML = readablePhoneNr;
    phoneElement.setAttribute('href', `tel:${readablePhoneNr}`);
  });
};

const replaceEMail = () => {
  const eMailElements = document.querySelectorAll('.email');

  Array.from(eMailElements).map(eMailElement => {
    const eMail = eMailElement.innerHTML;
    const readableEMail = getReadableEMail(eMail);
    eMailElement.innerHTML = readableEMail;
    eMailElement.setAttribute('href', `mailto:${readableEMail}`);
  });
};

const openToggle = event => {
  event.target.classList.toggle('is-open');
};

const toggleMenu = event => {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.hamburger');

  hamburger.classList.toggle('is-active');
  menu.classList.toggle('is-open');
};

const createProgressRings = () => {
  Array.from(document.querySelectorAll('.progressRing')).map(element => {
    const id = `ring_${createId()}`;
    createRing(element, id);
  });
};

const addListeners = () => {
  const toggles = document.querySelectorAll('.openToggle');
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');

  Array.from(toggles).map(toggle => {
    toggle.addEventListener('click', openToggle);
  });

  hamburger.addEventListener('click', toggleMenu);
  menu.addEventListener('click', toggleMenu);
};

createProgressRings();
replacePhoneNumber();
replaceEMail();
addListeners();

const ev = new Event('ringStart');
setTimeout(() => {
  window.dispatchEvent(ev);
}, 100);
