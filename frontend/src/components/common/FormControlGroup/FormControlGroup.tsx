import { DeviceContext } from "@App";
import {
  SCol1,
  SCol2,
  SMainDiv,
  SLabel,
} from "@common/FormControlGroup/formControlGroup.style";
import React, { useEffect, useContext, useMemo, useCallback } from "react";

type FormControlGroupProps = {
  label?: string;
  children: any;
  size?: string;
};

const FormControlGroup = (props: FormControlGroupProps) => {
  const { label, children, size } = props;
  const device = useContext(DeviceContext);
  ////////////////////////////////////////////console.log("FormControlGroup RENDERED")

  useEffect(() => {}, []);

  return (
    <SMainDiv>
      {label && <SLabel $size={size}>{label}</SLabel>}

      {children}
    </SMainDiv>
  );
};

FormControlGroup.defaultProps = {
  size: "medium",
};

export default FormControlGroup;
