const objectsEqual = (a: any, b: any) => {
    return JSON.stringify(a) === JSON.stringify(b)
}

export default objectsEqual