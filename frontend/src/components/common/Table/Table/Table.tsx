import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback, ReactElement} from 'react'
import { STable } from './table.style'

type TableProps = {
    children?: any,
    style?: any,
    size?: string,
}

const Table = (props: TableProps) => {
    const device = useContext(DeviceContext)
    //////////////////////////////console.log("Table RENDERED")
    const {
        children,
        size,
        style,
    } = props

    const childrenWithPassedProp = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
        // Clone Div2 element and pass the loading prop
        return React.cloneElement(child as ReactElement, { });
        }
        return child;
    });
    useEffect(() => {}, [])

    return (
        <STable $size={size} $customStyle={style}>{childrenWithPassedProp}</STable>
    )
}

Table.defaultProps = {
    size: "small"
}

export default Table