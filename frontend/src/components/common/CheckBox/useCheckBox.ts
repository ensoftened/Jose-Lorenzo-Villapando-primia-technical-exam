import React, { useContext, useState, useRef, useMemo, CSSProperties, useEffect   } from "react"
;
import applyStyle from "../../../utils/applyStyle";
import CheckBoxProps from "types/CheckBoxProps";

export const useCheckBox = (props : CheckBoxProps) => {       
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("RENDERED")
    //Props
    const {

        disabled,
        style,
        isChecked,
        onChange,
        item,
        index,
        onFieldChange,
        children,
        value
        
    } = props   


    //States
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState<boolean>(isChecked ? isChecked : false);
    const [isCheckBoxOnMouseDown, setIsCheckBoxOnMouseDown] = useState<boolean>(false);
    const [stateValue, setStateValue] = useState(value ? value : (item? item : ""))
    ////////////////////////////////////////////////console.log("STATEVALUE", stateValue)

    const label = children
    const labelHasFields: boolean = label.search(/<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*\/>/g) !== -1
    ////////////////////////////////////////////////////////////////////////////////////console.log("labelHasFields", labelHasFields)

    const [isCheckBoxItemOnMouseOver, setIsCheckBoxItemOnMouseOver] = useState(false)
    useEffect(() => {
        setIsCheckBoxChecked(isChecked!=null ? isChecked : isCheckBoxChecked)
    }, [isChecked])

    ////////////////////////////////////////////////////////////////////////////////////////console.log("CHECKBOX RENDERED", stateValue)

    //Refs
    const checkBoxRef = useRef<any>()
    const checkBoxIconRef = useRef<any>()


    //Other Constants

    //Functions / Events
    useEffect(() => {

        if(stateValue.hasOwnProperty("label")) {
            const origLabel = stateValue.label
            const regex = /<TextField .*?name='(.*?)'.*?\/>/g;
            //////////////////////////////////////////////////////////////////////////////////////console.log("ORIG", origLabel)
            const result = origLabel.replace(regex, '<$1></$1>');
            //////////////////////////////////////////////console.log("R", result)

            setStateValue((prev: any) => {
                return {...prev,
                label: result}
            })
        }

        
    }, [])

    
    const handleTextFieldChange = (event: any, i: number, match: string, name?: string) => {
        const origLabel = stateValue.label

        //////////////////////////////////////////////console.log("NAME", name)

        ////////////////////////////////////////////////console.log("EVENT", event)
        ////////////////////////////////////////////////console.log("match", match)
        ////////////////////////////////////////////////console.log("i", i)

        //var regex = /(<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*>.*?<\/\w+\s*>|<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*\/>)/g
        var regex = new RegExp("<" + name + ">.*?<\/" + name + ">")
        ////////////////////////////////////////////////console.log("REGEX, regex", regex)

        ////////////////////////////////////////////////////////////////////////////console.log("REGEX", regex)

        // Use the replace method to insert the new text within the <text></text> tags
        var modifiedString = origLabel.replace(regex, "<" + name + ">" + event + "</" + name + ">");
        ////////////////////////////////////////////////console.log("MODIFIED STRING", modifiedString)
        ////////////////////////////////////////////////////////////////////////////////////console.log("EYYY", modifiedString)
        setStateValue((prev: any) => {
            return {...prev,
            label: modifiedString}
        })

        onFieldChange({_id: stateValue._id, label: modifiedString})

    };

    const handleChange = (event: any, _id: string, label: string) => { 
        if(!disabled) {
            setIsCheckBoxChecked(!isCheckBoxChecked)
            setIsCheckBoxOnMouseDown(false)
            if(onChange) {
                onChange({_id, label: stateValue.label})
            }
 

        }
    }
    const handleChangeAsStandalone = () => { 

        setIsCheckBoxChecked(!isCheckBoxChecked)
        onChange()
    }

    const handeMouseOver = () => {
        if(!disabled) {
            setIsCheckBoxItemOnMouseOver(true)
        }

    }
    const handleMouseLeave = () => {
        if(!disabled) {
            setIsCheckBoxItemOnMouseOver(false)
        }

    }
    const handleCheckBoxMouseDown = () => {
        if(!disabled) {
            ////////////////////////////////////////////////////////////////////////////////////////console.log("mouseDown")
            setIsCheckBoxOnMouseDown(true)
        }

    }
    const handleCheckBoxMouseUp = () => {
        if(!disabled) {
            ////////////////////////////////////////////////////////////////////////////////////////console.log("MOUSE UP")
            setIsCheckBoxOnMouseDown(false)
        }

    }
    const handleCheckBoxMouseOver = () => {

    }
    const handleCheckBoxMouseLeave = () => {
        if(!disabled) {
            setIsCheckBoxOnMouseDown(false)
        }

    }
    const handleCheckBoxClick = () => {
        setIsCheckBoxOnMouseDown(false)

    }

   return {
      //States
      isCheckBoxChecked, setIsCheckBoxChecked,
      isCheckBoxItemOnMouseOver,
      isCheckBoxOnMouseDown,

      labelHasFields,

      //Refs
      checkBoxRef,
      checkBoxIconRef,

  
      //Other Constants
  
      //Functions / Events
      handleChange,
      handleChangeAsStandalone,
      handeMouseOver,
      handleMouseLeave,
      handleCheckBoxMouseDown,
      handleCheckBoxMouseUp,
      handleCheckBoxMouseOver,
      handleCheckBoxMouseLeave,
      handleCheckBoxClick,
      handleTextFieldChange
  }

}