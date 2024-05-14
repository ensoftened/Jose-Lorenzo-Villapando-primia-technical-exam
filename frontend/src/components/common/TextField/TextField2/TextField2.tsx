import React, { useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties, forwardRef } from 'react'

import { BLACK, MAGENTA } from '../../../../constants/palette'
import applyStyle from '../../../../utils/applyStyle'

import setTheme from '../../../../utils/setTheme'
import snakeToCamel from '../../../../utils/snakeToCamel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch, faEye, faEyeSlash, faSpinner, faX } from '@fortawesome/free-solid-svg-icons'
import { SClearButton2, SClearIcon2, SDiv2, SEyeButton2, SEyeIcon2, SLabel2, SSpinner2, SStartAdornment2, STextField2 } from './textField2.style'
import { text } from 'stream/consumers'
import Ripple from '../../Ripple/Ripple'
import { neutral } from '../../../../style-helpers/theme'

import TextFieldProps from '../../../../types/TextFieldProps'
import { useTextField2 } from './useTextField2'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import { DeviceContext } from '../../../../App'



const TextField2 = (props : TextFieldProps) => {
    //////////////////////////console.log("TEXTFIELD2 RENDERED")
    const {

        disabled,
        error,
        loading,
        onChange,
        
        startAdornment,
        style,
        value,
        name,
        type,
        placeholder,
        defaultValue,
        label,
        size,
        variant,
        clearable

        
    } = props
    
//////console.log("TEXTFIELD2 RENDERED", name)

    
    const {
        stateValue,
        setStateValue,
        isEyeButtonOnMouseOVer, setIsEyeButtonOnMouseOver,
        isEyeButtonOnMouseDown, setIsEyeButtonOnMouseDown,
        isClearButtonOnMouseOver, setIsClearButtonOnMouseOver,

        focused, setIsFocused,
        isMouseOver, setIsMouseOver,

        
        labelRef,
        isPassword,

        textFieldRef,

        handleChange,
        handleFocus,
        handleBlur,
        handleMouseOver,
        handleMouseLeave,
        handlePasswordEyeButtonClick,
        handleEyeButtonMouseOver,
        handleEyeButtonMouseLeave,
        handleEyeButtonMouseDown,
        handleEyeButtonMouseUp,
        handleKeyUp,
        handleClearButtonClick,
        handleClearButtonMouseOver,
        handleClearButtonMouseLeave,
        

    } = useTextField2(props)



    const controlled : boolean = (value!==undefined) ? true : false



    return (
        <>
            <SDiv2 

                $focused={focused}
                $error={error}
                $size={size}

                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}

        
            >
            {/* TEXT FIELD */}
            <STextField2 

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
                $type={type}


                disabled={(disabled || loading)}
         
                name={name}
                onChange={handleChange}
                type={type ? (isPassword==true ? "password" : "text") : type}
                onKeyUp={handleKeyUp}
     

                 value={(controlled==true) ? value : stateValue}


                placeholder={placeholder}

                onFocus={handleFocus}
                onBlur={handleBlur}

                ref={textFieldRef}
                //className={"input-text"}
            />
            
            {/* LABEL / PLACEHOLDER */}
            <SLabel2 
            
                $disabled={disabled}
                $loading={loading}
                $focused={focused}
                $value={(controlled==true) ? value : stateValue}
                $error={error}
                $startAdornment={startAdornment}
                $size={size}
                


                ref={labelRef}                 
                onBlur={handleBlur}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} 
            >
                {label}
            </SLabel2>

            {/* START ADORNMENT */}
            <SStartAdornment2
            
                $disabled={disabled}
                $loading={loading}
                $size={size}

                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} 
            >
                {startAdornment}
            </SStartAdornment2>

            {
                loading==true &&
                <SSpinner2 $size={size}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </SSpinner2>
            }

            {
                (clearable == true && loading==false && disabled==false) &&
                <SClearButton2
                    
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
                    <SClearIcon2><FontAwesomeIcon icon={faX} /></SClearIcon2>
                </SClearButton2>
            }

   

            {/* END ADORNMENT */}
            {
                (type=="password" && loading==false && disabled == false) &&

                
                <SEyeButton2 
                    $disabled={disabled}
                    $loading={loading}
                    $mouseOver={isEyeButtonOnMouseOVer}
                    $mouseDown={isEyeButtonOnMouseDown}
                    $size={size}
                    onMouseOver={handleEyeButtonMouseOver}
                    onMouseDown={handleEyeButtonMouseDown}
                    onMouseUp={handleEyeButtonMouseUp}
                    onMouseLeave={handleEyeButtonMouseLeave} 
                    onClick={handlePasswordEyeButtonClick}
                    disabled={disabled || loading}
                    type={"button"}

                >
                    <SEyeIcon2><FontAwesomeIcon icon={(isPassword) ? faEye : faEyeSlash} /></SEyeIcon2>
                </SEyeButton2>
            }

            </SDiv2>
        </>


    )
}

TextField2.defaultProps = {
    disabled: false,
    loading: false,
    placeholder: "",
    label: "",
    size: "small",
    clearable: false,
    type: "text"
}


export default React.memo(TextField2)