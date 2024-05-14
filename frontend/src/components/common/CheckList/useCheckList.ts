import React, { useContext, useState, CSSProperties, useMemo, useCallback, useEffect } from "react"
import sortListOfObjects from "../../../utils/sortListOfObjects"
import CheckListProps from "types/CheckListProps"


export const useCheckList = (props : CheckListProps) => {       
  //Props
  const {
    value,
    onChange,
    items,
    style,
    name
  } = props

  const controlled : boolean = (value!==undefined) ? true : false

  ////////////////////////////////////////////////////////////////////////////console.log("CHECKLIST RENDERED", name, items)
  //States
  const [stateValue, setStateValue] = useState<any>([])
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false)
  const [filteredItems, setFilteredItems] = useState<any>(items)

  useEffect(() => {
    ////////////////////console.log("THE ITEMS", items)
    if(items) {
        if(items[0]?.hasOwnProperty("_id")) {
            setFilteredItems(items)
        } else {
            const modifiedItems = items.map((item: any) => {
                return {
                    _id: item,
                    label: item
                }
            })

            ////////////////////console.log("MODIFIED ITEMS", modifiedItems)

            setFilteredItems(modifiedItems)

        }
    }
  }, [items])



  //Functions / Events
  const handleSelectAllChange = (value : any) => {

    const idToObjectMap: any = {};
    for (const item of props.value) {
      idToObjectMap[item._id] = item;
    }

    // Merge the two lists, updating "Alice" to "Brent" and adding "Mary" based on the ID mapping
    const mergedList = items.map((val: any) => {
        if (idToObjectMap[val._id]) {
        // Use the object from list2 if there's a matching ID
        return idToObjectMap[val._id];
        }
        // Otherwise, use the object from list1
        return val;
    });

    //////////////////////////////console.log("MERGED LIST", mergedList)
  

    
    setIsSelectAllChecked(!isSelectAllChecked)

    if(isSelectAllChecked==false) {  
        setStateValue(mergedList)
        onChange(mergedList, name)
    }
    else {
        setStateValue([])
        onChange([], name)
    }


}

const handleChange = (checkedItem : any) => {
    
    let list = (controlled==true) ? value : stateValue
    let updatedList: any = []

    ////////////////////console.log("checkIfItemIsChecked(checkedItem)==true", checkedItem, checkIfItemIsChecked(checkedItem)==true)
    ////////////////////console.log("LIST", list)

    //Uncheck Item
    if(checkIfItemIsChecked(checkedItem)==true) {
        ////////////////////////////////////////////////////////////////////////////////////////console.log("TOTOO")


        if(list.length>0) {
            if(list[0].hasOwnProperty("_id")) {
                updatedList = list.filter((item: any) => item._id !== checkedItem._id);
            }

            else {
                updatedList = list.filter((item: any) => item !== checkedItem._id);

            }
        }

        if(controlled==false) setStateValue(updatedList)
    } 
    
    //Check Item
    else {
        updatedList = [...list, checkedItem]
        if(controlled==false) setStateValue((prev: any) => ([ ...prev, checkedItem]))
    }

    ////////////////////console.log("THE UPDATED LIST", updatedList)
    onChange(sortListOfObjects(updatedList, "_id"), name)
    

  

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("UPDATED LIST", updatedList)
}

const handleTextFieldChange = (item : any) => {
    let list = (controlled==true) ? value : stateValue
    //////////////////////////////////////////////////////////////////////////////console.log("LIST", list)
    let updatedList: any = []
    ////////////////////////////////////////////////////////////////////////////////////////console.log("checkIfItemIsChecked(checkedItem)", checkIfItemIsChecked(item))

    const index = list.findIndex((obj: any )=> obj._id === item._id);
    ////////////////////////////////////////////////////////////////////////////////////////console.log("THE INDEX", index)


    if(checkIfItemIsChecked(item)==true) {
        updatedList = list
        updatedList[index].label = item.label
    } else {
        updatedList = [...list]
    }
    
    onChange(sortListOfObjects(updatedList, "_id"), name)

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("UPDATED LIST", updatedList)
}



const checkIfItemIsChecked = (item: any) => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("THE STATE", stateValue)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("THE ID", item._id)
    const val = (controlled==true) ? value : stateValue
    ////////////////////console.log("VALval", val, item.label)
    //////////////////////console.log("ITEM", item)

    if(val.length == 0) {
        //////////////////////console.log("LENGTH IS 0")
        return false
    }

    let hasId = false

    if(val[0].hasOwnProperty("_id")) {
        hasId = val.some((obj: any) => obj._id === item._id)
    } else {
        hasId = val.includes(item.label)

    }


    ////////////////////console.log("CHECKING", item, hasId)

    return hasId
}
  

  
   return {
    //States
    stateValue,
    setStateValue,
    isSelectAllChecked, 
    setIsSelectAllChecked,
    filteredItems, setFilteredItems,


    //Refs
    
    //Functions / Events
    handleSelectAllChange,
    handleChange,
    checkIfItemIsChecked,
    handleTextFieldChange
  
  }

}