import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SNavLink = styled(NavLink)<{
    $navItemOnMouseOver?: boolean;
    $active?: any;
}>`
  text-decoration: none;
  display: block;
  position: relative;
  padding: 0 20px;
  margin: 5px 10px;
    border-radius: 5px;
  ${({$navItemOnMouseOver, $active, theme}) => {
    let style = {}

    if($navItemOnMouseOver==true) {
        style = {
            ...style,
            backgroundColor: theme.primary.main
        }
    }

    
    if($active) {
      style = {
          ...style,
          backgroundColor: theme.primary.main
      }
    }

    return style
  }}
`;

export const SParent = styled.div<{
    $navItemOnMouseOver?: boolean;
}>`
  text-decoration: none;
  display: block;
  cursor: pointer;
  position: relative;
  padding: 0 20px;
  margin: 5px 10px;
  border-radius: 5px;
  


  ${({$navItemOnMouseOver, theme}) => {
    let style = {}

    if($navItemOnMouseOver==true) {
        style = {
            ...style,
            backgroundColor: theme.primary.main
        }
    }

    return style
  }}
`;



export const SIcon = styled.div<{

}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
`;

export const SArrowIcon = styled.div<{
  $checked: boolean;
}>`
  position: absolute;

    right: 0;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;

    font-size: 14px;
    font-family: Helvetica Neue;
    transform: rotate(0deg);
    
    color: "white";

        ${({$checked}) => {
        let style = {}

        if($checked==true) {
            style = {
                ...style,

                transform: "rotate(90deg)",
                transition: "0.15s"
            }
        }

        return style
    }}

`;

export const SSubMenu = styled.div<{
  $checked: boolean
}>`
    padding: 0px 0px;
    top: 0px;
    right: -230px;

    background-color: ${({theme}) => theme.primary.darkest};

    transform: scaleY(0);
    height: 0;
    cursor: auto;
    //opacity: 0;
    transition: all 0.2s ease-in-out;
    transform-origin: top;
    overflow: hidden;;
box-shadow: -2px 10px 5px -11px rgba(0,0,0,0.64) inset;
-webkit-box-shadow: -2px 10px 5px -11px rgba(0,0,0,0.64) inset;
-moz-box-shadow: -2px 10px 5px -11px rgba(0,0,0,0.64) inset;

     ${({$checked}) => {
        let style = {}

        if($checked==true) {
            style = {
                ...style,
                padding: "10px 0",
                height: "auto",
                transform: "scaleY(1)",
                //opacity: "1"
            }
        }

        return style
    }}

`;



export const SDiv = styled.div<{
  $active?: any
}>`
  padding: 10px 15px;
  color: white;


  text-decoration: none;
  ${({$active, theme}) => {
    let style = {}

    if($active) {
        style = {
            ...style,
            //backgroundColor: theme.primary.lighter
            color: "white"
        }
    }

    return style
  }}
`;