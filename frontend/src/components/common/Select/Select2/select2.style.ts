import styled from "styled-components";
import appendNewStyle from "../../../../utils/appendNewStyle";

export const SDiv = styled.div<{
    $focused?: boolean;
    $error?: string;
    $size?: string;
    theme?: any;

}>`
  position: relative;
  display: inline-block;
  width: 100%;
  //padding-top: 16px; //;

  

`;

export const STextField = styled.input<{
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
        padding: 8px; //;
        width: 100%;
        background-color: white;
        padding-right: 35px;
        font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};
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
                borderColor: theme.neutral.lighter,
                color: theme.neutral.main,
                borderStyle: "dashed",
                borderWidth: "1px",
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

            //border-width
            //If TEXTFIELD has an ERROR
            if($error) {
                style= {
                    ...style,
                    borderWidth: "1px",
                }
            } else {
                style= {
                    ...style,
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

        //padding-right
        if($clearable==true) {
            style = {
                ...style,
                paddingRight: "45px"
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


export const SLabel = styled.label<{
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
    padding: 7px 7px 7px 8px; //;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};

    ${(({$loading, $disabled, $size, theme}) => {

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

export const SArrowButton = styled.button<{
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
    right: 4px;
    width: 25px;
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
    top: ${({$size}) => ($size == "small") ? "4px" : (($size == "medium") ? "7px" : "")};
  //  overflow: hidden;



    //Conditional Style
    ${(({$loading, $disabled, $focused, $mouseOver, $size, theme}) => {

        let style = {}

        if(!$loading && !$disabled) {
            
            if($mouseOver==true) {
                style = {
                    ...style,
                    backgroundColor: theme.neutral.lightest
                } 
            }
            
            style = {
                ...style,
                color: theme.neutral.main
            }
        } else {
            style = {
                ...style,
                color: theme.neutral.lighter,
                cursor: "context-menu"
            }
        }

        //Focus state
        if($focused==true) {
            style = {
                ...style,
                transform: "rotate(180deg)",
                transition: "0.15s",
            }
        }

        return style
    })}

    &::before {
        content: '';
        transform: scale(0);
        height: 100%;
        width: 100%;
        opacity: 0.1;
        background-color: ${({theme}) => theme.neutral.darkest};
        position: absolute;
        top:0px;
        left: 0px;
        border-radius: 50px;
        transition: 0.2s;

        ${
            ({$mouseDown}) => {
                let style = {}
                //////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

                if($mouseDown == true) {
                    style = {
                        ...style,
                        transform: "scale(1)"
                    }

                }
                return style
            }
        }
    }
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
    right: 30px;
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
    top: ${({$size}) => ($size == "small") ? "4px" : (($size == "medium") ? "7px" : "")};
  //  overflow: hidden;



    //Conditional Style
    ${(({$mouseOver}) => {

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



export const SArrowIcon = styled.span<{
    $size?: string
}>`
        width: auto;

    font-size:  "12px"
`;



export const SItemList = styled.div<{
    $customStyle?: string
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $error?: string;
    $focused?: boolean;
    $isMouseOver?: boolean;
    $value?: string;
    $device?: string;
    $itemsShown?: boolean;
    $shouldListShowAtTop?: boolean;
    $topPosition?: number;
    theme?: any;
    $size?: string;


}>`

    width: 100%;
    background: white;
    border-width: thin;
    border-color: ${({theme}) => theme.neutral.lightest};
    border-style: solid;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 1px 1px 5px -1px rgba(0,0,0,0.2);
    user-select: none;
    overflow-y: scroll;
    transform: scaleY(0);
    transition: all 0.1s ease-in-out;
    transform-origin: top;
    max-height: 100%;


    ${({$itemsShown, $topPosition}) => {
        let style = {}

        if($itemsShown==true) {
            style = {
                ...style,
                transform: "scaleY(1)",

            }
        }

        return style
    }}

    ${({$shouldListShowAtTop, $topPosition}) => {
        let style= {}

        //////////console.log("THE TOP", $topPosition)

        if($shouldListShowAtTop== true) {
            style = {
                ...style,
                transformOrigin: "bottom",
            }
        }
     
        return style
    } }

       

`;

export const SGhostListBottom = styled.div<{
    $customStyle?: string
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $error?: string;
    $focused?: boolean;
    $isMouseOver?: boolean;
    $value?: string;
    $device?: string;
    $itemsShown?: boolean;
    $shouldListShowAtTop?: boolean;
    theme?: any;
    $size?: string;
    $bottomSpace: number


}>`

    width: 100%;
    position: absolute;
    z-index: 10000000000000000000000000;

    user-select: none;
    max-height: 360px;

    overflow-y: auto;
      visibility: ${({$shouldListShowAtTop, $itemsShown}) => ($shouldListShowAtTop == false && $itemsShown == true) ? "visible" : "hidden"};
    
    top: ${({$size}) => ($size == "small") ? "37px" : (($size == "medium") ? "42px" : "")};
`;

export const SGhostListTop = styled.div<{
    $customStyle?: string
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $error?: string;
    $focused?: boolean;
    $isMouseOver?: boolean;
    $value?: string;
    $device?: string;
    $itemsShown?: boolean;
    $shouldListShowAtTop?: boolean;
    theme?: any;
    $size?: string;
    $topSpace: number


}>`

    width: 100%;
    position: absolute;
       border-width: thin;
    border-color: ${({theme}) => theme.neutral.lightest};

    user-select: none;
    height: ${({$topSpace}) => {
        const maxHeight = ($topSpace<=360) ? $topSpace + "px" : "360px"
    //////////console.log("maxHeight", maxHeight)
        return maxHeight
    }
    };
    bottom: ${({$size}) => ($size == "small") ? "37px" : (($size == "medium") ? "42px" : "")};

    visibility: ${({$shouldListShowAtTop, $itemsShown}) => ($shouldListShowAtTop == true && $itemsShown == true) ? "visible" : "hidden"};
    


`;



export const SItem = styled.div<{
    $customStyle?: string
    $loading?: boolean;
    $disabled?: boolean;
    $type?: string;
    $startAdornment?: any;
    $error?: string;
    $focused?: boolean;
    $isMouseOver?: boolean;
    $value?: string;
    theme?: any;
    $mouseOver?: boolean;
    $size?: string;


}>`

    padding: 10px 5px;
    cursor: pointer;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};;


    
    ${({$mouseOver, $size, theme}) => {
        let style = {}

        if($mouseOver==true) {
            style = {
                ...style,
                backgroundColor: theme.neutral.lightest,
                //color: theme.primary.darkest,
                borderRadius: "5px"
            }
        } else {
            style = {
                ...style,
                backgroundColor: "white",
                color: "black"
            }
        }


        return style
    }}
       

`;
export const SSpinner = styled.div<{
    $size?: string
}>`
    position: absolute;
    top: ${({$size}) => ($size == "small") ? "9px" : (($size == "medium") ? "11px" : "")};;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};;
    right: ${({$size}) => ($size == "small") ? "8px" : (($size == "medium") ? "12px" : "")};;
    color: ${({theme}) => theme.neutral.lighter};
`;
