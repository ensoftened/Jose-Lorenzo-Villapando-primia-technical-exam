import React from "react";
import { SDiv } from "./div.style";

export const Div = React.forwardRef((
  props: any, ref) => {
  const { children, style, className, } = props;


  return (
    <SDiv $customStyle={style} ref={ref} className={className} {...props}>
      {children}
    </SDiv>
  );
});
