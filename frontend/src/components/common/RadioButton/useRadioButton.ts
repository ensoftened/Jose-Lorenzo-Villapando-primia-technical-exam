import React, { useContext, useState, useRef, useMemo, CSSProperties, useEffect   } from "react"
;
import applyStyle from "../../../utils/applyStyle";
import RadioButtonProps from "../../../types/RadioButtonProps";


export const useRadioButton = (props : RadioButtonProps) => {       
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("RENDERED")
    //Props
    const {

        isDisabled,
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
    const [isRadioButtonChecked, setIsRadioButtonChecked] = useState<boolean>(isChecked ? isChecked : false);
    const [isRadioButtonOnMouseDown, setIsRadioButtonOnMouseDown] = useState<boolean>(false);
    const [stateValue, setStateValue] = useState(value ? value : (item? item : ""))
    ////////////////////////////////////////////////////////////////////////////////////////console.log("STATEVALUE", stateValue)

    const label = children
    const labelHasFields: boolean = label.search(/<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*\/>/g) !== -1
    //////////////////////////////////////////////////////////////////////////////////////console.log("labelHasFields", labelHasFields)

    const [isRadioButtonItemOnMouseOver, setIsRadioButtonItemOnMouseOver] = useState(false)
    useEffect(() => {
        setIsRadioButtonChecked(isChecked!=null ? isChecked : isRadioButtonChecked)
    }, [isChecked])

    //////////////////////////////////////////////////////////////////////////////////////////console.log("CHECKBOX RENDERED", stateValue)

    //Refs
    const checkBoxRef = useRef<any>()
    const checkBoxIconRef = useRef<any>()


    //Other Constants

    //Functions / Events
    useEffect(() => {

        if(stateValue.hasOwnProperty("label")) {
            const origLabel = stateValue.label
            const regex = /<TextField .*?name='(.*?)'.*?\/>/g;
            ////////////////////////////////////////////////////////////////////////////////////////console.log("ORIG", origLabel)
            const result = origLabel.replace(regex, '<$1></$1>');
            ////////////////////////////////////////////////console.log("R", result)

            setStateValue((prev: any) => {
                return {...prev,
                label: result}
            })
        }

        
    }, [])

    
    const handleTextFieldChange = (event: any, i: number, match: string, name?: string) => {
        const origLabel = stateValue.label

        ////////////////////////////////////////////////console.log("NAME", name)

        //////////////////////////////////////////////////console.log("EVENT", event)
        //////////////////////////////////////////////////console.log("match", match)
        //////////////////////////////////////////////////console.log("i", i)

        //var regex = /(<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*>.*?<\/\w+\s*>|<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*\/>)/g
        var regex = new RegExp("<" + name + ">.*?<\/" + name + ">")
        //////////////////////////////////////////////////console.log("REGEX, regex", regex)

        //////////////////////////////////////////////////////////////////////////////console.log("REGEX", regex)

        // Use the replace method to insert the new text within the <text></text> tags
        var modifiedString = origLabel.replace(regex, "<" + name + ">" + event + "</" + name + ">");
        //////////////////////////////////////////////////console.log("MODIFIED STRING", modifiedString)
        //////////////////////////////////////////////////////////////////////////////////////console.log("EYYY", modifiedString)
        setStateValue((prev: any) => {
            return {...prev,
            label: modifiedString}
        })

        onFieldChange({_id: stateValue._id, label: modifiedString})

    };

    const handleChange = (event: any, _id: string, label: string) => { 

        console.log("_ID", _id)
        if(!isDisabled) {
            setIsRadioButtonChecked(!isRadioButtonChecked)
            setIsRadioButtonOnMouseDown(false)
            if(onChange) {
                onChange({_id, label: stateValue.label})
            }
 

        }
    }
    const handleChangeAsStandalone = () => { 

        setIsRadioButtonChecked(!isRadioButtonChecked)
        onChange()
    }

    const handeMouseOver = () => {
        if(!isDisabled) {
            setIsRadioButtonItemOnMouseOver(true)
        }

    }
    const handleMouseLeave = () => {
        if(!isDisabled) {
            setIsRadioButtonItemOnMouseOver(false)
        }

    }
    const handleRadioButtonMouseDown = () => {
        if(!isDisabled) {
            //////////////////////////////////////////////////////////////////////////////////////////console.log("mouseDown")
            setIsRadioButtonOnMouseDown(true)
        }

    }
    const handleRadioButtonMouseUp = () => {
        if(!isDisabled) {
            //////////////////////////////////////////////////////////////////////////////////////////console.log("MOUSE UP")
            setIsRadioButtonOnMouseDown(false)
        }

    }
    const handleRadioButtonMouseOver = () => {

    }
    const handleRadioButtonMouseLeave = () => {
        if(!isDisabled) {
            setIsRadioButtonOnMouseDown(false)
        }

    }
    const handleRadioButtonClick = () => {
        setIsRadioButtonOnMouseDown(false)

    }

   return {
      //States
      isRadioButtonChecked, setIsRadioButtonChecked,
      isRadioButtonItemOnMouseOver,
      isRadioButtonOnMouseDown,

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
      handleRadioButtonMouseDown,
      handleRadioButtonMouseUp,
      handleRadioButtonMouseOver,
      handleRadioButtonMouseLeave,
      handleRadioButtonClick,
      handleTextFieldChange
  }

}