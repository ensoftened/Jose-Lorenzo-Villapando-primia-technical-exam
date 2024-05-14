import TextAreaProps from "../../../../types/TextAreaProps"
import React, { useState, useRef, useCallback, useEffect } from 'react'

export const useTextArea2 = (props: TextAreaProps) => {
    const {
        disabled,
        error,
        loading,
        onChange,
        startAdornment,
        style,
        value,
        name,
        placeholder,
        defaultValue,
        label,
        rows
    } = props
    //States
    const controlled : boolean = (value!==undefined) ? true : false

    const [stateValue, setStateValue] = useState(controlled ? value : (defaultValue)? defaultValue : "");
    

    const [isEyeButtonOnMouseOVer, setIsEyeButtonOnMouseOver] = useState(false)
    const [isEyeButtonOnMouseDown, setIsEyeButtonOnMouseDown] = useState(false)
    const [isClearButtonOnMouseOver, setIsClearButtonOnMouseOver] = useState(false)



    /* -- EVENT STATES -- */
    const [focused, setIsFocused] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    
    // -- REFS -- */
    const textAreaRef = useRef<any>(null)
    const labelRef = useRef<any>(null)

    const handleChange = async (event: any)=> {
        setStateValue(textAreaRef.current.value)
        let cursorPosition = event.target.selectionStart 

        if(onChange) {
            await onChange(textAreaRef.current.value, name, "change")
        }

        event.target.setSelectionRange(cursorPosition,cursorPosition)

         

    }

    const handleFocus= () => {
        if(!disabled) {
            setIsFocused(true)
            textAreaRef.current.focus()
        
            textAreaRef.current.placeholder = placeholder
        }


    }

    const handleBlur = useCallback(() => {
        setIsFocused(false)
        setStateValue(textAreaRef.current.value)
        textAreaRef.current.placeholder = ""
        if(onChange) {
            onChange(textAreaRef.current.value, name, "blur")
        }


         

    }, [onChange])

    const handleMouseOver = () => {
        setIsMouseOver(true)
    }

    const handleMouseLeave = () => {
        setIsMouseOver(false)
    }


    const handleEyeButtonMouseOver = () => {
        setIsMouseOver(true)
        setIsEyeButtonOnMouseOver(true)
    }
    const handleEyeButtonMouseLeave = () => {
        setIsMouseOver(false)
        setIsEyeButtonOnMouseOver(false)
        setIsEyeButtonOnMouseDown(false)
    }

    const handleEyeButtonMouseDown = () => {
        setIsEyeButtonOnMouseDown(true)
    }
    const handleEyeButtonMouseUp = () => {
        setIsEyeButtonOnMouseDown(false)
    }

        const handleClearButtonClick = () => {

        if(controlled==false) {
                setStateValue("")
        } 
        
        onChange("", name)

    }
    const handleClearButtonMouseOver = () => {
        setIsClearButtonOnMouseOver(true)
    }
    const handleClearButtonMouseLeave = () => {
        setIsClearButtonOnMouseOver(false)
    }
    return {
        stateValue,
        setStateValue,
        isEyeButtonOnMouseOVer, setIsEyeButtonOnMouseOver,
        isEyeButtonOnMouseDown, setIsEyeButtonOnMouseDown,
        isClearButtonOnMouseOver, setIsClearButtonOnMouseOver,

        focused, setIsFocused,
        isMouseOver, setIsMouseOver,

        textAreaRef,
        labelRef,

        handleChange,
        handleFocus,
        handleBlur,
        handleMouseOver,
        handleMouseLeave,
        handleEyeButtonMouseOver,
        handleEyeButtonMouseLeave,
        handleEyeButtonMouseDown,
        handleEyeButtonMouseUp,
        handleClearButtonClick,
        handleClearButtonMouseOver,
        handleClearButtonMouseLeave,

    }
}


