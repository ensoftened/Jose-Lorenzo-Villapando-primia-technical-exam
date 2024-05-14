import TextFieldProps from "../../../../types/TextFieldProps";
import React, { useState, useRef, useCallback, useEffect } from "react";

export const useTextField2 = (props: TextFieldProps) => {
  const {
    disabled,
    error,
    loading,
    onChange,
    startAdornment,
    style,
    value,
    name,
    type,
    placeholder,
    defaultValue,
    label,
    onKeyUp,
  } = props;
  //States
  const controlled: boolean = value !== undefined ? true : false;

  const [stateValue, setStateValue] = useState(
    controlled ? value : defaultValue ? defaultValue : ""
  );

  const [isPassword, setIsPassword] = useState(
    type == "password" ? true : false
  );

  const [isEyeButtonOnMouseOVer, setIsEyeButtonOnMouseOver] = useState(false);
  const [isEyeButtonOnMouseDown, setIsEyeButtonOnMouseDown] = useState(false);
  const [isClearButtonOnMouseOver, setIsClearButtonOnMouseOver] =
    useState(false);

  /* -- EVENT STATES -- */
  const [focused, setIsFocused] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  // -- REFS -- */
  const textFieldRef = useRef<any>(null);
  const labelRef = useRef<any>(null);

  const handleChange = async (event: any) => {

      const {value } = textFieldRef.current

      //console.log("THE VALUEE", typeof value)

      if(type=="number" && /^(?:[1-9]\d*|)$/.test(value) == false) {
        return
      }
      setStateValue(value);
      let cursorPosition = event.target.selectionStart;

      if (onChange) {
        await onChange(value, name, "change");
      }

      ////////////////////console.log("EYYYY", cursorPosition)
      event.target.setSelectionRange(cursorPosition, cursorPosition);
      ////////////////////console.log("EYYYY2", cursorPosition)
    
  };

  const handleFocus = () => {
    //////////////////////////console.log("FOCUS")
    if (!disabled) {
      setIsFocused(true);
      textFieldRef.current.focus();
    }
  };

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setStateValue(textFieldRef.current.value);

    if (onChange) {
      onChange(textFieldRef.current.value, name, "blur");
    }
  }, [onChange]);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handlePasswordEyeButtonClick = () => {
    setIsPassword(!isPassword);
  };

  const handleEyeButtonMouseOver = () => {
    setIsMouseOver(true);
    setIsEyeButtonOnMouseOver(true);
  };
  const handleEyeButtonMouseLeave = () => {
    setIsMouseOver(false);
    setIsEyeButtonOnMouseOver(false);
    setIsEyeButtonOnMouseDown(false);
  };

  const handleEyeButtonMouseDown = () => {
    setIsEyeButtonOnMouseDown(true);
  };
  const handleEyeButtonMouseUp = () => {
    setIsEyeButtonOnMouseDown(false);
  };

  const handleKeyUp = (event: any) => {
    if (onKeyUp) onKeyUp(event);
  };

  const handleClearButtonClick = () => {
    if (controlled == false) {
      setStateValue("");
    }

    onChange("", name);
  };
  const handleClearButtonMouseOver = () => {
    setIsClearButtonOnMouseOver(true);
  };
  const handleClearButtonMouseLeave = () => {
    setIsClearButtonOnMouseOver(false);
  };
  return {
    stateValue,
    setStateValue,
    isEyeButtonOnMouseOVer,
    setIsEyeButtonOnMouseOver,
    isEyeButtonOnMouseDown,
    setIsEyeButtonOnMouseDown,
    isClearButtonOnMouseOver,
    setIsClearButtonOnMouseOver,

    focused,
    setIsFocused,
    isMouseOver,
    setIsMouseOver,
    isPassword,

    textFieldRef,
    labelRef,

    handleChange,
    handleFocus,
    handleBlur,
    handleMouseOver,
    handleMouseLeave,
    handlePasswordEyeButtonClick,
    handleEyeButtonMouseOver,
    handleEyeButtonMouseLeave,
    handleEyeButtonMouseDown,
    handleEyeButtonMouseUp,
    handleKeyUp,
    handleClearButtonClick,
    handleClearButtonMouseOver,
    handleClearButtonMouseLeave,
  };
};
