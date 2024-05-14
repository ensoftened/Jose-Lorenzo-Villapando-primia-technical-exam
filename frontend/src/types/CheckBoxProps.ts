import React, {  useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties, RefObject } from 'react'

type CheckBoxProps = {

    
    disabled: boolean,
    style?: CSSProperties,
    isChecked?: boolean,
    onChange?: any,
    item?: any,
    value?: any,
    index?: number,
    children: string,
    onFieldChange?: any,
    name?: string,
    size?: string

}

export default CheckBoxProps