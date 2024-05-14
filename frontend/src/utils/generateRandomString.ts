const generateRandomString = (length: number) => {
    const charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString: string = "";
  
    for (let i: number = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * charset.length);
      randomString += charset.charAt(randomIndex);
    }
  
    return randomString;
  }

  export default generateRandomString
  