import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SImage } from './image.style'

type ImageProps = {
    style?: any,
    alt?: string,
    width?: number,
    height?: number,
    src?: string,
    ref?: any
}

const Image = (props: ImageProps) => {
    const {
        
        style,
        width,
        height,
        src,
        alt,
        ref
    } = props
    const device = useContext(DeviceContext)
    //////////////////////console.log("Image RENDERED")


    useEffect(() => {}, [])

    return (
        <SImage 
            src={src}
            width={width}
            height={height}
            $customStyle={style}

            alt={alt}
            ref={ref}
        />
    )
}

Image.defaultProps = {
    
}

export default Image