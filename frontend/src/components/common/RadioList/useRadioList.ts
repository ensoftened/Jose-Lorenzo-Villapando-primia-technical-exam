import React, { useContext, useState, CSSProperties, useMemo, useCallback, useEffect } from "react"
import CheckListXProps from "../../../types/CheckListProps"
import sortListOfObjects from "../../../utils/sortListOfObjects"


export const useRadioList = (props : CheckListXProps) => {       
  //Props
  const {
    value,
    onChange,
    items,
    style,
    name
  } = props

  const controlled : boolean = (value!==undefined) ? true : false

  //////////////////////////////////////////////////////////////////////////////////////console.log("CONTROLLED", controlled)
  //States
  const [stateValue, setStateValue] = useState<any>([])
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false)
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    ////////////////////console.log("THE ITEMS", items)
    if(items) {
        if(items[0].hasOwnProperty("_id")) {
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

    ////////////////////////////////////////////////////////////////////////////////////console.log("MERGED LIST", mergedList)
  

    
    setIsSelectAllChecked(!isSelectAllChecked)

    if(isSelectAllChecked==false) {  
        setStateValue(mergedList)
        onChange(mergedList)
    }
    else {
        setStateValue([])
        onChange([])
    }


}

const handleChange = useCallback((checkedItem : any) => {

    ////////////////////////////////////////////////////////////////////////////console.log("CHECKED ITEM", checkedItem)
    
    // let list = (controlled==true) ? value : stateValue
    // let updatedList: any = []

    // if(checkIfItemIsChecked(checkedItem)==true) {
    //     //////////////////////////////////////////////////////////////////////////////////////console.log("TOTOO")
        
    //     updatedList = list.filter((item: any) => item.id !== checkedItem.id);
    //     if(controlled==false) setStateValue(updatedList)
    // } else {
    //     updatedList = [...list, checkedItem]
    //     if(controlled==false) setStateValue((prev: any) => ([ ...prev, checkedItem]))
    // }

    // ////////////////////////////////////////////////////////////////////////////////////////////console.log("THE UPDATED LIST", updatedList)
    onChange(checkedItem, name)
    

  

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("UPDATED LIST", updatedList)
}, [onChange])

const handleTextFieldChange = (item : any) => {


    if(checkIfItemIsChecked(item)==true) {
      //////////////////////////////////////////////console.log("ye", item)

        onChange(item, name)
    } 
    
   

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("UPDATED LIST", updatedList)
}



const checkIfItemIsChecked = (item: any) => {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("THE STATE", stateValue)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("THE ID", item.id)
    console.log("ITEM", item)
    console.log("VALUE", value)
    const val = (controlled==true) ? value : stateValue
  //  ////////////////////////////////////////////////////////////////////////////console.log("VAL", val, item)
    const checked =  val._id == item._id
   console.log("CHECKING", checked)

    return checked
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