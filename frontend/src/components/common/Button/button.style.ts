import styled from "styled-components";

export const SButton = styled.button<{
  $variant?: string;
  $primary?: boolean;
  $disabled?: boolean;
  $bg?: string;
  $customStyle: any;
  $isMouseOver: boolean;
  $isMouseDown: boolean;
  $size?: string;
  $loading?: boolean;
}>`
  background-color: ${({ $variant, $disabled, theme }) =>
    $variant == "outlined"
      ? "white"
      : $disabled
      ? theme.primary.lighter
      : theme.primary.main};
  outline: 0;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  color: ${(props) =>
    props.$variant == "outlined"
      ? props.$disabled
        ? props.theme.neutral.lighter
        : props.theme.primary.main
      : "white"};
  cursor: ${({ $disabled }) =>
    $disabled == true ? "context-menu" : "pointer"};
  font-family: Roboto Regular;
  //font-size: 12px;
  //padding: 7.5px 10px;
  position: relative;
  transition: 0.1s ease;
  overflow: hidden;
  transform: scale(1);

  ${({ $customStyle }) => $customStyle}

  ${({ $size }) => {
    let style = {};
    if ($size == "xs") {
      style = {
        ...style,
        padding: "5px 7.5px",
        fontSize: "10px",
      };
    } else if ($size == "small") {
      style = {
        ...style,
        padding: "7.5px 10px",
        fontSize: "12px",
      };
    } else if ($size == "medium") {
      style = {
        ...style,
        padding: "10px 20px",
        fontSize: "14px",
      };
    } else if ($size == "large") {
      style = {
        ...style,
        padding: "10px 24px",
        fontSize: "20px",
      };
    }
    return style;
  }}


    ${({ $variant, $disabled, $loading, $bg, theme }) => {
    let style = {};

    let selectedTheme = $bg ? $bg : "primary";

    if ($disabled || $loading) {
      style = {
        ...style,
        cursor: "context-menu",
      };
      if ($variant == "outlined") {
        style = {
          ...style,
          //backgroundColor: "white",
          color: theme.neutral.main,
          borderColor: theme.neutral.lighter,
        };
      } else if ($variant == "text") {
        style = {
          ...style,
          color: theme.neutral.main,
          border: "none",
        };
      } else {
        style = {
          ...style,
          color: theme.neutral.main,
          backgroundColor: theme.neutral.lightest,
          borderColor: theme.neutral.lightest,
        };
      }
    } else {
      style = {
        ...style,
        cursor: "pointer",
      };

      if ($variant == "outlined") {
        style = {
          ...style,
          backgroundColor: "rgba(0,0,0,0)",
          color: theme[selectedTheme].main,
          borderColor: theme[selectedTheme].main,
        };
      } else if ($variant == "text") {
        style = {
          ...style,
          backgroundColor: "rgba(0,0,0,0)",
          color: theme[selectedTheme].main,
          border: "none",
        };
      } else {
        style = {
          ...style,
          color: "white",
          backgroundColor: theme[selectedTheme].main,
          borderColor: theme[selectedTheme].main,
        };
      }
    }
    return style;
  }}

    &:hover {
    border-style: solid;
    border-width: 1px;
    //border-color: ${({ theme }) => theme.primary.darker};

    transition: 0.1s ease;

    ${({ $variant, $disabled, $loading, $bg, theme }) => {
      let style = {};

      let selectedTheme = $bg ? $bg : "primary";
      if (!$disabled && !$loading) {
        style = {
          ...style,
          transform: "scale(1.01)",
        };
        if ($variant == "outlined") {
          style = {
            ...style,
            //borderWidth: "2px"
          };
        } else if ($variant == "text") {
          style = {
            ...style,
            border: "none",
            color: theme[selectedTheme].lightest,
            textDecoration: "underline",
          };
        } else {
          style = {
            ...style,
            backgroundColor: theme[selectedTheme].dark,
            borderColor: theme[selectedTheme].dark,
          };
        }
      } else {
        if ($variant == "text") {
          style = {
            ...style,
            border: "none",
          };
        }
      }
      return style;
    }}
  }

  &:active {
    border-style: solid;
    border-width: 1px;

    //border-color: ${({ theme }) => theme.primary.darkest};
    transition: 0s;

    ${({ $variant, $disabled, $loading, $bg, theme }) => {
      let style = {};
      let selectedTheme = $bg ? $bg : "primary";

      if (!$disabled && !$loading) {
        style = {
          ...style,
          transform: "scale(0.99)",
        };

        if ($variant == "outlined") {
          style = {
            ...style,
          };
        } else if ($variant == "text") {
          style = {
            ...style,
            border: "none",
          };
        } else {
          style = {
            ...style,
            backgroundColor: theme[selectedTheme].darker,
            borderColor: theme[selectedTheme].darker,
          };
        }
      } else {
        if ($variant == "text") {
          style = {
            ...style,
            border: "none",
          };
        }
      }
      return style;
    }}
  }
`;

export const SStartAdornment = styled.span<{
  $size?: string;
}>`
  display: inline-block;

  ${({ $size }) => {
    let style = {};

    if ($size == "xs") {
      style = {
        ...style,
        paddingRight: "5px",
        fontSize: "10px",
      };
    } else if ($size == "small") {
      style = {
        ...style,
        paddingRight: "7.5px",
        fontSize: "12px",
      };
    } else if ($size == "medium") {
      style = {
        ...style,
        paddingRight: "10px",
        fontSize: "16px",
      };
    } else if ($size == "large") {
      style = {
        ...style,
        paddingRight: "15px",
        fontSize: "20px",
      };
    }

    return style;
  }}
`;

export const SEndAdornment = styled.span<{
  $size?: string;
}>`
  display: inline-block;

  ${({ $size }) => {
    let style = {};

    if ($size == "xs") {
      style = {
        ...style,
        paddingLeft: "5px",
        fontSize: "10px",
      };
    }
    if ($size == "small") {
      style = {
        ...style,
        paddingLeft: "7.5px",
        fontSize: "12px",
      };
    } else if ($size == "medium") {
      style = {
        ...style,
        paddingLeft: "10px",
        fontSize: "14px",
      };
    } else if ($size == "large") {
      style = {
        ...style,
        paddingLeft: "15px",
        fontSize: "20px",
      };
    }

    return style;
  }}
`;

export const SSpinner = styled.span<{
  $size?: string;
}>`
  display: inline-block;

  ${({ $size }) => {
    let style = {};

    if ($size == "xs") {
      style = {
        ...style,
        paddingRight: "5px",
        fontSize: "10px",
      };
    } else if ($size == "small") {
      style = {
        ...style,
        paddingRight: "7.5px",
        fontSize: "12px",
      };
    } else if ($size == "medium") {
      style = {
        ...style,
        paddingRight: "10px",
        fontSize: "16px",
      };
    } else if ($size == "large") {
      style = {
        ...style,
        paddingRight: "15px",
        fontSize: "20px",
      };
    }

    return style;
  }}
`;
