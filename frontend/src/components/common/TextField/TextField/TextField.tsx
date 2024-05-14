import React, { useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties, forwardRef } from 'react'

import { BLACK, MAGENTA } from '../../../../constants/palette'
import applyStyle from '../../../../utils/applyStyle'

import setTheme from '../../../../utils/setTheme'
import snakeToCamel from '../../../../utils/snakeToCamel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch, faEye, faEyeSlash, faSpinner, faX } from '@fortawesome/free-solid-svg-icons'
import { SClearButton, SClearIcon, SDiv, SEyeButton, SEyeIcon, SLabel, SSpinner, SStartAdornment, STextField } from './textField.style'
import { text } from 'stream/consumers'
import Ripple from '../../Ripple/Ripple'
import { neutral } from '../../../../style-helpers/theme'

import TextFieldProps from '../../../../types/TextFieldProps'
import { useTextField } from './useTextField'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import { DeviceContext } from '../../../../App'



const TextField = (props : TextFieldProps) => {

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
        

    } = useTextField(props)



    const controlled : boolean = (value!==undefined) ? true : false



    return (
        <>
            <SDiv 

                $focused={focused}
                $error={error}
                $size={size}

                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}

        
            >
            {/* TEXT FIELD */}
            <STextField 

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
                inputMode={(type=="number") ? "numeric" : "text"}
                name={name}
                onChange={handleChange}
                type={type ? (isPassword==true ? "password" : "text") : type}
                onKeyUp={handleKeyUp}
     

                 value={(controlled==true) ? value : stateValue}


                placeholder={""}

                onFocus={handleFocus}
                onBlur={handleBlur}

                ref={textFieldRef}
                //className={"input-text"}
            />
            
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

            {
                loading==true &&
                <SSpinner $size={size}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </SSpinner>
            }

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

   

            {/* END ADORNMENT */}
            {
                (type=="password" && loading==false && disabled == false) &&

                
                <SEyeButton 
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
                    <SEyeIcon><FontAwesomeIcon icon={(isPassword) ? faEye : faEyeSlash} /></SEyeIcon>
                </SEyeButton>
            }

            </SDiv>
        </>


    )
}

TextField.defaultProps = {
    disabled: false,
    loading: false,
    placeholder: "",
    label: "",
    size: "small",
    clearable: false,
    type: "text"
}


export default React.memo(TextField)