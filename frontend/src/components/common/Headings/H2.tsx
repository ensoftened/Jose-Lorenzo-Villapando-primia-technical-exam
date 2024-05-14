import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SH2 } from './h2.style'

type H2Props = {
    style?: any,
    children: any
}

const H2 = (props: H2Props) => {
    const {
        style,
        children
    } = props
    const device = useContext(DeviceContext)


    useEffect(() => {}, [])

    return (
        <SH2 $customStyle={style}>{children}</SH2>
    )
}

export default H2