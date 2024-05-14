const getStringInitial = (str: string) => {
  const initial = str.substring(0, 1);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("INITIAL", initial)

  return initial.toUpperCase();
};

export default getStringInitial;
