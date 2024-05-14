import appendNewStyle from "@utils/appendNewStyle";
import styled, { css, CSSObject } from "styled-components";

export const SDiv2 = styled.div<{
  $focused?: boolean;
  $error?: string;
  $size?: string;
  theme?: any;
}>`
  position: relative;
  display: inline-block;
  width: 100%;

  //padding-top: 16px; //;
`;

export const SSearchBar = styled.input<{
  $loading?: boolean;
  $disabled?: boolean;
  $type?: string;
  $startAdornment?: any;
  $error?: string;
  $mouseOver?: boolean;
  $focused?: boolean;
  $value?: string;
  $size?: string;
  $clearable?: boolean;
  $scrolledBeyondInnerHeight?: boolean;
}>`
  font-family: Roboto Regular;
  outline: 0;
  padding: 8px; //;
  width: 100%;
  font-size: ${({ $size }) =>
    $size == "small" ? "12px" : $size == "medium" ? "16px" : ""};
  border-radius: 20px; //;
  border-width: 1px;
  background-color: rgba(0, 0, 0, 0);

  color: ${({ $scrolledBeyondInnerHeight, theme }) =>
    $scrolledBeyondInnerHeight ? "black" : theme.neutral.lightest};
  //transition: 0.150s;

  ${({
    $loading,
    $disabled,
    $type,
    $startAdornment,
    $error,
    $mouseOver,
    $focused,
    $size,
    $clearable,
    $scrolledBeyondInnerHeight,
    theme,
  }) => {
    let style = {};

    // border-bottom-color, border-style, color, cursor
    //If TEXTFIELD is LOADING OR DISABLED
    if ($loading || $disabled) {
      ////////////////////////////////////////////////////////////////////////////////////////console.logDITEYYYY")
      style = {
        ...style,

        borderColor: theme.neutral.lightest,
        color: theme.neutral.main,
        borderStyle: "dashed",
        cursor: "context-menu",
      };
    } else {
      ////////////////////////////co////////////////////////////////////////////////////////////console.logSA")
      style = {
        ...style,

        borderStyle: "solid",
        borderColor: theme.neutral.lighter,
        color: "solid",
        cursor: "text",
      };

      //Focus state
      if ($focused) {
        if ($scrolledBeyondInnerHeight == true) {
          style = {
            ...style,
            borderColor: "#0091ff",
          };
        }
      }
    }

    if ($clearable == true) {
      style = {
        ...style,
        paddingRight: "25px",
      };
    }

    if ($loading) {
      if ($size == "small") {
        style = {
          ...style,
          paddingRight: "25px",
        };
      } else if ($size == "medium") {
        style = {
          ...style,
          paddingRight: "32px",
        };
      } else {
      }
    }

    //padding-left
    //If there is a START ADORNMENT
    if ($startAdornment) {
      if ($size == "small") {
        style = {
          ...style,
          paddingLeft: "26px", //;
        };
      } else if ($size == "medium") {
        style = {
          ...style,
          paddingLeft: "34px", //;
        };
      } else {
      }
    }

    //padding-right
    //If the type of text is PASSWORD
    if ($type == "password" && !$loading) {
      ////////////////////////////cons////////////////////////////////////////////////////////////console.logassword")
      style = {
        ...style,
        paddingRight: "35px", //;
      };

      if ($clearable == true) {
        style = {
          ...style,
          paddingRight: "45px",
        };
      }
    }

    return style;
  }};
`;

export const SLabel2 = styled.label<{
  $customStyle?: string;
  $loading?: boolean;
  $disabled?: boolean;
  $type?: string;
  $startAdornment?: any;
  $error?: string;
  $focused?: boolean;
  $value?: string;
  $size?: string;
}>`
  font-family: Helvetica;
  position: absolute;
  user-select: none;
  white-space: nowrap;
  left: 0px;
  top: -16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.1s;

  font-size: ${({ $size }) =>
    $size == "small" ? "10px" : $size == "medium" ? "12px" : ""};

  ${({
    $loading,
    $disabled,
    $focused,
    $value,
    $type,
    $startAdornment,
    $error,
    $size,
    theme,
  }) => {
    let style = {};

    //color, cursor
    //If COMPONENT is LOADING or DISABLED
    if ($loading || $disabled) {
      ////////////////////////////consol////////////////////////////////////////////////////////////console.logHE")
      style = {
        ...style,
        color: theme.neutral.lighter,
        cursor: "context-menu",
      };
    } else {
      style = {
        ...style,
        cursor: "text",
      };
      if ($focused) {
        style = {
          ...style,
          color: theme.primary.main,
        };
      } else {
        style = {
          ...style,
          color: theme.neutral.main,
        };
      }
    }

    //top, font size
    //If TEXTFIELD has a VALUE

    if ($error) {
      style = {
        ...style,
        color: theme.errorTheme.main,
      };
    }

    //right
    //If TEXTFIELD TYPE is PASSWORD
    if ($type == "password") {
      style = {
        ...style,
        right: "22px",
      };
    }

    return style;
  }};
`;

