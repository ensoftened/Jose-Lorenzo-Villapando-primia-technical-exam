import styled, { css, CSSObject, keyframes } from "styled-components";
import appendNewStyle from "../../../../utils/appendNewStyle";



export const SDiv = styled.div<{
    $focused?: boolean;
    $error?: string;
    theme?: any;
    $size?: string;
}>`
  position: relative;
  display: inline-block;
  width: 100%;
  &::before {
    content: ""; /* You can change this to any icon or content you want */
    width: 0%;
    display: block;
    position: absolute;
    left: 50%;
    height: 2px;
    background: ${({theme}) => theme.primary.main};
    transition: 0.4s;
    top: ${({$size}) =>  ($size=="small") ? "34px" : "39px"}; //;


    ${({$focused, $error}) => {
        let style= {}
        if($focused && !$error) {
            style = {width: "50%"}
        }
   

        return style
    }}

    
  }
  &::after {
    content: ""; /* You can change this to any icon or content you want */
    width: 0%;
    display: block;
    position: absolute;

    right: 50%;
    height: 2px;
    background: ${({theme}) => theme.primary.main};
    transition: 0.4s;
    top: ${({$size}) =>  ($size=="small") ? "34px" : "39px"}; //;

    ${({$focused, $error}) => {
        let style= {}
        if($focused && !$error) {
            style = {width: "50%"}
        }
   

        return style
    }}

    
  }

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
    padding-top: 15px; //;
    padding-bottom: 6px;
    padding-left: 4px; //;
    width: 100%;
    background-color: white;
    padding-right: 35px;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};

    ${(({$loading, $disabled, $type, $startAdornment, $error, $mouseOver, $focused, $size, $clearable, theme}) => {

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
                cursor: "context-menu"
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
                    paddingLeft: "20px"
                }
            }

            else if($size=="medium") {
                style = {
                    ...style,
                    paddingLeft: "24px"
                }
            }

            else {

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
                fontWeight: "bold",
                left: "4px", //;
                top: "2px", //;
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
                    top: "15px",
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
    top: ${({$size}) => ($size == "small") ? "5px" : (($size == "medium") ? "8px" : "")};
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

export const SCalendarButton = styled.button<{
    $loading?: boolean;
    $disabled?: boolean;
    $calendarShown?: boolean;
    $mouseOver?: boolean;
    $mouseDown?: boolean;
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
    background: transparent;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-radius: 50px;
    overflow: hidden;
    top: ${({$size}) => ($size == "small") ? "5px" : (($size == "medium") ? "8px" : "")};

    //overflow: hidden;

    cursor: pointer;

    //Conditional Style
    ${({$disabled, $loading, $calendarShown, $mouseOver, $size, theme}) => {
        let style = {}

        ////////////////////////////////////////////////////////////////////////////////////////////console.log("$calendarShown", $calendarShown)

        if(!$disabled && !$loading) {
            //////////////////////////////////////////////////////////////////////////////////////////////console.log("ANDITO")
            if($calendarShown==true) {
                style = {
                    ...style,
                    color: theme.primary.main
                } 
            } else {
                style = {
                    ...style,
                    color: theme.neutral.main
                } 
            }

            if($mouseOver==true) {
                style = {
                    ...style,
                    backgroundColor: theme.neutral.lightest
                } 
            }
        } else {
   
                style = {
                    ...style,
                    color: theme.neutral.lighter,
                    cursor: "context-menu"
                } 
            

        }


        

        return style

    }}

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
                ////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

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

export const SCalendarIcon = styled.span`
    width: auto;
    font-size: 12px;

`;

export const SCalendarDiv = styled.div<{
    $shouldCalendarShowAtTop?:boolean
    $size?: string
}>`


    position: absolute;
    background: white;
    border-width: thin;
    border-color: ${({theme}) => theme.neutral.lightest};
    border-style: solid;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 1px 1px 5px -1px rgba(0,0,0,0.2);
    user-select: none;
    z-index: 1;

    width: ${({$size}) => ($size == "small") ? "300px" : (($size == "medium") ? "350px" : "")};
    height: ${({$size}) => ($size == "small") ? "300px" : (($size == "medium") ? "360px" : "")};

    ${({$shouldCalendarShowAtTop, $size}) => {
        let style= {}

        if($shouldCalendarShowAtTop== true) {
            style = {
                ...style,
                top: ($size=="small") ? "-302px" : (($size=="medium") ? "-360px" : "")
            }
        }
        return style
    }}
`;





export const SCalendarHeader = styled.div`

    background-color: ${({theme}) => theme.primary.main};
    color: white;
    padding: 0px 15px;
`;

export const SMonthAndYearSection = styled.div`

    width: 50%;
    display: inline-block;
    position: relative;
