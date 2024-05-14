import React, { useContext, useEffect, useState, useCallback, useMemo, memo, } from 'react'
import { useCheckBox } from './useCheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { SCheckBox, SCheckBoxDiv, SCheckBoxItem, SCheckIcon, SDiv, SLabel } from './checkBox.style';
import Ripple from '../Ripple/Ripple';
import reactStringReplace from 'react-string-replace';
import extractXMLContent from '../../../utils/extractXMLContent';
import TextField from '../TextField/TextField/TextField';
import CheckBoxProps from 'types/CheckBoxProps';
import { Div } from '@common/Div/Div';

const CheckBox = (props : CheckBoxProps) => {

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
        size
        
  
    } = props

    ////////////////////////////////////////////////////////////////////////////////console.log("item", item)
    ////////////////////////////////////////////////////////////////////////////////console.log("VALUE", value)
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
    } = useCheckBox(props)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log('CheckBox Component Rendered', isCheckBoxChecked) 


    useEffect(() => {}, [])


    return (
        <>
        
            <SDiv 
                $customWidth={style?.width}

                $disabled={disabled}
                $mouseOver={isCheckBoxItemOnMouseOver}

                ref={checkBoxRef}



            >

                <SCheckBoxItem 
                    $customStyle={style}
                    $disabled={disabled}
                    $mouseOver={isCheckBoxItemOnMouseOver}
                    $size={size}

                    onMouseOver={handeMouseOver}
                    onMouseLeave={handleMouseLeave}
                > 

                    <SCheckBoxDiv
                        $size={size}
                    >
                        <SCheckBox
                            $checked={isCheckBoxChecked}
                            $disabled={disabled}
                            $mouseDown={isCheckBoxOnMouseDown}
                            $labelHasFields={labelHasFields}
                            $size={size}

                            type="checkbox"
                            checked={isCheckBoxChecked}
                            onChange={item ? (event: any) => handleChange(event, item._id, label) : handleChangeAsStandalone}

                            onMouseDown={handleCheckBoxMouseDown}
                            onMouseUp={handleCheckBoxMouseUp}
                            onMouseLeave={handleCheckBoxMouseLeave}
                            onMouseOver={handleCheckBoxMouseOver}
                            onClick={handleCheckBoxClick}


                            name={name}

                            disabled={disabled}
                            //value={item.label}
                        />

                  
                                                    
                        <CSSTransition unmountOnExit itemListRef={checkBoxIconRef} in={isCheckBoxChecked==true} timeout={600} classNames={"fadeScaleShort"}>
                            <SCheckIcon $size={size} $labelHasFields={labelHasFields} ref={checkBoxIconRef}>
                                <FontAwesomeIcon icon={faCheck} />
                            </SCheckIcon>
                        </CSSTransition>
                

                    </SCheckBoxDiv>

                    <SLabel $size={size} $disabled={disabled}>
                
                        {

                            reactStringReplace(label, /(<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*>.*?<\/\w+\s*>|<\w+(?:\s+\w+(?:=(?:"[^"]*"|'[^']*'|[^'"\s]+))?)*\s*\/>)/g, (match, i, offset) => {
                                //////////////////////////////////////////////////console.log("MATCH", match)
                                ////////////////////////////////////////////////console.log("i", i)
                                let fieldValue: any[] = []
                                let labelWithValue

                                
                                const widthRegex = /width='(.*?)'/;
                                const width = widthRegex.exec(match);

                               ////////////////////////////////////////////////console.log("WIDTH", width)
                                
                        
                                const labelRegex = /label='(.*?)'/;
                                const textFieldLabel = labelRegex.exec(match);

                                const nameRegex = /name='(.*?)'/;
                                const textFieldName = nameRegex.exec(match)!;
                                //////////////////////////console.log("LABEL", label)
                                //////////////////////////console.log("MATCH", match)
                                //////////////////////////console.log("TEXTFIELD NAME", textFieldName)
                                if(value) {
                                    labelWithValue = value.label
                                    ////////////////////////////////////////////////////////////////////////////////////console.log("labelWithValue", labelWithValue)
                                    const regex = new RegExp("<" + textFieldName[1] + ">.*?<\/" + textFieldName[1] + ">");
                                    ////////////////////////////////////////////////////////////////////////////////////console.log("REGEX", regex)
                                    const m = regex.exec(labelWithValue);

                                    if(m) {
                                        ////////////////////////////////////////////////console.log("m", m[0])
                                        fieldValue = extractXMLContent(m[0])
                                    }
                                }
                                
                           



                                

  

                                return (
                                    <Div style={{display: "inline-block", margin: "0px 5px", width: (width) ? width[1] : "200px"}}>
                                 <TextField  
                                    defaultValue={fieldValue[0]}
                                    label={textFieldLabel ? textFieldLabel[1] : ""}
                                    name={textFieldName ? textFieldName[1] : ""}
                                    size={size}
                                   // value={fieldValue[0]}
                                    // loading
                                    // error={"l"}
                                //    value={value1} 
                                    disabled={isCheckBoxChecked==false}
                             
                                    onChange={(e: any) => handleTextFieldChange(e, i, match, textFieldName ? textFieldName[1] : "")}
                                    />
                                          </Div>
                                );
                          
                            }
                        )
                        }
                        
                    </SLabel>
                    

            </SCheckBoxItem>
       

           
     
            </SDiv>
        
            
        </>
        
      );
}

CheckBox.defaultProps = {
    disabled: false,
    isChecked: false,
    size: "small"
}


export default memo(CheckBox)