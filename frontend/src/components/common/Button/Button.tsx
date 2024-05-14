import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
  memo,
  useRef,
  ComponentType,
} from "react";
import { useButtonX } from "./useButtonX";
import {
  GAINSBORO,
  GRAY,
  LIGHT_GRAY,
  MAGENTA,
  ORANGE,
  WHITE,
} from "../../../constants/palette";
import {
  SButton,
  SEndAdornment,
  SSpinner,
  SStartAdornment,
} from "./button.style";
import { primary } from "../../../style-helpers/theme";
import setTheme from "../../../utils/setTheme";
import PropTypes from "prop-types";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import applyStyle from "../../../utils/applyStyle";
import styled from "styled-components";
import Ripple from "../Ripple/Ripple";
import { Tooltip } from "react-tooltip";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import generateRandomString from "../../../utils/generateRandomString";

type ButtonXProps = {
  children?: any;
  theme?: string;
  color?: string;
  endAdornment?: any;
  size?: string;
  startAdornment?: any;
  style?: any;
  variant?: string;
  disabled?: boolean;
  onClick?: any;
  type: any;
  tooltip?: any;
  loading?: boolean;
};

const Button = (props: ButtonXProps) => {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log('ButtonX Component Rendered')

  const {
    children,
    color,
    disabled,
    endAdornment,
    size,
    startAdornment,
    style,
    variant,
    onClick,
    theme,
    tooltip,
    loading,
    type,
  } = props;

  const {} = useButtonX(props);

  /* -- EVENT STATES -- */
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [tooltipId, setTooltipId] = useState("");

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("THE THEME", theme)

  const handleClick = () => {
    //////////////////////////////console.log("HANDLE CLICK")
    if (onClick) onClick();
  };

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    const randomTooltipId = generateRandomString(5);

    setTooltipId(randomTooltipId);
  }, []);

  return (
    <>
      <SButton
        $size={size}
        $variant={variant}
        $isMouseOver={isMouseOver}
        $isMouseDown={isMouseDown}
        $disabled={disabled}
        $loading={loading}
        $bg={theme}
        $customStyle={style}
        type={type}
        onMouseOver={() => handleMouseOver}
        onMouseLeave={() => handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={() => handleMouseUp}
        onClick={handleClick}
        disabled={loading || disabled}
        data-tooltip-id={tooltipId}
        data-tooltip-delay-show={100}
        data-tooltip-delay-hide={100}
      >
        {loading == true && (
          <SSpinner $size={size}>
            <FontAwesomeIcon icon={faSpinner} spin />
          </SSpinner>
        )}
        {startAdornment && (
          <SStartAdornment $size={size}> {startAdornment} </SStartAdornment>
        )}

        {children}

        {endAdornment && (
          <SEndAdornment $size={size}> {endAdornment} </SEndAdornment>
        )}
      </SButton>

      {tooltip && (
        <Tooltip
          id={tooltipId}
          content={tooltip.content}
          place={tooltip.place}
          style={{
            zIndex: 10000000,
            fontSize: size == "small" ? "12px" : size == "medium" ? "14px" : "",
            padding: size == "small" ? "7.5px" : size == "medium" ? "10px" : "",
          }}
        />
      )}
    </>
  );
};

Button.defaultProps = {
  type: "button",
  variant: "contained",
  size: "medium",
  disabled: false,
  loading: false,
};

export default React.memo(Button);
