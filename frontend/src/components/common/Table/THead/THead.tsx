import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { STHead } from './thead.style'

type THeadProps = {
    children?: any;
    style?: any
}

const THead = (props: THeadProps) => {
    const device = useContext(DeviceContext)
    //////////////////////////////console.log("THead RENDERED")
    const {
        children,
        style
    } = props

    useEffect(() => {}, [])

    return (
        <STHead $customStyle={style}>{children}</STHead>
    )
}

export default THead