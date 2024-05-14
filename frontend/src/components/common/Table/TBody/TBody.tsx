import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback, ReactElement} from 'react'
import { STBody } from './tbody.style'

type TBodyProps = {
    children?: any;
    loading?: boolean;
    pageSize?: number
}

const TBody = (props: TBodyProps) => {
    const device = useContext(DeviceContext)
    const {
        children,
        loading,
    } = props

        ////////////////////console.log("TBody RENDERED", loading)

        const childrenWithPassedProp = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
        // Clone Div2 element and pass the loading prop
        return React.cloneElement(child as ReactElement, { loading });
        }
        return child;
    });

    useEffect(() => {}, [])

    return (
        <STBody>{childrenWithPassedProp}</STBody>
    )
}

export default React.memo(TBody)