import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { STD } from './td.style'
import CircleSkeleton from '@common/Skeleton/CircleSkeleton/CircleSkeleton'

type TDProps = {
    children?: any
    style?: any
    loading?: boolean
}

const TD = (props: TDProps) => {
    const device = useContext(DeviceContext)
    //////////////////////////////console.log("TD RENDERED")
    const {
        children,
        style,
        loading
    } = props

    useEffect(() => {}, [])

    return (
        <STD $customStyle={style}>
            {
                loading==true ?
                <>
                    <CircleSkeleton />
                </>
                :
                <>
                    {children}
                </>
            }
 
        </STD>
    )
}

export default TD