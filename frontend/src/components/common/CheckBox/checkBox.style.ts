import styled from "styled-components";

// export const SDiv = styled.div<{
//     $customWidth?: any
//     $disabled?: boolean;
//     $mouseOver?: boolean;
// }>`
//       ${({$customWidth}) => {return {width: $customWidth}}}
//         display: inline-block;
//         margin-right: 10px;
//         width: 100%;
//         padding: 5px;
//         margin: 2.5px 0;
//         background: white;
//         border-radius: 5px;

//         ${({$disabled, $mouseOver, theme}) => {

//             //////////////////////////////////////////////////////////////////////////////////////////console.log("$mouseOver,", $mouseOver)
//             let style = {}
//             if($disabled==true) {
//                 style = {
//                     ...style,
//                     cursor: "context-menu",
//                 }
//             } else {
//                 style= {
//                     ...style,
//                     cursor: "pointer",
//                 }

//                 if($mouseOver==true) {

//                     style = {
//                         ...style,
//                         background: theme.neutral.lightest
//                     }
//                 }
//             }

//             //////////////////////////////////////////////////////////////////////////////////////////console.log("THE STYLE", style)


//             return style
//         }}
// `;


// export const SCheckBoxItem = styled.label<{
//     $customStyle?: any,
//     $mouseOver?: boolean,
//     $disabled?: boolean
// }>`
//     font-size: 14px;
//    // line-height: 25px;
//     user-select: none;
//     background: pink;

//     ${({$customStyle}) => $customStyle};

//     ${({$disabled, $mouseOver, theme}) => {

//         //////////////////////////////////////////////////////////////////////////////////////////console.log("$mouseOver,", $mouseOver)
//         let style = {}
//         if($disabled==true) {
//             style = {
//                 ...style,
//                 cursor: "context-menu",
//             }
//         } else {
//             style= {
//                 ...style,
//                 cursor: "pointer",
//             }
//         }

//         //////////////////////////////////////////////////////////////////////////////////////////console.log("THE STYLE", style)


//         return style
//     }}

// `;


// export const SCheckBoxDiv = styled.div`
//     background: red;
//    position: relative;
// `;


// export const SCheckBox = styled.input<{

//     $checked?: boolean,
//     $disabled?: boolean
//     $mouseDown?: boolean,
//     $labelHasFields: boolean
// }>`
//     appearance: none;
//     width: 20px;
//     height: 20px;
//     position: absolute;
//     z-index: 0;
//     border-style: solid;
//     border-width: 1px;
//     border-color:  ${({theme})=> theme.neutral.lighter};
    

//     border-radius: 10%;
//     top: 4px;
//     background-color: white;
//     cursor: pointer;

//    ${({$disabled, $checked, $labelHasFields, theme}) => {
//         let style = {}

//         if($disabled==true) {
//             style = {
//                 ...style,
//                 cursor: "context-menu"
//             }
//             if($checked==true) {
//                 style = {
//                     ...style,
//                     borderColor: theme.primary.lighter,
//                     backgroundColor: theme.primary.lighter
//                 }
//             }
//         } else {

//             if($checked==true) {
//                 style = {
//                     ...style,
//                     borderColor: theme.primary.main,
//                     backgroundColor: theme.primary.main
//                 }
//             }
//         }

//         if($labelHasFields==true) {
//             style = {
//                 ...style,
//                 top: "11px"
//             }
//         } else {
//             style = {
//                 ...style,
//                 top: "0px"
//             }
//         }

//         return style
//    }}

// &::before {
//         content: '';
//         transform: scale(0);
//         height: 100%;
//         width: 100%;
//         opacity: 0.1;
//         background-color: ${({theme}) => theme.neutral.darkest};
//         position: absolute;
//         top:0px;
//         left: 0px;
//         border-radius: 50px;
//         transition: 0.2s;

//         ${
//             ({$mouseDown}) => {
//                 let style = {}
//                 //////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

