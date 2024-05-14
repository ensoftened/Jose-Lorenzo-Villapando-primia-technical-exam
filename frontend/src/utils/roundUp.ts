const roundUp = (number: any, precision: any) => {
  const factor = Math.pow(10, precision);
  const roundedNumber = Math.ceil(number * factor + Number.EPSILON) / factor;
  return Number.isInteger(roundedNumber)
    ? roundedNumber.toFixed(0)
    : roundedNumber.toFixed(precision);
};

export default roundUp;
