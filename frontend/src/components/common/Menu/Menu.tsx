import { DeviceContext } from "@App";
import React, {
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";
import { SDiv, SInvisibleInput, SMenuHead, SMenuHeadWrapper, SMenuItem, SMenuItemList, SMenuItemListWrapper } from "./menu.style";

export type MenuProps = {
  children: any;
  style?: any;
};

const Menu = (props: MenuProps) => {
  const device = useContext(DeviceContext);
  const { children, style } = props;
  //////////////////console.log("Menu RENDERED", children);

  const [itemsShown, setItemsShown] = useState(false);
  const [ menuOnMouseOver, setMenuOnMouseOver ] = useState(false)

  //////////////////console.log("MOUSE OVER", menuHeadWrapperOnMouseOver)

  const menuItemListWrapperRef = useRef<any>()
  const inputRef = useRef<any>()

  useEffect(() => {
    setItemsShown(false)
  }, []);

  const handleMenuHeadClick = () => {
    ////////////////console.log("HANDLE", inputRef.current)


    if(itemsShown==false) { //hidden
      inputRef.current.focus()
      setItemsShown(true)
    } else { //shown
      inputRef.current.blur()
      setItemsShown(false)
    }
  };


  const handleBlur = () => {
    ////////////////console.log("BLURRED")
    if(menuOnMouseOver == false) {
        setItemsShown(false)
    }

  }
  
  const handleMenuMouseOver = () => {
    setMenuOnMouseOver(true)
  }
  const handleMenuMouseLeave = () => {
      setMenuOnMouseOver(false)
  }

  const handleMenuItemListWrapperClick = () => {
    setItemsShown(false)
  }

  return (
    <SDiv $customStyle={style}>
      <SInvisibleInput ref={inputRef} onBlur={handleBlur}/>
      <SMenuHeadWrapper onClick={handleMenuHeadClick} onMouseOver={handleMenuMouseOver} onMouseLeave={handleMenuMouseLeave}> {children[0]}</SMenuHeadWrapper>

      <SMenuItemListWrapper ref={menuItemListWrapperRef} onClick={handleMenuItemListWrapperClick} onMouseOver={handleMenuMouseOver} onMouseLeave={handleMenuMouseLeave} $itemsShown={itemsShown}>{children[1]}</SMenuItemListWrapper>
    </SDiv>
  );
};

export default Menu;

export const MenuHead = ({ children, style, onClick }: any) => {
  return <SMenuHead $customStyle={style}>{children}</SMenuHead>;
};
export const MenuItemList = ({ children, style, itemsShown }: any) => {
  //////////////////console.log("SHOW", itemsShown)
  return (
    <SMenuItemList $customStyle={style}>
      {children}
    </SMenuItemList>
  );
};

export const MenuItem = ({ children, style, onClick }: any) => {
  const [ itemOnMouseOver, setItemOnMouseOver ] = useState(false)
  const handleMouseOver = () => setItemOnMouseOver(true)
  const handleMouseLeave = () => setItemOnMouseOver(false)
  return (
    <SMenuItem $customStyle={style} onClick={onClick} $mouseOver={itemOnMouseOver} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      {children}
    </SMenuItem>
  );
};
