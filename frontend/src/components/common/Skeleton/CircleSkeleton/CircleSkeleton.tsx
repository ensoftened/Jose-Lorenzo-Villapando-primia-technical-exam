import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SSkeleton } from './circleSkeleton.style'

type CircleSkeletonProps = {
    style?: any
}

const CircleSkeleton = (props: CircleSkeletonProps) => {

    const {
        style
    } = props
    const device = useContext(DeviceContext)
    //////////////////////console.log("CircleSkeleton RENDERED")


    useEffect(() => {}, [])

    return (
        <SSkeleton $customStyle={style}></SSkeleton> 
    )
}

export default CircleSkeleton