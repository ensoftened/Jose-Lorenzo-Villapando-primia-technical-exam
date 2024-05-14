import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SH5 } from './h5.style'

type H5Props = {
    style?: any,
    children: any
}

const H5 = (props: H5Props) => {
    const {
        style,
        children
    } = props
    const device = useContext(DeviceContext)


    useEffect(() => {}, [])

    return (
        <SH5 $customStyle={style}>{children}</SH5>
    )
}

export default H5