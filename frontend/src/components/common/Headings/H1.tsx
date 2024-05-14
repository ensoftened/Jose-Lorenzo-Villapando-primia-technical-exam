import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SH1 } from './h1.style'

type H1Props = {
    style?: any,
    children: any
}

const H1 = (props: H1Props) => {
    const {
        style,
        children
    } = props
    const device = useContext(DeviceContext)


    useEffect(() => {}, [])

    return (
        <SH1 $customStyle={style}>{children}</SH1>
    )
}

export default H1