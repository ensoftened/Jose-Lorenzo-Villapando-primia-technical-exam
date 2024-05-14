import styled, { css, CSSObject } from "styled-components";
import appendNewStyle from "../../../../utils/appendNewStyle";


export const SDiv = styled.div<{
    $focused?: boolean;
    $error?: string;
    $size?: string;
    theme?: any
}>`
  position: relative;
  display: inline-block;
  width: 100%;

  
`;

export const STextArea = styled.textarea<{
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $startAdornment?: any
    $error?: string;
    $mouseOver?: boolean;
    $focused?: boolean;
    $value?: string;
    $size?: string;
    $clearable?: boolean;

}>`

    font-family: Roboto Regular;
    outline: 0;
    padding-top: 15px; //;
    padding-bottom: 6px;
    padding-left: 4px; //;
    padding-right: 4px; //;
    width: 100%;
    resize: none;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};

    //transition: 0.150s;

    
    ${(({$loading, $disabled, $type, $startAdornment, $error, $mouseOver, $focused,  $clearable, theme}) => {

        let style = {}


        // border-bottom-color, border-style, color, cursor
        //If TEXTFIELD is LOADING OR DISABLED
        if($loading || $disabled) {
            //////////////////////////////////////////////////////////////////////////////////////////console.log("DITEYYYY")
            style= {
                ...style,
                borderBottomColor: theme.neutral.lighter,
                color: theme.neutral.main,
                borderStyle: "dashed",
                borderBottomWidth: "1px",
                cursor: "context-menu",
                backgroundColor: "transparent"
            }
        } else {
            //////////////////////////////////////////////////////////////////////////////////////////console.log("ELSA") 
            style = appendNewStyle(
                style,             
                { 
                    borderStyle: "solid",
                    color: "solid",
                    cursor: "text"
                }
            )
            

            if($error) {
                style= {
                    ...style,
                    borderBottomColor: theme.errorTheme.main,
                    borderBottomWidth: "2px",
                    
                }
            } else {
                style= {
                    ...style,
                    borderBottomColor: theme.neutral.main,
                    borderBottomWidth: "1px",
                }
            }

            //border-bottom-width
            //If TEXTFIELD has an ERROR
            if($error) {
                style= {
                    ...style,
                    borderBottomWidth: "2px",
                }
            } else {
                style= {
                    ...style,
                    borderBottomWidth: "1px",
                }
            }

            //Focus state
            if($focused) {
                if($error) {
                    style = {
                        ...style,
                        borderBottomColor: theme.errorTheme.main,
                        borderBottomWidth: "2px",
                    }
                }


            }

            //Mouse Over state
            if($mouseOver==true) {
                if(!$error) {
                    
                    style = {
                        ...style,
                        borderBottomWidth: "1px",
                        borderBottomColor: theme.neutral.darker
                    }

                }
            }

        }



        //padding-left
        //If there is a START ADORNMENT
        if($startAdornment) {
            style = {
                ...style,
                paddingLeft: "22px"
            }
        }

        //padding-right
        //If the type of text is PASSWORD
        if($clearable==true && !$loading) {
            //////////////////////////////////////////////////////////////////////////////////////////console.log("OO Password")
            style = {
                ...style,
                paddingRight: "25px"
            }
        }





        return style
    })};

`;