//                 if($mouseDown == true) {
//                     style = {
//                         ...style,
//                         transform: "scale(2)"
//                     }

//                 }
//                 return style
//             }
//         }
//     }
   

   
// `;
// export const SLabel = styled.div<{
//     $disabled?: boolean
// }>`
//     padding-left: 30px;

//    ${({$disabled,  theme}) => {
//         let style = {}

//         if($disabled) {
//             style = {
//                 ...style,
//                 color: theme.neutral.lighter
//             }
//         }

//         return style
//    }}

   
// `;

// export const SCheckIcon = styled.div<{
//     $labelHasFields: boolean
// }>`
//     position: absolute;
//     //top: 1px;
//     left: 4px;
//     z-index: 0;
//     color: white;

//     ${({$labelHasFields, theme}) => {
//         let style = {}

        
//         if($labelHasFields==true) {
//             style = {
//                 ...style,
//                 top: "12px"
//             }
//         } else {
//             style = {
//                 ...style,
//                 top: "0px"
//             }
//         }


//         return style
//    }}


   
// `;



export const SDiv = styled.div<{
    $customWidth?: any
    $disabled?: boolean;
    $mouseOver?: boolean;
    $size?: string;
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

            //////////////////////////////////////////////////////////////////////////////////////////console.log("$mouseOver,", $mouseOver)
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

            //////////////////////////////////////////////////////////////////////////////////////////console.log("THE STYLE", style)


            return style
        }}
`;


export const SCheckBoxItem = styled.label<{
    $customStyle?: any,
    $mouseOver?: boolean,
    $disabled?: boolean,
    $size?: string;

}>`
    font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "14px" : "")};
   // line-height: 25px;
    user-select: none;
    background: pink;

    ${({$customStyle}) => $customStyle};

    ${({$disabled, $mouseOver, theme}) => {

        //////////////////////////////////////////////////////////////////////////////////////////console.log("$mouseOver,", $mouseOver)
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

        //////////////////////////////////////////////////////////////////////////////////////////console.log("THE STYLE", style)


        return style
    }}

`;


export const SCheckBoxDiv = styled.div<{
    $size?: string;
}>`
    background: red;
   position: relative;
   
`;


export const SCheckBox = styled.input<{

    $checked?: boolean,
    $disabled?: boolean
    $mouseDown?: boolean,
    $labelHasFields: boolean,
    $size?: string;
}>`
    appearance: none;
    width: ${({$size}) => ($size == "small") ? "15px" : (($size == "medium") ? "20px" : "")};
    height: ${({$size}) => ($size == "small") ? "15px" : (($size == "medium") ? "20px" : "")};
    position: absolute;
    z-index: 0;
    border-style: solid;
    border-width: 1px;
    border-color:  ${({theme})=> theme.neutral.lighter};
    

    border-radius: 10%;
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
                    backgroundColor: theme.primary.lighter
                }
            }
        } else {

            if($checked==true) {
                style = {
                    ...style,
                    borderColor: theme.primary.main,
                    backgroundColor: theme.primary.main
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
                //////////////////////////////////////////////////////////////////////////////////////////console.log("TRUE BA", $mouseDown)

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
    $disabled?: boolean;
    $size?: string;

}>`
    padding-left: ${({$size}) => ($size == "small") ? "25px" : (($size == "medium") ? "30px" : "")};

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

export const SCheckIcon = styled.div<{
    $labelHasFields: boolean;
    $size?: string;
}>`
    position: absolute;
    //top: 1px;
    left: ${({$size}) => ($size == "small") ? "3px" : (($size == "medium") ? "4px" : "")};
    z-index: 0;
    color: white;
    font-size: ${({$size}) => ($size == "small") ? "10px" : (($size == "medium") ? "14px" : "")};


    ${({$labelHasFields, theme}) => {
        let style = {}

        
        if($labelHasFields==true) {
            style = {
                ...style,
                top: "12px"
            }
        } else {
            style = {
                ...style,
                top: "0px"
            }
        }


        return style
   }}


   
`;
