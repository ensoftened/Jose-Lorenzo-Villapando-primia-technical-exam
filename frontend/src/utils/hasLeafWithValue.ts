const hasLeafWithValue = (obj: any, targetValue: any) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively call hasLeafWithValue for nested objects
      if (hasLeafWithValue(obj[key], targetValue)) {
        return true; // If found in nested object, return true
      }
    } else if (obj[key] === targetValue) {
      return true; // If leaf node has the target value, return true
    }
  }
  return false; // If no leaf node with the target value is found
}

export default hasLeafWithValue