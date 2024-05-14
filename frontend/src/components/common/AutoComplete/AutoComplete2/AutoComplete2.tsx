import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
  CSSProperties,
} from "react";

import { useItem, useAutoComplete2 } from "./useAutoComplete2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronCircleDown,
  faChevronDown,
  faRing,
  faSpinner,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { click } from "@testing-library/user-event/dist/click";
import { CSSTransition } from "react-transition-group";
import SelectProps from "types/SelectProps";
import { DeviceContext } from "@App";
import {
  SArrowButton,
  SArrowIcon,
  SClearButton,
  SClearIcon,
  SDiv,
  SGhostListBottom,
  SGhostListTop,
  SItem,
  SItemList,
  SLabel,
  SSpinner,
  SStartAdornment,
  STextField,
} from "./autoComplete2.style";
import { Div } from "@common/Div/Div";
import Span from "@common/Span/Span";

export type AutoComplete2Props = {
  color?: string;
  disabled?: boolean;
  endAdornment?: any;
  error?: string;
  loading?: boolean;
  onChange?: any;
  onFocus?: any;
  ref?: any;
  startAdornment?: any;
  style?: any;
  value?: any;
  items?: any;
  name?: string;
  placeholder?: string;
  label?: string;
  size?: string;
  clearable?: boolean;
  searchFunction: any;
};

