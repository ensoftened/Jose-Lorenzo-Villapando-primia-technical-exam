import React, { useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties } from 'react'

import { BLACK, MAGENTA } from '../../../../constants/palette'
import applyStyle from '../../../../utils/applyStyle'

import setTheme from '../../../../utils/setTheme'
import snakeToCamel from '../../../../utils/snakeToCamel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSpinner, faX } from '@fortawesome/free-solid-svg-icons'

import { SClearButton, SClearIcon, SDiv, SLabel, SSpinner, SStartAdornment, STextArea } from './textArea.style'


import { text } from 'stream/consumers'
import Ripple from '../../Ripple/Ripple'
import { neutral } from '../../../../style-helpers/theme'
import TextAreaProps from '../../../../types/TextAreaProps'
import { useTextArea } from './useTextArea'

const TextArea = (props : TextAreaProps) => {
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
        rows,
        size,
        clearable,

        
    } = props

    const {
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

    } = useTextArea(props)

    const controlled : boolean = (value!==undefined) ? true : false
    
    return (
        <SDiv 

            $focused={focused}
            $error={error}
            $size={size}

            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}

        
        >
            {/* TEXT FIELD */}
            <STextArea 

                //$customStyle={style}
                $disabled={disabled}
                $error={error}
                $focused={focused}
                $loading={loading}
                $mouseOver={isMouseOver}
                $startAdornment={startAdornment}
                $value={(controlled==true) ? value : stateValue}
                $size={size}
                $clearable={clearable}



                disabled={(disabled || loading)}
                name={name}
                onChange={handleChange}
     

                 value={(controlled==true) ? value : stateValue}


                placeholder={""}

                onFocus={handleFocus}
                onBlur={handleBlur}
                rows={rows}
                

                ref={textAreaRef}

                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                //className={"input-text"}
            ></STextArea>
            
            {/* LABEL / PLACEHOLDER */}
            <SLabel 
            
                $disabled={disabled}
                $loading={loading}
                $focused={focused}
                $value={(controlled==true) ? value : stateValue}
                $error={error}
                $startAdornment={startAdornment}
                $size={size}


           
                ref={labelRef} 
                onClick={handleFocus}                 
                onBlur={handleBlur}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} 
            >
                {label}
            </SLabel>

            {/* START ADORNMENT */}
            <SStartAdornment
            
                $disabled={disabled}
                $loading={loading}
                $size={size}


                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} 
            >
                {startAdornment}
            </SStartAdornment>

            {/* END ADORNMENT */}

            {
                (clearable == true && loading==false && disabled==false) &&
                <SClearButton
                    
                    $loading={loading}
                    $disabled={disabled}
                    $startAdornment={startAdornment}
                    $error={error}
                    $mouseOver={isClearButtonOnMouseOver}
                    $size={size}


                    onMouseOver={handleClearButtonMouseOver}
                    onMouseLeave={handleClearButtonMouseLeave}
                    onClick={handleClearButtonClick}   
                    type={"button"}
                    disabled={disabled || loading}
                
                >
                    <SClearIcon><FontAwesomeIcon icon={faX} /></SClearIcon>
                </SClearButton>
            }
            
            {
                loading==true &&
                <SSpinner $size={size}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </SSpinner>
            }




        </SDiv>

    )
}

TextArea.defaultProps = {
    disabled: false,
    loading: false,
    placeholder: "",
    label: "",
    rows: 4,
    size: "small"
}


export default React.memo(TextArea)