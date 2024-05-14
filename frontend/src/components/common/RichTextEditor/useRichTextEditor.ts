import React, { useState, useRef, useCallback, useEffect } from 'react'

export const useRichTextEditor = (props: any) => {
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
    const textEditorRef = useRef<any>(null)
    const labelRef = useRef<any>(null)

    const handleChange =  async (val: any)=> {
        //console.log("textEditorRef.current.value", val)
        setStateValue(val)
        //let cursorPosition = textEditorRef.current.selectionStart 
       // //////console.log("CURSOR", cursorPosition)

        if(onChange) {
             await onChange(val, name, "change")
        }

        // textEditorRef.current .setSelectionRange(cursorPosition,cursorPosition)

         

    }

    const handleFocus= () => {
        if(!disabled) {
            setIsFocused(true)
            textEditorRef.current.focus()
        
            textEditorRef.current.placeholder = placeholder
        }


    }

    const handleBlur = useCallback(() => {
        setIsFocused(false)
        setStateValue(textEditorRef.current.value)
        textEditorRef.current.placeholder = ""
        if(onChange) {
            onChange(textEditorRef.current.value, name, "blur")
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

        textEditorRef,
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


