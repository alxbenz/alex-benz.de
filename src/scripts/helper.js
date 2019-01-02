export const getReadablePhone = phoneNr => {
  const numbers = {
    eins: 1,
    zwei: 2,
    drei: 3,
    vier: 4,
    fünf: 5,
    sechs: 6,
    sieben: 7,
    acht: 8,
    neun: 9,
    null: 0
  };

  let readablePhoneNr = phoneNr;

  for (let number in numbers) {
    const regex = new RegExp(escapeRegExp(number), 'g');
    readablePhoneNr = readablePhoneNr.replace(regex, numbers[number]);
  }

  return readablePhoneNr;
};

export const getReadableEMail = email => {
  const mail = {
    '[at]': '@',
    '[punkt]': '.',
    '[minus]': '-'
  };
  let readableEMail = email;

  for (let word in mail) {
    const regex = new RegExp(escapeRegExp(word), 'g');
    readableEMail = readableEMail.replace(regex, mail[word]);
  }
  return readableEMail;
};

export const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
