import styled, { css } from "styled-components";

export const SFormControl = styled.div<{
  $customStyle?: any;
  $device?: string;
}>`
  display: inline-block;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
  position: relative;

  ${({ $customStyle }) => {
    if ($customStyle) {
      //////console.log("CUSTOM", $customStyle);
      return $customStyle;
    }
    return;
  }};

  ${(props) =>
    css`
      @media (min-width: 767px) {
        display: flex;
        flex-direction: column;
      }
    `}; //background: red;

  ${(props) =>
    css`
      @media (max-width: 766px) {
        display: inline-block;
        width: 100%;
      }
    `}; //background: red;
`;

export const SError = styled.div<{
  $device?: string;
  $size?: string;
  $customStyle?: any;
}>`
  font-size: 10px;
  font-weight: bold;
  color: ${({theme}) => theme.errorTheme.main}
  /* 
    ${({ $device, $size }) => {
    let style = {};

    if ($device == "B") {
      style = {
        ...style,
        position: "absolute",
        padding: "0 5px",
        left: 0,
        right: 0,
        whiteSpace: "noWrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      };
    }
    return style;
  }} */

  ${({ $customStyle }) => $customStyle}
`;
