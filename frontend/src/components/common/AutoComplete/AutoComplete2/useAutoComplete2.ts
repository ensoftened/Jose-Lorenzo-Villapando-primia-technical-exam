import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  CSSProperties,
} from "react";

import SelectProps from "types/SelectProps";
import { DeviceContext, RootContext } from "@App";
import { AutoComplete2Props } from "./AutoComplete2";

export const useAutoComplete2 = (props: AutoComplete2Props) => {
  //Props
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
    placeholder,
    name,
    searchFunction,
    size,
  } = props;

  const device: string = useContext(DeviceContext);
  const rootRef: any = useContext(RootContext);

  const controlled: boolean = value !== undefined ? true : false;

  //////////////////////////console.log("ANG VALUE", value)

  //States
  const [text, setText] = useState<string>();
  const [stateValue, setStateValue] = useState<any>(controlled ? value : {});
  const [itemsShown, setItemsShown] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [arrowClickIndex, setArrowClickIndex] = useState(0);
  const [isArrowOnMouseOver, setIsArrowOnMouseOver] = useState(false);
  const [isClearButtonOnMouseOver, setIsClearButtonOnMouseOver] =
    useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isItemOnMouseOver, setIsItemOnMouseOver] = useState(false);
  const [isArrowOnMouseDown, setIsArrowOnMouseDown] = useState(false);

  const [shouldListShowAtTop, setShouldListShowAtTop] = useState(false);
  const [topPosition, setTopPosition] = useState<number>();
  const [bottomSpace, setBottomSpace] = useState<number>(0);
  const [topSpace, setTopSpace] = useState<number>(0);

  const [ dataLoading, setDataLoading ] = useState(false)

  const [typingTimeout, setTypingTimeout] = useState<any>();

  //////////////////////////console.log("ITEMS", name, items)

  ////////////////////////////////////////////////////////////////////////////////////console.log("FILTERED ITEMS", filteredItems)

  ////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("stateValue", stateValue)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("indexxx", arrowClickIndex)

  //Refs
  const textFieldRef = useRef<any>(null);
  const labelRef = useRef<any>(null);
  const arrowRef = useRef<any>(null);
  const itemRef = useRef<any>(null);
  const itemListRef = useRef<any>(null);
  const ghostListBottomRef = useRef<any>(null);
  const ghostListTopRef = useRef<any>(null);

  const stylingParameters = {
    style,
    disabled,
    loading,
    startAdornment,
    endAdornment,
    error,
  };

  //Post Render Function
  useEffect(() => {
    if (controlled) {
      ////console.log("CONTROLLED", value);
      if (Object.hasOwn(value, "_id")) {
        setText(value.label);
      } else {
        if (value.length > 0) {
          setText(value);
          onChange({ _id: value, label: value }, name);
        } else {
          setText("");
        }
      }
    }

    //textFieldRef.current.focus()
  }, [value]);

  useEffect(() => {
    const textFieldRect = textFieldRef.current.getBoundingClientRect();
    const bottom =
      rootRef.current.getBoundingClientRect().bottom - textFieldRect.bottom;
    const top = textFieldRect.top - rootRef.current.getBoundingClientRect().top;
    ////////////////////console.log("rootRef.current.getBoundingClientRect().top", name, top);
    // ////////////////////console.log("bottom", name, bottom)
    // ////////////////////console.log("top", name, top)

    setBottomSpace(bottom);
    setTopSpace(top);
  }, []);

  //Events / Functions
  const handleFocus = () => {
    ////////////////////console.log("PUKOS");
    if (!disabled && !loading) {
      textFieldRef.current.focus();
      setIsFocused(true);
      const textFieldRect = textFieldRef.current.getBoundingClientRect();
      const ghostListBottomRect =
        ghostListBottomRef.current.getBoundingClientRect();
      const ghostListTopRect = ghostListTopRef.current.getBoundingClientRect();
      const spaceAtBottom = window.innerHeight - textFieldRect.bottom;

      if (spaceAtBottom <= ghostListBottomRect.height) {
        setShouldListShowAtTop(true);
        setTopPosition(-ghostListTopRect.height);
      } else {
        ////////////////////console.log("FALSEEE");
        setShouldListShowAtTop(false);
      }
      if (textFieldRef.current.value.length == 0 && placeholder !== undefined) {
        setTimeout(() => {
          textFieldRef.current.placeholder = placeholder;
        }, 50);
      }

      setItemsShown(true);
    }
  };

  const handleBlur = () => {
    //////////////console.log("BLUR")
    const labelRefStyle = labelRef.current.style;

    ////////////console.log("BLUR");

    const val = stateValue;
    ////////////console.log("VAL", val)

    //////////////////////////////////////////////////////////////////////////console.log("VAL", val)

    setText(val.label);

    if (isArrowOnMouseOver == false) {
      //textFieldRef.current.blur()
      if (val.label == null) {
        if (controlled == false) setText("");

        setFilteredItems([]);
        ////////////console.log("NULL PO");
        onChange({}, name);
      } else {
        if (controlled == false) setText(val.label);

        onChange(val, name);
      }

      setItemsShown(false);
      setIsFocused(false);
    }
  };

  const handleChange = async () => {
    textFieldRef.current.focus();
    setIsFocused(true);
    setDataLoading(true)
    //setStateValue(textFieldRef.current.value)

    let searchValue = textFieldRef.current.value;
    ////////console.log("THE VALUE", searchValue);

    let fetchedData: any = null;
    setText(searchValue);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(async () => {
        if (searchValue.trim() !== "") {
          if (searchValue.length > 0) {
            ////////////console.log("SEARCH VALUE", searchValue)
            fetchedData = await searchFunction(searchValue, "", "", 1);

            setFilteredItems(fetchedData);

            setItemsShown(true);
            setDataLoading(false)
          } else {
            setText("");
            setFilteredItems([]);
            setItemsShown(false);
          }
        }
      }, 500)
    );

    if (searchValue.length == 0 && placeholder !== undefined) {
      textFieldRef.current.placeholder = placeholder;
    }
  };

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handleItemMouseOver = (event: any, item: any) => {
    setStateValue(item);
  };

  const handleItemMouseLeave = (event: any) => {
    setStateValue({});
  };

  const handleSelectArrowClick = () => {
    ////////////////////////////////////////////console.log("isFocused", isFocused)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("CLICK", focused())
    const arrowRefStyle = arrowRef.current.style;

    const bodyHalfHeight = document.body.getBoundingClientRect().height / 2;

    const listHeight =
      textFieldRef.current?.getBoundingClientRect().bottom +
      ghostListBottomRef.current?.getBoundingClientRect().height;

    //////////////////////////////////////////console.log("LIST HEIGHT", listHeight)
    //////////////////////////////////////////console.log("BODY HALF HEIGHT", bodyHalfHeight)

    //////////////////////////////////////////console.log("ITEMLISTREF", ghostListBottomRef.current?.getBoundingClientRect().height)

    const textFieldRect = textFieldRef.current.getBoundingClientRect();
    const listRect = ghostListBottomRef.current.getBoundingClientRect();
    const spaceAtBottom = window.innerHeight - textFieldRect.bottom;
    ////////////////////////////////////////console.log("SPACE AT BOTTOM", spaceAtBottom)
    ////////////////////////////////////////console.log("List HEIGHT", listRect.height)

    if (spaceAtBottom < 360) {
      setShouldListShowAtTop(true);
      setTopPosition(-362);
    } else {
      setShouldListShowAtTop(false);
    }

    if (value && value.label == null) {
      //////////////////////////////////////////console.log("NULL")
      if (controlled == false) setText("");

      setFilteredItems(items);
      onChange({}, name);
    }

    //////////////////////////////////////////console.log("THE VALUE", value)
    if (isFocused == false) {
      textFieldRef.current.focus();
      setIsFocused(true);
    } else {
      setIsFocused(false);
      textFieldRef.current.placeholder = "";
    }

    setItemsShown(!itemsShown);
  };

  const handleSelectArrowMouseDown = () => {
    //////////////////////////////////////////////////////////////////////////////////////////////////////console.log("DISBLED", disabled)
    if (disabled == false) {
      setIsArrowOnMouseDown(true);
    }
  };

  const handleSelectArrowMouseUp = () => {
    if (disabled == false) {
      setIsArrowOnMouseDown(false);
    }
  };
  const handleSelectArrowMouseOver = () => {
    setIsArrowOnMouseOver(true);
  };

  const handleSelectArrowMouseLeave = () => {
    setIsArrowOnMouseOver(false);
    setIsArrowOnMouseDown(false);
  };

  const handleClearButtonClick = () => {
    if (controlled == false) {
      setStateValue({});
    }

    onChange({}, name);
  };
  const handleClearButtonMouseOver = () => {
    setIsClearButtonOnMouseOver(true);
  };
  const handleClearButtonMouseLeave = () => {
    setIsClearButtonOnMouseOver(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      alert(text);
    }
  };

  const focused = () => document.activeElement === textFieldRef.current;
  return {
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
  };
};

export const useItem = (props: any) => {};
