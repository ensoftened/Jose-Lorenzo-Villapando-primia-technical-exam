import React, {  useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties, RefObject } from 'react'

type CheckListProps = {

    
    items: any[],
    value?: any,
    onChange: any,
    label: string,
    style?: CSSProperties,
    withSelectAll?:boolean,
    disabled?:boolean,
    name: string,
    filterable?: boolean,
    error?: string
    size?: string
}

export default CheckListProps