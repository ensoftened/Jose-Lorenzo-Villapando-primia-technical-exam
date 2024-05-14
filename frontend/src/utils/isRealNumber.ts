const isRealNumber = (value: string) => {
  return /^(?:(?:(\d+)(?:\.(\d+))?|(?!0)(\d+) )?(\d+)\/(\d+)|(\d+)(?:\.(\d+))?)$/.test(
    value
  );
};

export default isRealNumber;
