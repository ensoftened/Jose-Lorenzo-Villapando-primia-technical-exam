import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { STH } from './th.style'

type THProps = {
    children?: any
}

const TH = (props: THProps) => {
    const device = useContext(DeviceContext)
    //////////////////////////////console.log("TH RENDERED")
    const {
        children
    } = props

    useEffect(() => {}, [])

    return (
        <STH>{children}</STH>
    )
}

export default TH