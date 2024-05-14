import styled from "styled-components";

export const SRow = styled.div`
    display: flex;
    
`;
export const SFormControlsColumn = styled.div`
    flex: 1;
`;
export const SRelativeDiv = styled.div<{
    $size?: string;
}>`
    position: relative;
    width:  ${({$size}) => ($size == "small") ? "33px" : (($size == "medium") ? "40px" : "")};
`;

export const SAbsoluteDiv = styled.div<{
    $device: string
}>`
    position: absolute;

    width: 33px;


    ${({$device}) => {
        let style = {}
        
        if($device=="M") {
            style = {
                ...style,
                bottom: "12px"
            }
        } else {
            style = {
                ...style,
                top: "20px"
            }
        }

        return style
    }}
`;

export const SLabel = styled.div<{
    $customWidth?: string,
    $error?: string
}>`
    
    color : ${({theme}) => theme.neutral.dark};
    font-family: Helvetica;

    cursor: context-menu;
    font-size : 18px;
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
                //padding: "5px"
            }
        }

        return style

    }}



`;