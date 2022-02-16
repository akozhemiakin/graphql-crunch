const key = '\u265B';

const isReference = (value) => value && typeof value === 'object' && value.hasOwnProperty(key);

function encode(value, { reference } = { reference: false }) {
  return reference ? { [key]: value } : value;
}

function decode(value) {
  return value && typeof value === 'object' && value.hasOwnProperty(key) ? value[key] : value;
}

module.exports = { isReference, encode, decode };
