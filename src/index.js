import './scss/main.scss';
import { getReadablePhone, getReadableEMail } from './scripts/helper';

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

const addListeners = () => {
  const toggles = document.querySelectorAll('.openToggle');

  Array.from(toggles).map(toggle => {
    toggle.addEventListener('click', openToggle);
  });
};

replacePhoneNumber();
replaceEMail();
addListeners();
