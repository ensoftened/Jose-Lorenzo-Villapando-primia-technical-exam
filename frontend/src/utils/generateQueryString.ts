const generateQueryString = (paramsObj: any) => {
    ////////////////////////////////////////console.log  ("PARAMS OBJ", paramsObj)
    let generatedString = "?"
    let newParamsObj : any = {}
    Object.keys(paramsObj).map((key, index) => {
        ////////////////////////////////////////console.log  ("KEY", key)
        if(typeof paramsObj[key] != "undefined") {
            if(paramsObj[key].length>0) newParamsObj[key] = paramsObj[key]
        }
    })

    ////////////////////////////////////////console.log  ("NEW PARAMS OBJ", newParamsObj)
    Object.keys(newParamsObj).map((key, index) => {
        const value = newParamsObj[key]
        //If first
        if(typeof value != "undefined") {
            if(value.length>0) {
                if(index==0) {
                    generatedString += (key + "=" + value)
                } 
        
                //If last
                else {
                    generatedString += ("&" + key + "=" + value)
                }
        
            }

        }

    })

    ////////////////////////////////////////console.log  ("GENERATED STRING", generatedString)

    return generatedString
}

export default generateQueryString