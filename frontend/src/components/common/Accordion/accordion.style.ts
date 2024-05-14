import styled from "styled-components";

export const SHeadDiv = styled.div<{
    $checked: boolean;
}>`
  padding: 0px;
  cursor: pointer;
  position: relative;

  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.neutral.lighter};

  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.neutral.lighter};


`;

export const SHeadButton = styled.button`
    background-color: white;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
    text-align: left;
    cursor: pointer;
    font-size: 16px;
    
`;

export const SArrowSpan = styled.span<{
    $checked: boolean;
}>`
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    transform: rotate(0deg);
    transition: 0.15s;
    color: ${({theme}) => theme.neutral.main};
    font-size: 14px;

    ${({$checked}) => {
        let style = {}

        if($checked==true) {
            style = {
                ...style,
                display: "block",
                padding: "10px",
                height: "auto",
                transform: "rotate(180deg)",
                transition: "0.15s"
            }
        }

        return style
    }}
`;

export const SBodyDiv = styled.div<{$checked: boolean}>`

  transform: scaleY(0);
  height: 0;
  cursor: auto;
  //opacity: 0;
  transition: all 0.2s ease-in-out;
  transform-origin: top;
  overflow: hidden;;
  ${({$checked}) => {
        let style = {}

        if($checked==true) {
            style = {
                ...style,
                padding: "10px 0",
                height: "auto",
                transform: "scaleY(1)",
                transition: "all 0.2s ease-in-out"
                //opacity: "1"
            }
        }

        return style
    }}


`;