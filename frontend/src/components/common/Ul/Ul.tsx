import React from "react";
import { SUl } from "./ul.style";

export const Ul = (props: any) => {
  const { children, style, className } = props;

  return (
    <SUl $customStyle={style} className={className} {...props}>
      {children}
    </SUl>
  );
};
