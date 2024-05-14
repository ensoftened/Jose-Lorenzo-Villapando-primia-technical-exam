import React, {useEffect, useContext, useMemo, useCallback, useState} from 'react'
import Notification from '@common/Notification/Notification'


export type NotifyProps = {
    message: string
}

const Notify = (props: NotifyProps) => {

    const {
        message
    } = props

    const [ show, setShow ] = useState(true)
    //////////////////////console.log("notify RENDERED")


    useEffect(() => {}, [])

    return (
        <><Notification message={message} /></>
    )
}

export default Notify