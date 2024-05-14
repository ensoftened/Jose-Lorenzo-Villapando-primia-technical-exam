import React from "react";
import { SLi } from "./li.style";

export const Li = (props: any) => {
  const { children, style, className } = props;

  return (
    <SLi $customStyle={style} className={className} {...props}>
      {children}
    </SLi>
  );
};
