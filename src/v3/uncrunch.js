const { isContainer, map } = require("../utils");
const { isReference, decode } = require('./references');

function expand(data, expanded) {
  const recurse = (data) => expand(data, expanded);

  return isReference(data)
    ? expanded[decode(data)]
    : isContainer(data)
    ? map(data, recurse)
    : decode(data);
}

module.exports = function uncrunch(values) {
  const expanded = new Array(values.length);

  for (let i = 0; i < values.length; i++) {
    expanded[i] = expand(values[i], expanded);
  }

  return expanded[expanded.length - 1];
};
