import styled from "styled-components";

export const SDiv = styled.div<{ $customStyle?: any }>`
  position: relative;
  ${({ $customStyle }) => $customStyle}
`;

export const SMenuHeadWrapper = styled.div<{ $customStyle?: any }>`
  cursor: pointer;
`;

export const SMenuHead = styled.div<{ $customStyle?: any }>`
  ${({ $customStyle }) => $customStyle}
`;

export const SMenuItemListWrapper = styled.div<{
  $customStyle?: any;
  $itemsShown: boolean;
}>`
  position: absolute;
  right: 0;
  min-width: 300px;
  background-color: white;
  border-style: solid;
  border-radius: 5px;
  box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.1s ease-in-out;

  z-index: 1;

  ${({ $itemsShown }) => {
    ////////////////console.log("WIL: SHOW", $itemsShown);
    let style = {};

    if ($itemsShown == true) {
      style = {
        ...style,
        padding: "0x 0",

        transform: "scaleY(1)",
        //opacity: "1"
      };
    }

    return style;
  }}

  ${({ $customStyle }) => $customStyle}
`;
export const SMenuItemList = styled.ul<{
  $customStyle?: any;
}>`
  list-style-type: none;
  ${({ $customStyle }) => $customStyle}
`;

export const SInvisibleInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 1px;
`;
export const SMenuItem = styled.li<{ $customStyle?: any; $mouseOver: boolean }>`
  padding: 10px;
  user-select: none;
  cursor: pointer;
  color: ${({theme}) => theme.neutral.darker };

  ${({ $mouseOver, theme }) => {
    let style = {};

    if ($mouseOver == true) {
      style = {
        ...style,
        backgroundColor: theme.neutral.lightest,
      };
    }
    return style;
  }}

  ${({ $customStyle }) => $customStyle}
`;
