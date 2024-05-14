import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SH6 } from './h6.style'

type H6Props = {
    style?: any,
    children: any
}

const H6 = (props: H6Props) => {
    const {
        style,
        children
    } = props
    const device = useContext(DeviceContext)


    useEffect(() => {}, [])

    return (
        <SH6 $customStyle={style}>{children}</SH6>
    )
}

export default H6