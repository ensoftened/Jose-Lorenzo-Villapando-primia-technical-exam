import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SDiv } from './avatar.style'
import getStringInitial from '@utils/getStringInitial';
import CircleSkeleton from '@common/Skeleton/CircleSkeleton/CircleSkeleton';

type AvatarProps = {
    firstName: string;
    lastName: string;
    avatarColor: string;
    image: string;
    loading?: boolean;
    style?: any
}

const Avatar = (props: AvatarProps) => {
    const device = useContext(DeviceContext)
    const {
        firstName,
        lastName,
        avatarColor,
        image,
        style
    } = props

    ////////////////////////console.log("Avatar RENDERED", image)


    useEffect(() => {}, [])

    const getInitials = () => {
        return getStringInitial(firstName) + getStringInitial(lastName) 
    }

    return (
        <SDiv $customStyle={style} $image={image} $avatarColor={avatarColor}>
            {
                !image &&
                getInitials()
            }
        </SDiv>
    )
}

Avatar.defaultProps = {
    image: null
}

export default Avatar