export const SLabel = styled.label<{
    $customStyle?: string
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $startAdornment?: any;
    $error?: string;
    $focused?: boolean;
    $value?: string;
    $size?: string;



}>`

    font-family: Helvetica;
    position: absolute;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.150s; 
    left: ${({$size}) => ($size == "small") ? "18px" : (($size == "medium") ? "22px" : "")};
    background-color: white;
    width: calc(100% - 20px);

    
    ${(({$loading, $disabled, $focused, $value, $type, $startAdornment, $error, $size, theme}) => {
        
        let style = {}

        //color, cursor
        //If COMPONENT is LOADING or DISABLED
        if($loading || $disabled) {
            //////////////////////////////////////////////////////////////////////////////////////////console.log("HEHEHEHE")
            style = {
                ...style,
                color: theme.neutral.lighter,
                cursor: "context-menu",

            }
        }   
        else {
            style = {
                ...style,
                cursor: "text"
            }
            if($focused) {

                style = {
                    ...style,
                    color: theme.primary.main,

                }
            } 

            else {
                style = {
                    ...style,
                    color: theme.neutral.main,

                }
            }
        }

        //top, font size
        //If TEXTFIELD has a VALUE
        if($value || $focused == true || $startAdornment) {
            style = {
                ...style,
                paddingTop: "2px",
                fontWeight: "bold",
                left: "4px", //;
                top: "0px", //;
            }

            if($size == "small") {
                style = {
                    ...style,
                    fontSize: "10px"
                }
            } 

            else if($size == "medium") {
                style = {
                    ...style,
                    fontSize: "12px"
                }
            } else {

            }
        } else {
            //IF NOT FOCUSED
            if(!$startAdornment) {
                style={
                    ...style,
                    top: "11px",
                    fontSize: "12px"
                }  

                if($size == "small") {
                    style = {
                        ...style,
                        fontSize: "12px"
                    }
                } 

                else if($size == "medium") {
                    style = {
                        ...style,
                        fontSize: "16px"
                    }
                } else {
                    
                }
            }
            
        }

        if($error) {
            style={
                ...style,
                color: theme.errorTheme.main,
            }  
        }

        //right
        //If TEXTFIELD TYPE is PASSWORD
        if($type == "password") {
            style={
                ...style,
                right: "22px"
            }  
        }

        //left
        if(!$startAdornment || $value || $focused) {
            style={
                ...style,
                left: "4px"
            }  
        } else {
            //////////////////////////////////////////////////////////////////////////////////////////console.log("ELSAA")
            style={
                ...style,
                left: "22px"
            }  
        }

        return style
    })};

`;

export const SStartAdornment = styled.div<{
    $loading?: boolean;
    $disabled?: boolean;
    $size?: string;


}>`

    
    position: absolute;
    top: 0;
    padding: 13px 4px 9px 4px; //;    
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};;


    ${(({$loading, $disabled, theme}) => {

        let style = {}

        if(!$disabled && !$loading) {

            style = {
                ...style,
                color: theme.neutral.main
            }
        }

        else {
            style= {
                ...style,
                color: theme.neutral.lighter
            }
        }

        return style
    })};

`;

export const SClearButton = styled.button<{
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $startAdornment?: any;
    $error?: string;
    $focused?: boolean;
    $mouseOver?: boolean;
    $mouseDown?: boolean;
    $value?: string;
    $size?: string;


}>`
    outline: 0;
    cursor: pointer;
    border: 0;
    position: absolute;
    right: 16px;
    bottom: 10px;
    
    width: 10px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-radius: 50px;
    overflow: hidden;
    transition: 0.2s;
    background: transparent;
    transform: rotate(0deg);
    color: ${({theme}) => theme.neutral.main};
    //top: ${({$size}) => ($size == "small") ? "5px" : (($size == "medium") ? "10px" : "")};
  //  overflow: hidden;



    //Conditional Style
    ${(({$mouseOver, $type}) => {

        let style = {}

        if($mouseOver == true) {
            style = {
                ...style,
                color: "black"
            }
        } 

        return style
    })}


`;


export const SClearIcon = styled.span`
    width: auto;
    font-size: 9px;
`;


export const SSpinner = styled.div<{
    $size?: string
}>`
    position: absolute;
    bottom: ${({$size}) => ($size == "small") ? "9px" : (($size == "medium") ? "11px" : "")};;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};;
    right: ${({$size}) => ($size == "small") ? "8px" : (($size == "medium") ? "12px" : "")};;
    color: ${({theme}) => theme.neutral.lighter};
`;