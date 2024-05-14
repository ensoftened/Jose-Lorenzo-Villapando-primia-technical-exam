import React, { useContext, useEffect, useState, useCallback, useMemo, memo, } from 'react'
import { useRadioButton } from './useRadioButton';
import RadioButtonProps from '../../../types/RadioButtonProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { SRadioButton, SRadioButtonDiv, SRadioButtonItem, SDiv, SLabel } from './radiobutton.style';
import Ripple from '../Ripple/Ripple';
import reactStringReplace from 'react-string-replace';
import extractXMLContent from '../../../utils/extractXMLContent';
import TextField from '../TextField/TextField/TextField';
import { Div } from '@common/Div/Div';

const RadioButton = (props : RadioButtonProps) => {

    const {
        isDisabled,
        item,
        index,
        name,
        style,
        isChecked,
        children,
        onFieldChange,
        value,
        onChange,
        
  
    } = props

    ////////////////////////////////////////////////////////////////////////////////console.log("VALUE", value)
    const label = children
    


    const {

        //States
        isRadioButtonChecked,
        isRadioButtonItemOnMouseOver,
        isRadioButtonOnMouseDown,

        labelHasFields,

        //Refs
        checkBoxRef,
        checkBoxIconRef,

        //Other Constants


        //Functions / Events
        handleChange,
        handeMouseOver,
        handleMouseLeave,
        handleRadioButtonMouseDown,
        handleRadioButtonMouseUp,
        handleRadioButtonMouseOver,
        handleRadioButtonMouseLeave,
        handleRadioButtonClick,
        handleTextFieldChange,
        handleChangeAsStandalone
    } = useRadioButton(props)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log('RadioButton Component Rendered', isRadioButtonChecked) 


    useEffect(() => {}, [])


    return (
        <>
        
            <SDiv 
                $customWidth={style?.width}

                $disabled={isDisabled}
                $mouseOver={isRadioButtonItemOnMouseOver}

                ref={checkBoxRef}



            >

                <SRadioButtonItem 
                    $customStyle={style}
                    $disabled={isDisabled}
                    $mouseOver={isRadioButtonItemOnMouseOver}

                    onMouseOver={handeMouseOver}
                    onMouseLeave={handleMouseLeave}
                > 

                    <SRadioButtonDiv>
                        <SRadioButton
                            $checked={isRadioButtonChecked}
                            $disabled={isDisabled}
                            $mouseDown={isRadioButtonOnMouseDown}
                            $labelHasFields={labelHasFields}

                            type="radio"
                            checked={isRadioButtonChecked}
                            onChange={item ? (event: any) => handleChange(event, item.id, label) : handleChangeAsStandalone}

                            onMouseDown={handleRadioButtonMouseDown}
                            onMouseUp={handleRadioButtonMouseUp}
                            onMouseLeave={handleRadioButtonMouseLeave}
                            onMouseOver={handleRadioButtonMouseOver}
                            onClick={handleRadioButtonClick}


                            name={name}

                            disabled={isDisabled}
                            //value={item.label}
                        />

                  

                

                    </SRadioButtonDiv>

                    <SLabel $disabled={isDisabled}>
                
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
                                   // value={fieldValue[0]}
                                    // loading
                                    // error={"l"}
                                //    value={value1} 
                                    disabled={isRadioButtonChecked==false}
                             
                                    onChange={(e: any) => handleTextFieldChange(e, i, match, textFieldName ? textFieldName[1] : "")}
                                    />
                                          </Div>
                                );
                          
                            }
                        )
                        }
                        
                    </SLabel>
                    

            </SRadioButtonItem>
       

           
     
            </SDiv>
        
            
        </>
        
      );
}

RadioButton.defaultProps = {
    isDisabled: false,
    isChecked: false,
}


export default memo(RadioButton)