import React, {  useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties, RefObject } from 'react'

type RadioButtonProps = {

    
    isDisabled?: boolean,
    style?: CSSProperties,
    isChecked?: boolean,
    onChange?: any,
    item?: any,
    value?: any,
    index?: number,
    children: string,
    onFieldChange?: any,
    name?: string,

}

export default RadioButtonProps