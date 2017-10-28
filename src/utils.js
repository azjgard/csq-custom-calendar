const toProperCase = str => {
  return str
    .split("")
    .map((val, index) => (index === 0 ? val.toUpperCase() : val))
    .join("");
};

export default toProperCase;
