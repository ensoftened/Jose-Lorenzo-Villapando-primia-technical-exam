import styled, { css, CSSObject } from "styled-components";


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

export const STextArea = styled.div<{
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

        outline: 0;
        width: 100%;
        background-color: white;
        border-radius: 5px; //;
        //transition: 0.150s;
    
    
    ${(({$loading, $disabled, $type, $startAdornment, $error, $mouseOver, $focused, $size, $clearable, theme}) => {

        let style = {}


        // border-bottom-color, border-style, color, cursor
        //If TEXTFIELD is LOADING OR DISABLED
        if($loading || $disabled) {
            ////////////////////////////////////////////////////////////////////////////////////////console.logDITEYYYY")
            style= {
                ...style,
                borderWidth: "1px",
                borderColor: theme.neutral.lighter,
                color: theme.neutral.main,
                borderStyle: "dashed",
                cursor: "context-menu"
            }
        } else {
            ////////////////////////////co////////////////////////////////////////////////////////////console.logSA") 
            style = {
                ...style,             
            
                borderStyle: "solid",
                color: "solid",
                cursor: "text"
                
            }
            

            if($error) {
                style= {
                    ...style,
                    borderColor: theme.errorTheme.main,
                    borderWidth: "1px",
                    
                }
            } else {
                style= {
                    ...style,
                    borderColor: theme.neutral.light,
                    borderWidth: "1px",
                }
            }


            //Focus state
            if($focused) {
                if($error) {
                    style = {
                        ...style,
                        borderColor: theme.errorTheme.main,
                        borderWidth: "1px",
                    }
                } else {
                    style = {
                        ...style,
                        borderColor: theme.primary.main,
                        borderWidth: "2px",
                    }
                }


            }

            //Mouse Over state
            if($mouseOver==true) {
                if(!$error && $focused==false) {
                    
                    style = {
                        ...style,
                        borderWidth: "1px",
                        borderColor: theme.neutral.darker
                    }

                }
            }

        }

        if($clearable==true) {
            style = {
                ...style,
                paddingRight: "25px"
            }
        } 

        if($loading) {

            if($size=="small") {
                style = {
                    ...style,
                    paddingRight: "25px"
                }
            } else if($size=="medium") {
                style = {
                    ...style,
                    paddingRight: "32px"
                }

            } else {

            }
        }

        //padding-left
        //If there is a START ADORNMENT
        if($startAdornment) {
            if($size=="small") {
                style = {
                    ...style,
                    paddingLeft: "26px" //;
                }
            }

            else if($size=="medium") {
                style = {
                    ...style,
                    paddingLeft: "30px" //;
                }
            }

            else {

            }

        }

        //padding-right
        //If the type of text is PASSWORD
        if($type=="password" && !$loading) {
            ////////////////////////////cons////////////////////////////////////////////////////////////console.logassword")
            style = {
                ...style,
                paddingRight: "35px" //;
            }

            
            if($clearable==true) {
                style = {
                    ...style,
                    paddingRight: "45px"
                }
            } 




        }





        return style
    })};


`;


export const SLabel =  styled.label<{
    $customStyle?: string
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $startAdornment?: any;
    $error?: string;
    $focused?: boolean;
    $value?: string;
    $size?: string


}>`

    font-family: Helvetica;
    position: absolute;
    user-select: none;
    white-space: nowrap;
    left: 0px;
    top: -16px;
    /* font-weight: bold; */
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.1s; 

    font-size: ${({$size}) => ($size == "small") ? "10px" : (($size == "medium") ? "12px" : "")};;

    
    ${(({$loading, $disabled, $focused, $value, $type, $startAdornment, $error, $size, theme}) => {
        
        let style = {}

        //color, cursor
        //If COMPONENT is LOADING or DISABLED
        if($loading || $disabled) {
            ////////////////////////////consol////////////////////////////////////////////////////////////console.logHE")
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
    padding: 8px 4px 9px 8px; //;    
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