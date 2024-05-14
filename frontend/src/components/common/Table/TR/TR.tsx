import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback, ReactElement} from 'react'
import { STR } from './tr.style'

type TRProps = {
    children?: any,
    style?: any,
    loading?: boolean,
}

const TR = (props: TRProps) => {
    const device = useContext(DeviceContext)
    //////////////////////////////console.log("TR RENDERED")
    const {
        children,
        style,
        loading
    } = props

        const childrenWithPassedProp = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
        // Clone Div2 element and pass the loading prop
        return React.cloneElement(child as ReactElement, { loading });
        }
        return child;
    });

    useEffect(() => {}, [])

    return (
        <STR $customStyle={style}>{childrenWithPassedProp}</STR>
    )
}

export default TR