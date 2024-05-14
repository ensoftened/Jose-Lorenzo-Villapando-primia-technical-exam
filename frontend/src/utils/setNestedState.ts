
const setNestedState = (setter: any, key: string, value: any) => {
    ////////////////////////////////////////////console.log("HELLO")
    setter((prev: any) => {
        return {
            ...prev,
            [key]: value
        }
    })
};

export default setNestedState;
