import React, {  useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties, RefObject } from 'react'
type SelectProps = {
    color?: string,
    disabled?: boolean,
    endAdornment?: any,
    error?: string,
    loading?: boolean
    onChange?: any,
    onFocus?: any
    ref?: any,
    startAdornment?: any,
    style?: any,
    value?: any,
    items?: any,
    name?: string
    placeholder?: string,
    label?: string,
    size?: string,
    clearable?: boolean
}

export default SelectProps