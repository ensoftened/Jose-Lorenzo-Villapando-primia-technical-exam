import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SH4 } from './h4.style'

type H4Props = {
    style?: any,
    children: any
}

const H4 = (props: H4Props) => {
    const {
        style,
        children
    } = props
    const device = useContext(DeviceContext)


    useEffect(() => {}, [])

    return (
        <SH4 $customStyle={style}>{children}</SH4>
    )
}

export default H4