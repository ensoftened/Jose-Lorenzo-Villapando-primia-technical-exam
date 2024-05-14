const sortListOfObjects = (list: any[], key: string) => {
    list.sort(function(a, b) {
        return a[key] - b[key];
      });

    return list
}

export default sortListOfObjects