import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SH3 } from './h3.style'

type H3Props = {
    style?: any,
    children: any
}

const H3 = (props: H3Props) => {
    const {
        style,
        children
    } = props
    const device = useContext(DeviceContext)


    useEffect(() => {}, [])

    return (
        <SH3 $customStyle={style}>{children}</SH3>
    )
}

export default H3