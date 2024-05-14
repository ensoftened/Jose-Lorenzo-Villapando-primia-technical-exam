import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useLayoutEffect,
  useMemo,
  memo,
  useRef,
  ComponentType,
  CSSProperties,
  ReactNode,
} from "react";
import {
  GAINSBORO,
  GRAY,
  LIGHT_GRAY,
  MAGENTA,
  ORANGE,
  WHITE,
} from "../../../constants/palette";
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
import { SError, SFormControl } from "./formControl.style";
import { DeviceContext } from "../../../App";

type FormControlProps = {
  style?: object;
  children: any;
  errorStyle?: any
};

const FormControl = forwardRef((props: FormControlProps, ref: any) => {
  const { style, children, errorStyle } = props;
    ////////////////console.log('FORM CONTROL', ref, children)




  const device: string = useContext(DeviceContext);
  //////////////////////////////////////////////console.log("CHILDREN", children)

  const error = children.props?.error;

  ////////////////////////////////////////////////////////////console.log("FORMCONTROL DEVICE", device)

  return (
    <>
      <SFormControl
        $device={device}
        $customStyle={style}
        ref={(theRef) => {
          if (ref) {
            return (ref.current[children.props.name] = theRef);
          }

          return;
        }}
      >
        {children}

        {error && (
          <SError $customStyle={errorStyle}  $device={device}>
            {error}
          </SError>
        )}
      </SFormControl>
    </>
  );
});



export default React.memo(FormControl);
