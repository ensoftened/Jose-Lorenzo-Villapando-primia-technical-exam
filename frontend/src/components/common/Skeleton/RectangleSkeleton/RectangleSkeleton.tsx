import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SSkeleton } from './rectangleSkeleton.style'

type RectangleSkeletonProps = {
    style?: any
}

const RectangleSkeleton = (props: RectangleSkeletonProps) => {
    const {
        style
    } = props
    const device = useContext(DeviceContext)
    //////////////////////console.log("RectangleSkeleton RENDERED")


    useEffect(() => {}, [])

    return (
        <SSkeleton $customStyle = {style}></SSkeleton> 
    )
}

export default RectangleSkeleton