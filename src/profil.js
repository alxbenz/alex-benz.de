import './scss/profil.scss';

import {
  hlpr_getReadablePhone,
  hlpr_getReadableEMail
} from '../node_modules/hlpr/hlpr';

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

replacePhoneNumber();
replaceEMail();
