import styled from "styled-components";

export const SDiv = styled.div<{
    $customWidth?: any
    $disabled?: boolean;
    $mouseOver?: boolean;
}>`
      ${({$customWidth}) => {return {width: $customWidth}}}
        display: inline-block;
        margin-right: 10px;
        width: 100%;
        padding: 5px;
        margin: 2.5px 0;
        background: white;
        border-radius: 5px;

        ${({$disabled, $mouseOver, theme}) => {

            ////////////////////////////////////////////////////////////////////////////////////////////console.log("$mouseOver,", $mouseOver)
            let style = {}
            if($disabled==true) {
                style = {
                    ...style,
                    cursor: "context-menu",
                }
            } else {
                style= {
                    ...style,
                    cursor: "pointer",
                }

                if($mouseOver==true) {

                    style = {
                        ...style,
                        background: theme.neutral.lightest
                    }
                }
            }

            ////////////////////////////////////////////////////////////////////////////////////////////console.log("THE STYLE", style)


            return style
        }}
`;


export const SRadioButtonItem = styled.label<{
    $customStyle?: any,
    $mouseOver?: boolean,
    $disabled?: boolean
}>`
    font-size: 14px;
   // line-height: 25px;
    user-select: none;
    background: pink;

    ${({$customStyle}) => $customStyle};

    ${({$disabled, $mouseOver, theme}) => {

        ////////////////////////////////////////////////////////////////////////////////////////////console.log("$mouseOver,", $mouseOver)
        let style = {}
        if($disabled==true) {
            style = {
                ...style,
                cursor: "context-menu",
            }
        } else {
            style= {
                ...style,
                cursor: "pointer",
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////console.log("THE STYLE", style)


        return style
    }}

`;


export const SRadioButtonDiv = styled.div`
    background: red;
   position: relative;
`;


export const SRadioButton = styled.input<{

    $checked?: boolean,
    $disabled?: boolean
    $mouseDown?: boolean,
    $labelHasFields: boolean
}>`
    appearance: none;
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 0;
    border-style: solid;
    border-width: 1px;
    border-color:  ${({theme})=> theme.neutral.lighter};
    

    border-radius: 50%;
    top: 4px;
    background-color: white;
    cursor: pointer;

   ${({$disabled, $checked, $labelHasFields, theme}) => {
        let style = {}

        if($disabled==true) {
            style = {
                ...style,
                cursor: "context-menu"
            }
            if($checked==true) {
                style = {
                    ...style,
                    borderColor: theme.primary.lighter,
                    borderWidth: "2px"


                }
            }
        } else {

            if($checked==true) {
                style = {
                    ...style,
                    borderColor: theme.primary.main,
                    borderWidth: "2px"

                }
            }
        }

        if($labelHasFields==true) {
            style = {
                ...style,
                top: "11px"
            }
        } else {
            style = {
                ...style,
                top: "0px"
            }
        }

        return style
   }}

   
&::after {
        content: '';
        transform: scale(0);
        height: 100%;
        width: 100%;

        background-color: ${({theme}) => theme.primary.main};
        position: absolute;
        top:0px;
        left: 0px;
        border-radius: 50px;
        transition: 0.1s;

        ${
            ({$checked}) => {
                let style = {}
                ////////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

                if($checked == true) {
                    style = {
                        ...style,
                        transform: "scale(0.6)"
                    }

                }
                return style
            }
        }
    }

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
                        transform: "scale(2)"
                    }

                }
                return style
            }
        }
    }
   

   
`;
export const SLabel = styled.div<{
    $disabled?: boolean
}>`
    padding-left: 30px;

   ${({$disabled,  theme}) => {
        let style = {}

        if($disabled) {
            style = {
                ...style,
                color: theme.neutral.lighter
            }
        }

        return style
   }}

   
`;