const AutoComplete2 = (props: AutoComplete2Props) => {
  const {
    color,
    disabled,
    endAdornment,
    error,
    items,
    loading,
    onChange,
    startAdornment,
    style,
    value,
    name,
    label,
    size,
    clearable,
    placeholder,
  } = props;

  ////////////////////////console.log("SELECT RENDERED", name, items)
  //////////////////////////////////////////////console.log('SelectX Component Rendered', name)
  const device: string = useContext(DeviceContext);

  const controlled: boolean = value !== undefined ? true : false;

  const {
    //States
    text,
    setText,
    stateValue,
    setStateValue,
    itemsShown,
    setItemsShown,
    filteredItems,
    setFilteredItems,
    isFocused,
    setIsFocused,
    isMouseOver,
    setIsMouseOver,
    isItemOnMouseOver,
    isArrowOnMouseOver,
    setIsArrowOnMouseOver,
    isClearButtonOnMouseOver,
    setIsClearButtonOnMouseOver,
    isArrowOnMouseDown,
    shouldListShowAtTop,
    topPosition,
    bottomSpace,
    topSpace,
    dataLoading,

    //Refs
    textFieldRef,
    labelRef,
    arrowRef,
    itemRef,
    itemListRef,

    ghostListBottomRef,
    ghostListTopRef,

    //Events / Functions
    handleFocus,
    handleBlur,
    handleChange,
    handleMouseOver,
    handleMouseLeave,
    handleItemMouseOver,
    handleItemMouseLeave,
    handleSelectArrowClick,
    handleSelectArrowMouseLeave,
    handleSelectArrowMouseOver,
    handleSelectArrowMouseDown,
    handleSelectArrowMouseUp,
    handleClearButtonClick,
    handleClearButtonMouseOver,
    handleClearButtonMouseLeave,
    handleKeyDown,
    focused,
  } = useAutoComplete2(props);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("VALUE", value)

  return (
    <SDiv
      $focused={isFocused}
      $error={error}
      $size={size}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {/* TEXT FIELD */}
      <STextField
        $disabled={disabled}
        $error={error}
        $focused={isFocused}
        $loading={loading}
        $mouseOver={isMouseOver}
        $startAdornment={startAdornment}
        $clearable={clearable}
        $value={text}
        $size={size}
        type={"text"}
        ref={textFieldRef}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={text}
        disabled={disabled || loading ? true : false}
        name={name}
        placeholder={placeholder}
        //onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={"input-text"}
      />

      {/* LABEL / PLACEHOLDER */}
      <SLabel
        $disabled={disabled}
        $loading={loading}
        $focused={isFocused}
        $value={value?.label}
        $error={error}
        $startAdornment={startAdornment}
        $size={size}
        ref={labelRef}
        onClick={handleFocus}
        onBlur={handleBlur}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {label}
      </SLabel>

      {/* START ADORNMENT */}
      <SStartAdornment
        $loading={loading}
        $disabled={disabled}
        $size={size}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {startAdornment}
      </SStartAdornment>

      {loading == true && (
        <SSpinner $size={size}>
          <FontAwesomeIcon icon={faSpinner} spin />
        </SSpinner>
      )}

      {/* END ADORNMENT */}
      {clearable == true && loading == false && disabled == false && (
        <SClearButton
          $loading={loading}
          $disabled={disabled}
          $startAdornment={startAdornment}
          $error={error}
          $focused={isFocused}
          $value={text}
          $mouseOver={isClearButtonOnMouseOver}
          $size={size}
          onMouseOver={handleClearButtonMouseOver}
          onMouseLeave={handleClearButtonMouseLeave}
          onClick={handleClearButtonClick}
          ref={arrowRef}
          type={"button"}
          disabled={disabled || loading}
        >
          <SClearIcon>
            <FontAwesomeIcon icon={faX} />
          </SClearIcon>
        </SClearButton>
      )}

      {/* END ADORNMENT */}
      {loading == false && <></>}

      {/* <CSSTransition unmountOnExit nodeRef={itemListRef} in={itemsShown} timeout={100} classNames={"fadeScaleShort"}> */}

      <SGhostListBottom
        $loading={loading}
        $disabled={disabled}
        $error={error}
        $focused={isFocused}
        $value={text}
        $device={device}
        $itemsShown={itemsShown}
        $shouldListShowAtTop={shouldListShowAtTop}
        $size={size}
        $bottomSpace={bottomSpace}
        ref={ghostListBottomRef}
      >
        <Div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <SItemList
            $loading={loading}
            $disabled={disabled}
            $error={error}
            $focused={isFocused}
            $value={text}
            $device={device}
            $itemsShown={itemsShown && shouldListShowAtTop == false}
            $shouldListShowAtTop={shouldListShowAtTop}
            $topPosition={topPosition}
            $size={size}
            ref={itemListRef}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item: any, index: number) => (
                <Item
                  $mouseOver={isItemOnMouseOver}
                  onMouseOver={handleItemMouseOver}
                  onMouseLeave={handleItemMouseLeave}
                  item={item}
                  size={size}
                  ref={itemRef}
                >
                  {/* {[...item.label].map((char: string) => {
                    if (text?.includes(char)) {
                      return <Span style={{ fontWeight: "bold" }}>{char}</Span>;
                    } else {
                      return <>{char}</>;
                    }
                  })} */}
                  {item.label}
                </Item>
              ))
            ) : text && text.length > 0 ? (
              <SItem>
                {dataLoading == true ? <><FontAwesomeIcon icon={faSpinner} spin /> Please wait </> : <>No items</>}
              </SItem>
            ) : (
              <></>
            )}
          </SItemList>
        </Div>
      </SGhostListBottom>

      <SGhostListTop
        $loading={loading}
        $disabled={disabled}
        $error={error}
        $focused={isFocused}
        $value={text}
        $device={device}
        $itemsShown={itemsShown}
        $shouldListShowAtTop={shouldListShowAtTop}
        $size={size}
        $topSpace={topSpace}
        ref={ghostListTopRef}
      >
        <Div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <SItemList
            $loading={loading}
            $disabled={disabled}
            $error={error}
            $focused={isFocused}
            $value={text}
            $device={device}
            $itemsShown={itemsShown && shouldListShowAtTop == true}
            $shouldListShowAtTop={shouldListShowAtTop}
            $topPosition={topPosition}
            $size={size}
            ref={itemListRef}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item: any, index: number) => (
                <Item
                  $mouseOver={isItemOnMouseOver}
                  onMouseOver={handleItemMouseOver}
                  onMouseLeave={handleItemMouseLeave}
                  item={item}
                  size={size}
                  ref={itemRef}
                >
                  {item.label}
                </Item>
              ))
            ) : (
              <SItem>
                {dataLoading == true ? <><FontAwesomeIcon icon={faSpinner} spin /> Please wait </> : <>No items</>}
              </SItem>
            )}
          </SItemList>
        </Div>
      </SGhostListTop>
      {/* </CSSTransition> */}
    </SDiv>
  );
};

const Item = (props: any) => {
  const [isItemOnMouseOver, setIsItemOnMouseOver] = useState(false);

  const { onMouseOver, onMouseLeave, item, ref, children, size } = props;

  const handleItemMouseOver = (event: any, item: any) => {
    ////////////////////////////////////console.log("YE")
    setIsItemOnMouseOver(true);
    onMouseOver(event, item);
  };

  const handleItemMouseLeave = () => {
    setIsItemOnMouseOver(false);
    onMouseLeave();
  };

  return (
    <>
      <SItem
        $mouseOver={isItemOnMouseOver}
        $size={size}
        onMouseOver={(event: any) => handleItemMouseOver(event, item)}
        onMouseLeave={handleItemMouseLeave}
        key={item._id}
        ref={ref}
      >
        {children}
      </SItem>
    </>
  );
};

AutoComplete2.defaultProps = {
  disabled: false,
  loading: false,
  placeholder: "",
  label: "",
  size: "small",
  clearable: true,
};

export default React.memo(AutoComplete2);