export const SClearButton2 = styled.button<{
  $loading?: boolean;
  $disabled?: boolean;
  $type?: string;
  $startAdornment?: any;
  $error?: string;
  $focused?: boolean;
  $mouseOver?: boolean;
  $mouseDown?: boolean;
  $value?: string;
  $size?: string;
}>`
  outline: 0;
  cursor: pointer;
  border: 0;
  position: absolute;
  right: 12px;
  width: 10px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 50px;
  overflow: hidden;
  transition: 0.2s;
  background: transparent;
  transform: rotate(0deg);
  color: ${({ theme }) => theme.neutral.main};
  top: ${({ $size }) =>
    $size == "small" ? "4px" : $size == "medium" ? "7px" : ""};
  //  overflow: hidden;

  //Conditional Style
  ${({ $mouseOver, $type }) => {
    let style = {};

    if ($mouseOver == true) {
      style = {
        ...style,
        color: "black",
      };
    }

    if ($type == "password") {
      style = {
        ...style,
        paddingRight: "30px",
      };
    }

    return style;
  }}
`;

export const SClearIcon2 = styled.span`
  width: auto;
  font-size: 9px;
`;

export const SStartAdornment2 = styled.div<{
  $loading?: boolean;
  $disabled?: boolean;
  $size?: string;
  $scrolledBeyondInnerHeight?: boolean;
}>`
  position: absolute;
  top: 0;
  padding: 7px 7px 7px 12px; //;
  font-size: ${({ $size }) =>
    $size == "small" ? "12px" : $size == "medium" ? "16px" : ""};

  ${({ $loading, $disabled, $size, $scrolledBeyondInnerHeight, theme }) => {
    let style = {};

    if (!$disabled && !$loading) {
      if ($scrolledBeyondInnerHeight == true) {
        style = {
          ...style,
          color: theme.neutral.main,
        };
      } else {
        style = {
          ...style,
          color: theme.neutral.lightest,
        };
      }
    } else {
      if ($scrolledBeyondInnerHeight == true) {
        style = {
          ...style,
          color: theme.neutral.lighter,
        };
      } else {
        style = {
          ...style,
          color: "theme.neutral.lightest",
        };
      }
    }

    return style;
  }};
`;

export const SEyeButton2 = styled.button<{
  $loading?: boolean;
  $disabled?: boolean;
  $mouseOver: boolean;
  $mouseDown: boolean;

  $size?: string;
}>`
  outline: 0;
  cursor: pointer;
  border: 0;
  position: absolute;
  right: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
  transition: 0.2s;
  background: transparent;

  top: ${({ $size }) =>
    $size == "small" ? "5px" : $size == "medium" ? "7px" : ""};

  ${({ $loading, $disabled, $mouseOver, $size, theme }) => {
    let style = {};

    if ($disabled == true || $loading == true) {
      style = {
        ...style,
        color: theme.neutral.lighter,
        cursor: "context-menu",
      };
    } else {
      if ($mouseOver == true) {
        style = {
          ...style,
          backgroundColor: theme.neutral.lightest,
        };
      }

      style = {
        ...style,
        color: theme.neutral.main,
      };
    }

    return style;
  }};

  &::before {
    content: "";
    transform: scale(0);
    height: 100%;
    width: 100%;
    opacity: 0.1;
    background-color: ${({ theme }) => theme.neutral.darkest};
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 50px;
    transition: 0.2s;
    overflow: hidden;

    ${({ $mouseDown }) => {
      let style = {};
      ////////////////////////////console.lo////////////////////////////////////////////////////////////console.log$mouseDown)

      if ($mouseDown == true) {
        style = {
          ...style,
          transform: "scale(1)",
        };
      }
      return style;
    }}
  }
`;

export const SEyeIcon2 = styled.span`
  width: auto;

  font-size: 12px;
`;

export const SSpinner2 = styled.div<{
  $size?: string;
}>`
  position: absolute;
  top: ${({ $size }) =>
    $size == "small" ? "9px" : $size == "medium" ? "11px" : ""};
  font-size: ${({ $size }) =>
    $size == "small" ? "12px" : $size == "medium" ? "14px" : ""};
  right: ${({ $size }) =>
    $size == "small" ? "8px" : $size == "medium" ? "12px" : ""};
  color: ${({ theme }) => theme.neutral.lighter};
`;
