import crypto from 'crypto-js';

const getHash = (hashAlgo, wordArray) => {
  switch (hashAlgo) {
    case 'MD5':
      return crypto.MD5(wordArray).toString(crypto.enc.Hex);
    case 'SHA1':
      return crypto.SHA1(wordArray).toString(crypto.enc.Hex);
    case 'SHA256':
      return crypto.SHA256(wordArray).toString(crypto.enc.Hex);
    case 'SHA512':
      return crypto.SHA512(wordArray).toString(crypto.enc.Hex);
    default:
      return '';
  }
};

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event) => {
  const { hash: hashAlgo, file } = event.data;
  const wordArray = crypto.lib.WordArray.create(file);
  const hashValue = getHash(hashAlgo, wordArray);
  // eslint-disable-next-line no-restricted-globals
  self.postMessage({ hash: hashValue });
});
