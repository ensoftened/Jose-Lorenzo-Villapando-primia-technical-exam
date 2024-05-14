import React, { useContext, useEffect, useState, useCallback, useMemo, memo, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { SInput,  SLabel,  Switch } from './toggleSwitch.style';
import Ripple from '../Ripple/Ripple';
import reactStringReplace from 'react-string-replace';
import extractXMLContent from '../../../utils/extractXMLContent';
import TextField from '../TextField/TextField/TextField';
import { useToggleSwitch } from './useToggleSwitch';
import CheckBoxProps from 'types/CheckBoxProps';
import { Div } from '@common/Div/Div';


const ToggleSwitch = (props : CheckBoxProps) => {

    const {
        disabled,
        item,
        index,
        name,
        style,
        isChecked,
        children,
        onFieldChange,
        value,
        onChange,
        size,
        
  
    } = props

    //////////////////////////////////////////////////////////////////////////////////console.log("item", item)
    //////////////////////////////////////////////////////////////////////////////////console.log("VALUE", value)
    const label = children
    


    const {

        //States
        isCheckBoxChecked,
        isCheckBoxItemOnMouseOver,
        isCheckBoxOnMouseDown,

        labelHasFields,

        //Refs
        checkBoxRef,
        checkBoxIconRef,

        //Other Constants


        //Functions / Events
        handleChange,
        handeMouseOver,
        handleMouseLeave,
        handleCheckBoxMouseDown,
        handleCheckBoxMouseUp,
        handleCheckBoxMouseOver,
        handleCheckBoxMouseLeave,
        handleCheckBoxClick,
        handleTextFieldChange,
        handleChangeAsStandalone
    } = useToggleSwitch(props)

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log('CheckBox Component Rendered', isCheckBoxChecked) 


    useEffect(() => {}, [])


    return (
        <>
                <SLabel 
                    $customStyle={style}
                    $disabled={disabled}
                    $mouseOver={isCheckBoxItemOnMouseOver}
                    $size={size}

                    onMouseOver={handeMouseOver}
                    onMouseLeave={handleMouseLeave}
                    ref={checkBoxRef}
                > 
                                       <span>
                
                {

                    reactStringReplace(label, /(<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*>.*?<\/\w+\s*>|<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*\/>)/g, (match, i, offset) => {
                        
                        let fieldValue: any[] = []
                        let labelWithValue
                        if(value) {
                            labelWithValue = value.label
                            //////////////////////////////////////////////////////////////////////////////////////console.log("labelWithValue", labelWithValue)
                            const regex = new RegExp("<" + i + ">.*?<\/" + i + ">");
                            //////////////////////////////////////////////////////////////////////////////////////console.log("REGEX", regex)
                            const m = regex.exec(labelWithValue);

                            if(m) {
                                //////////////////////////////////////////////////////////////////////////////////////console.log("m", m[0])
                                fieldValue = extractXMLContent(m[0])
                            }
                        }
                        
                   

                        const widthRegex = /width='(.*?)'/;
                        const width = widthRegex.exec(match);

                        ////////////////////////////////////////////////////////////////////////////////////console.log("WIDTH", width)
                        
                
                        const labelRegex = /label='(.*?)'/;
                        const textFieldLabel = labelRegex.exec(match);

                        



                        return (
                            <Div style={{display: "inline-block", margin: "0px 5px"}}>
                         <TextField  
                            defaultValue={fieldValue[0]}
                           // label={textFieldLabel ? textFieldLabel[1] : ""}
                           // value={fieldValue[0]}
                            // loading
                            // error={"l"}
                        //    value={value1} 
                            style={{width: (width) ? width[1] : "200px"}} 
                            onChange={(e: any) => handleTextFieldChange(e, i, match)}
                            />
                                  </Div>
                        );
                  
                    }
                )
                }
                
                </span>

                        <SInput
                            $checked={value==true}
                            $disabled={disabled}
                            $mouseDown={isCheckBoxOnMouseDown}
                            $labelHasFields={labelHasFields}
                            $size={size}

                            type="checkbox"
                            checked={value==true}
                            onChange={item ? (event: any) => handleChange(event, item.id, label) : handleChangeAsStandalone}

                            onMouseDown={handleCheckBoxMouseDown}
                            onMouseUp={handleCheckBoxMouseUp}
                            onMouseLeave={handleCheckBoxMouseLeave}
                            onMouseOver={handleCheckBoxMouseOver}
                            onClick={handleCheckBoxClick}


                            name={name}

                            disabled={disabled}
                            //value={item.label}
                        />

                        <Switch 
                        
                            $disabled={disabled}
                            $size={size} 
                        />

                  


    

                    

                </SLabel>
       

           
     

        
            
        </>
        
      );
}

ToggleSwitch.defaultProps = {
    disabled: false,
    isChecked: false,
    size: "small"
}


export default memo(ToggleSwitch)