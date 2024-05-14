import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SSpan } from './span.style'



const Span = (props: any) => {
    const { children, style } = props
    const device = useContext(DeviceContext)
    //////////////////console.log("Span RENDERED")


    useEffect(() => {}, [])

    return (
        <SSpan $customStyle={style} {...props}>{children}</SSpan>
    )
}

export default Span