import './scss/main.scss';

import {
  hlpr_getReadablePhone,
  hlpr_getReadableEMail,
  hlpr_createId
} from '../node_modules/hlpr/hlpr';
import { createRing, setProgress } from './scripts/progressRing';
import {
  scrollingHandler,
  getSectionOffset,
  scrollTo
} from './scripts/scrolling';
import { debounce, throttle } from 'lodash';

const replacePhoneNumber = () => {
  const phoneElements = document.querySelectorAll('.phone');

  Array.from(phoneElements).map(phoneElement => {
    const phoneNr = phoneElement.innerHTML;
    const readablePhoneNr = hlpr_getReadablePhone(phoneNr);
    phoneElement.innerHTML = readablePhoneNr;
    phoneElement.setAttribute('href', `tel:${readablePhoneNr}`);
  });
};

const replaceEMail = () => {
  const eMailElements = document.querySelectorAll('.email');

  Array.from(eMailElements).map(eMailElement => {
    const eMail = eMailElement.innerHTML;
    const readableEMail = hlpr_getReadableEMail(eMail);
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
    const id = `ring_${hlpr_createId()}`;
    createRing(element, id);
  });
};

const scrollToSection = event => {
  event.preventDefault();

  const section = document.querySelector(
    event.target.closest('a').getAttribute('href')
  );

  const offsetTop = getSectionOffset(section).offsetTop;

  scrollTo(offsetTop, 400);
};

const detectScrolling = event => {
  scrollingHandler(event);
};

const addListeners = () => {
  const toggles = document.querySelectorAll('.openToggle');
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const menuLinks = menu.querySelectorAll('a');

  Array.from(toggles).map(toggle => {
    toggle.addEventListener('click', openToggle);
  });

  hamburger.addEventListener('click', toggleMenu);
  menu.addEventListener('click', toggleMenu);
  Array.from(menuLinks).map(link => {
    link.addEventListener('click', scrollToSection);
  });

  window.addEventListener('scroll', detectScrolling);
};

createProgressRings();
replacePhoneNumber();
replaceEMail();
addListeners();
