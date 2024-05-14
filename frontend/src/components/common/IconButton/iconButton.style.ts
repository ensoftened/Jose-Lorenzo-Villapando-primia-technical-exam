import styled from "styled-components";

export const SIconButton = styled.button<{
    $variant?: string;
    $primary?: boolean; 
    $disabled?: boolean;
    $bg?: string;
    $customStyle?: any;

    $isMouseOver: boolean;
    $isMouseDown: boolean;
    $size?: string;
    $loading?: boolean;
}>`
    //background-color: ${({$variant, $disabled, theme}) => ($variant=="outlined") ? "white" : (($disabled) ? theme.primary.lighter : theme.primary.main)};
    outline: 0;
    border-style: solid;
    border-width: 1px;
    border-radius: 100%;
    font-family: Helvetica;
    position: relative;
    transition: 0.1s ease;
    overflow: hidden;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(1);

    ${({$customStyle}) => $customStyle };

    ${({$size}) => {
        let style={}
        
        if($size=="xs") {
            style = {
                ...style,
                width: "21px",
                height: "21px",
            }
        }
        else if($size=="small") {
            style = {
                ...style,
                width: "32px",
                height: "32px",
            }
        }

        else if($size=="medium") {
            style = {
                ...style,
                width: "37px",
                height: "37px",
            }
        }

        else if($size=="large") {
            style = {
                ...style,
                width: "50px",
                height: "50px",
            }
        }
        return style
    }}


    ${({$variant, $disabled, $loading, $bg, theme}) => {
        let style={}

        let selectedTheme = ($bg) ? $bg : "primary"

        if($disabled || $loading) {
            style = {
                ...style,
                cursor: "context-menu"
            }
            if($variant=="outlined") {
                style = {
                    ...style,
                    color: theme.neutral.main,
                    borderColor: theme.neutral.lighter
                }
            } else if($variant=="text") {
                style = {
                    ...style,
                    color: theme.neutral.main,
                    border: "none"
                }
            } else {
                style = {
                    ...style,
                    color: theme.neutral.main,
                    backgroundColor: theme.neutral.lightest,
                    borderColor: theme.neutral.lightest
                }
            }
        } else {
            style = {
                ...style,
                cursor: "pointer"
            }

            if($variant=="outlined") {
                style = {
                    ...style,
                    backgroundColor: "rgba(0,0,0,0)",
                    color: theme[selectedTheme].main,
                    borderColor: theme[selectedTheme].main
                }
            } else if($variant=="text") {
                style = {
                    ...style,
                    backgroundColor: "rgba(0,0,0,0)",
                    color: theme[selectedTheme].main,
                    border: "none"
                }
            }
            
            else {
                style = {
                    ...style,
                    color: "white",
                    backgroundColor: theme[selectedTheme].main,
                    borderColor: theme[selectedTheme].main
                }
            }

        }
        return style
    }}

    &:hover {

        border-style: solid;
        border-width: 1px;
        //border-color: ${({theme}) => theme.primary.darker};

        transition: 0.1s ease;



        ${({$variant, $disabled, $loading, $bg, theme}) => {
            let style={}

            let selectedTheme = ($bg) ? $bg : "primary"
            if(!$disabled && !$loading) {
                style = {
                    ...style,
                    //transform: "scale(1.01)"
                }
                if($variant=="outlined") {
                    style = {
                        ...style,
                        //borderWidth: "2px"
                    }
                } else if($variant=="text") {
                    style = {
                        ...style,
                        border: "none"
                    }
                } else {
                    style = {
                        ...style,
                        backgroundColor: theme[selectedTheme].dark,
                        borderColor: theme[selectedTheme].dark,
                    }
                }

            }
            else {
                if($variant=="text") {
                    style = {
                        ...style,
                        border: "none"
                    }
                }
            }
            return style    
        }}

        
    }

    &:active {

        border-style: solid;
        border-width: 1px;
 

        //border-color: ${({theme}) => theme.primary.darkest};
        transition: 0s;

        
        ${({$variant, $disabled, $loading,  $bg, theme}) => {
            let style={}
            let selectedTheme = ($bg) ? $bg : "primary"

            if(!$disabled && !$loading) {
                style = {
                    ...style,
                    transform: "scale(0.95)"
                }

                if($variant=="outlined") {
                    style = {
                        ...style,
                    }
                } else if($variant=="text") {
                    style = {
                        ...style,
                        border: "none"
                    }
                } else {
                    style = {
                        ...style,
                        backgroundColor:  theme[selectedTheme].darker,
                        borderColor:  theme[selectedTheme].darker,

                    }
                }

            } else {
                if($variant=="text") {
                    style = {
                        ...style,
                        border: "none"
                    }
                }
            }
            return style    
        }}

        
    }
  
`;


export const SIcon = styled.span<{
    $size?: string
}>`
    width: auto;
   // background-color: green;


     ${({$size}) => {
        let style = {}

        if($size == "small") {
            style = {
                ...style,
                fontSize: "12px",
            }
        } else if($size == "medium") {
            style = {
                ...style,
                fontSize: "16px",
            }

        } else if($size == "large") {
            style = {
                ...style,
                fontSize: "24px",
            }

        } 

        return style
    }}
`;






