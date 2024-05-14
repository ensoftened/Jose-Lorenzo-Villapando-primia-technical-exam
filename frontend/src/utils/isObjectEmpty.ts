const isObjectEmpty = (obj: any) => {
    return JSON.stringify(obj) == "{}"
}

export default isObjectEmpty