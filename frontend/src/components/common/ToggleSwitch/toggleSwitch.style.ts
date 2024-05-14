import styled from "styled-components";


export const SLabel = styled.label<{
    $customStyle?: any,
    $mouseOver?: boolean,
    $disabled?: boolean,
    $size?: string,
}>`
    font-family: Helvetica;
    font-size:     ${({$size}) => ($size == "small") ? "10px" : (($size == "medium") ? "14px" : "")};;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: ${({theme}) => theme.neutral.main };
    font-weight: bold;

    ${({$disabled}) => {
      let style = {}

      if($disabled) {
        style = {
          ...style,
          cursor: "context-menu"
        }
      }
      return style
    }}
`;



export const Switch = styled.div<{
  $disabled: boolean;
  $size?: string,
}>`
  position: relative;
  width: ${({$size}) => ($size == "small") ? "28px" : (($size == "medium") ? "45px" : "")};

  height: ${({$size}) => ($size == "small") ? "16px" : (($size == "medium") ? "26px" : "")};

  background:  ${({theme}) => theme.errorTheme.main};
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  ${({$disabled, theme}) => {
    let style = {}

    if($disabled==true) {
      style = {
        ...style,
        backgroundColor: theme.neutral.dark
      } 
    } else {
      style = {
        ...style,
        backgroundColor: theme.errorTheme.main
      }
    }
    return style
  }}


  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: ${({$size}) => (($size=="small") ? "12px" : (($size=="medium") ? "20px" : "") )};
    height: ${({$size}) => (($size=="small") ? "12px" : (($size=="medium") ? "20px" : "") )};
    border-radius: 35px;
    top: 50%;
    left: 2px;
    background: white;
    transform:  translate3d(0, -50%, 0);
    -ms-transform: translate3d(0, -50%, 0);
    -webkit-transform: translate3d(0, -50%, 0);


    box-shadow: 0px -1px 4px 0px rgba(0,0,0,0.56);
    -webkit-box-shadow: 0px -1px 4px 0px rgba(0,0,0,0.56);
    -moz-box-shadow: 0px -1px 4px 0px rgba(0,0,0,0.56);
  }
`;

export const SInput = styled.input<{

    $checked?: boolean,
    $disabled?: boolean
    $mouseDown?: boolean,
    $labelHasFields: boolean
    $size?: string,
}>`

    display: none;
    
    &:checked + ${Switch} {

      ${({$disabled, theme}) => {
        let style = {}

        if($disabled==true) {
          style = {
            ...style,
            backgroundColor: theme.neutral.dark
          } 
        } else {
            style = {
              ...style,
              backgroundColor: theme.okTheme.main
            }
          }
          return style
      }}

      &:before {
      
        transform: ${({$size}) => (($size=="small") ? "translate3d(12px, -50%, 0)" : (($size=="medium") ? "translate3d(20px, -50%, 0)" : "") )};
        -ms-transform:  ${({$size}) => (($size=="small") ? "translate3d(12px, -50%, 0)" : (($size=="medium") ? "translate3d(20px, -50%, 0)" : "") )};
        -webkit-transform:  ${({$size}) => (($size=="small") ? "translate3d(12px, -50%, 0)" : (($size=="medium") ? "translate3d(20px, -50%, 0)" : "") )};
        
      }
  }

   
`;

