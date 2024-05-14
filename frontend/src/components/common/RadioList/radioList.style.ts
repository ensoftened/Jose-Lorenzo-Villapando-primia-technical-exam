import styled from "styled-components";

export const SDiv = styled.div<{
    $customWidth?: string,
    $error?: string
}>`
  position: relative;
  ${({$customWidth}) => {return {width: $customWidth}}}
  
  ${({$error, theme}) => {
            let style={}

            if($error) {
                style = {
                    ...style,
                    borderRadius: "5px",
                    border: "2px solid " + theme.errorTheme.main,
                    padding: "2.5px",
                    marginBottom: "2.5px"
                }
            }
            return style
        }}

`;

export const SCheckListDiv = styled.div<{
    $customWidth?: string;
    $error?: string
}>`

        max-height: 300px;



`;


export const SLabel = styled.div<{
    $customWidth?: string,
    $error?: string
}>`
    
    color : ${({theme}) => theme.neutral.main};
    font-family: Helvetica;
    padding: 5px 0;
    cursor: context-menu;
    font-size : 12px;
    font-weight: bold;
    //position: absolute;
    //left : 0px;
    //top :-5px;
    z-index: 0;
    transition: 0.150s;

    ${({$error, theme}) => {
        let style={}
        if($error) {
            style = {
                ...style,
                color: theme.errorTheme.main,
                padding: "5px"
            }
        }

        return style

    }}



`;

