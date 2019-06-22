const ALPHABET = '23456789abdegjkmnpqrvwxyz';
const ID_LENGTH = 8;

const getRandomCode = () => {
  let rtn = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
};

export default { getRandomCode };
