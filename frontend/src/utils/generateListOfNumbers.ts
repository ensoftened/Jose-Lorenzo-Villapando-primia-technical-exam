const generateListOfNumbers = (from: number, to: number) => {
    let list = [];
    for (let i = from; i < to + 1; i++) {
      list.push(i);
    }
  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("LIST", list)
    return list;
  };
  
  export default generateListOfNumbers;
  