`;


export const SMonthButton = styled.button<{
    $size?: string
}>`

    padding: 10px 0;
    background: none;
    color: white;
    display: inline-block;
    margin: 0px 2.5px 0px 0px;
    font-family: Helvetica;
    font-size: 16px;
    cursor: pointer;

    ${({$size}) => {
        let style = {}

        if($size == "small") {
            style = {
                ...style,
                fontSize: "12px"
            }
        } else if($size == "medium") {
            style = {
                ...style,
                fontSize: "16px"
            }
        } else {

        }
        return style
    
    }}
`;


export const SYearButton = styled.button<{
    $size?: string
}>`

    padding: 10px 0;
    background: none;
    color: white;
    display: inline-block;
    margin: 0px 2.5px 0px 0px;
    font-family: "Roboto Light";
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};
    cursor: pointer;
`;

export const SLeftButton = styled.button<{
    $mouseOver: boolean;
    $mouseDown: boolean;
    $size?: string;
}>`

    font-size: 10px;
    background: none;
    color: white;

    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 50px;
    cursor: pointer;
    overflow: hidden;

    font-size: ${({$size}) => ($size == "small") ? "8px" : (($size == "medium") ? "10px" : "")};
    padding: ${({$size}) => ($size == "small") ? "8px 10px" : (($size == "medium") ? "10px 13px" : "")};

    ${
        ({$mouseOver, $mouseDown, $size, theme}) => {
            let style={}

            if($mouseOver==true || $mouseDown==true) {
                style = {
                    ...style,
                    backgroundColor: theme.primary.dark
                }
               
            }

            return style
        }
    }

    &::before {
        content: '';
        transform: scale(0);
        height: 100%;
        width: 100%;
        opacity: 0.3;
        background-color: ${({theme}) => theme.primary.darkest};
        position: absolute;
        top:0px;
        left: 0px;
        border-radius: 50px;
        transition: 0.2s;

        ${
            ({$mouseDown}) => {
                let style = {}
                ////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

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



export const SRightButton = styled.button<{
    $mouseOver: boolean;
    $mouseDown: boolean;
    $size?: string
}>`

    background: none;
    color: white;
    top: 5px;
    padding: 10px 13px;
    border-radius: 50%;
    position: absolute;
    right: 15px;
    cursor: pointer;
    overflow: hidden;
    font-size: ${({$size}) => ($size == "small") ? "8px" : (($size == "medium") ? "10px" : "")};
    padding: ${({$size}) => ($size == "small") ? "8px 10px" : (($size == "medium") ? "10px 13px" : "")};

    ${
        ({$mouseOver, $mouseDown, $size, theme}) => {
            let style={}

            if($mouseOver==true) {
                style = {
                    ...style,
                    backgroundColor: theme.primary.dark
                }
               
            }



            return style
        }
    }


&::before {
        content: '';
        transform: scale(0);
        height: 100%;
        width: 100%;
        opacity: 0.3;
        background-color: ${({theme}) => theme.primary.darkest};
        position: absolute;
        top:0px;
        left: 0px;
        border-radius: 50px;
        transition: 0.2s;

        ${
            ({$mouseDown}) => {
                let style = {}
                ////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

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


export const SCalendarBody = styled.div`
    background: none;
    position: relative;
`;


export const SDaysOfWeek = styled.div<{
    $size?: string
}>`

    width: 14.2%;
    text-align: center;
    display: inline-block;
    font-weight: bold;
    color: ${({theme}) => theme.neutral.darker };
    font-size: ${({$size}) => ($size == "small") ? "10px" : (($size == "medium") ? "12px" : "")};
    padding: ${({$size}) => ($size == "small") ? "10px 0px" : (($size == "medium") ? "15px 0px" : "")};
`;

export const SDatePanel = styled.div`

    width: 100%;
    padding: 0px 15px;
`;

export const SDateGrid = styled.div`

    width: 14.2%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
`;

export const SPastAndFutureDateGrid = styled.div<{
    $size?: string
}>`

    width: 14.2%;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    color: ${({theme})=>theme.neutral.main};
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};;
`;

export const SDayItem = styled.div<{
    $active: boolean;
    $mouseOver: boolean;
    $mouseDown: boolean;
    $size?: string;
}>`



    text-align: center;
    margin: 0 auto;
    cursor: pointer;
    background-color: white;
    color: black;
    border-radius: 50px;
    position: relative;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};
    padding: ${({$size}) => ($size == "small") ? "10px" : (($size == "medium") ? "11px" : "")};

    //Conditional Style
    ${({$active, $mouseOver, $mouseDown, $size, theme}) => {
        //////////////////////////////////////////////////////////////////////////////////////////////console.log("MOUSEOVER", $mouseOver)
        //////////////////////////////////////////////////////////////////////////////////////////////console.log("mouseDown", $mouseDown)
        let style = {}

        if($active==true) {
            style = {
                ...style,
                backgroundColor: theme.primary.lightest,
                color: theme.primary.darkest
            }
        } 

        //States
        if($mouseOver==true && $active==false) {
            style = {
                ...style,
                backgroundColor: theme.neutral.lightest,
            }
        }
        
        return style
    }}

    &::before {
        content: '';
        transform: scale(0);
        height: 100%;
        width: 100%;
        opacity: 0.3;
        background-color: ${({theme}) => theme.neutral.main};
        position: absolute;
        top:0px;
        left: 0px;
        border-radius: 50px;
        transition: 0.2s;

        ${
            ({$mouseDown}) => {
                let style = {}
                ////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

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

export const SMonthPanel = styled.div`
    position: absolute; 
    top: 0;
    left: 0;
    
`;

export const SMonthItemDiv = styled.div<{
    $size?: string
}>`

    width: 33%;
    display: inline-block;
    margin-top: 10px;
    text-align: center;
    font-size: ${({$size}) => ($size == "small") ? "10px" : (($size == "medium") ? "14px" : "")};;
    padding: ${({$size}) => ($size == "small") ? "10px 5px" : (($size == "medium") ? "15px 5px" : "")};;

`;

export const SMonthItem = styled.div<{
    $active: boolean;
    $mouseOver: boolean;
    $mouseDown: boolean;
    $size?: string
}>`

    width: 100%;
    font-size: 14px;
    background-color: white;
    outline: 0;
    border: 0;
    padding: 10px 5px;
    cursor: pointer;
    border-radius: 50px;
    position: relative;
    overflow: hidden;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};;
    padding: ${({$size}) => ($size == "small") ? "7.5px 5px" : (($size == "medium") ? "10px 5px" : "")};;


    //Conditional Style
    ${({$active, $mouseOver, $mouseDown, $size, theme}) => {
        let style = {}

        if($active==true) {
            style = {
                ...style,
                backgroundColor: theme.primary.lightest,
                color: theme.primary.darkest
            }
        } 

        //States
        if($mouseOver==true && $active==false) {
            style = {
                ...style,
                backgroundColor: theme.neutral.lightest,
            }
        }

        return style
    }}

&::before {
        content: '';
        transform: scale(0);
        height: 100%;
        width: 100%;
        opacity: 0.3;
        background-color: ${({theme}) => theme.neutral.main};
        position: absolute;
        top:0px;
        left: 0px;
        border-radius: 50px;
        transition: 0.2s;

        ${
            ({$mouseDown}) => {
                let style = {}
                ////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

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

export const SYearPanel = styled.div<{
    $size?: string
}>`

    position: absolute; 
    top: 0; 
    left: 0; 
    overflow-y: scroll; 
    height: ${({$size}) => ($size == "small") ? "250px" : (($size == "medium") ? "316px" : "")};

`;


export const SYearItemDiv = styled.div`

    width: 25%;
    display: inline-block;
    padding: 10px 5px;
    // marginTop: 10px;
    cursor: pointer;
    text-align: center;
`;



export const SYearItem = styled.div<{
    $active: boolean;
    $mouseOver: boolean;
    $mouseDown: boolean;
    $size?: string
}>`

    width: 100%;
    font-size: 14px;
    background: none;
    outline: 0;
    border: 0;

    cursor: pointer;
    border-radius: 50px;
    overflow: hidden;
    position: relative;

    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};
    padding: ${({$size}) => ($size == "small") ? "7.5px 5px" : (($size == "medium") ? "10px 5px" : "")};

    //Conditional Style
    ${({$active, $mouseOver, $mouseDown, $size, theme}) => {
        let style = {}

        if($active==true) {
            style = {
                ...style,
                backgroundColor: theme.primary.lightest,
                color: theme.primary.darkest
            }
        } 

        //States
        if($mouseOver==true && $active==false) {
            style = {
                ...style,
                backgroundColor: theme.neutral.lightest,
            }
        }

        return style
    }}

    &::before {
        content: '';
        transform: scale(0);
        height: 100%;
        width: 100%;
        opacity: 0.3;
        background-color: ${({theme}) => theme.neutral.main};
        position: absolute;
        top:0px;
        left: 0px;
        border-radius: 50px;
        transition: 0.2s;

        ${
            ({$mouseDown}) => {
                let style = {}
                ////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

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

export const SSpinner = styled.div<{
    $size?: string
}>`
    position: absolute;
    top: ${({$size}) => ($size == "small") ? "9px" : (($size == "medium") ? "11px" : "")};;
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};;
    right: ${({$size}) => ($size == "small") ? "8px" : (($size == "medium") ? "12px" : "")};;
    color: ${({theme}) => theme.neutral.lighter};
`;











