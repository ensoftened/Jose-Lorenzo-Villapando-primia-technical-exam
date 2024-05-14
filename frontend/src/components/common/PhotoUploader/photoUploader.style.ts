import styled from "styled-components";

export const SMainDiv = styled.div<{}>`
    //padding-top: 10px;
    //cursor: pointer
    user-select: none;
`;

export const SDiv = styled.div<{
    $error?: string
    $customStyle?: any
    $device?: string
    $mouseOver: boolean
}>`

    width: 100%;
    height: 200px;
    //border-radius: 100%;
    border-radius: 5px;
    border: 1px solid ${({theme}) => theme.neutral.light};
    background-color: "white";
    padding: 3px;
    cursor: pointer;
    margin: 0 auto;


    ${({$error, theme, $customStyle, $device, $mouseOver}) => {
        let style = {}

        if($mouseOver==true) {
            style = {
                ...style,
                borderWidth: "1px",
                borderColor: theme.neutral.darker
            }
        }
        if($error) {
            style = {
                ...style,
                border: "2px solid " + theme.errorTheme.main
            }
        }
        

        if($device == "B" && $customStyle) {
            style = {
                ...style,
                ...$customStyle
            }
        }

        ////////////////////////////////////////////////////console.log("THE STYLE", style)
        return style
    }}
`;

export const SSecondBoxDiv = styled.div<{}>`
    height: 100%;
    width: 100%;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

`;
export const SImageBoxDiv = styled.div<{}>`
    height: 100%;
    width: 100%;
    border-radius: inherit;
    display: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: relative

`;

export const SPlaceholderDiv = styled.div<{}>`
    width: 100%;
    text-align: center;

`;

export const SPlaceholderIcon = styled.span<{}>`
    font-size: 25px;
    color:${({theme})=> theme.neutral.main};
    width: 100%

`;
export const SPlaceholderText = styled.span<{}>`
display: block;
    font-size: 10px;
//font-weight: bold;
 color:${({theme})=> theme.neutral.main};
  width: 100%;

`;

export const SLabel = styled.div<{
    $customWidth?: string,
    $error?: string
}>`
    color : ${({theme}) => theme.neutral.main};
    font-family: Helvetica;
    padding: 5px 5px;
    cursor: context-menu;
    font-size : 10px;
    /* font-weight: bold; */
    position: absolute;
    left : 0px;
    top :-5px;
    z-index: 0;
    transition: 0.150s;
    width: 100%;
    text-align: left;


    ${({$error, theme}) => {
        let style={}
        if($error) {
            style = {
                ...style,
                color: theme.errorTheme.main,
            }
        }

        return style

    }}



`;