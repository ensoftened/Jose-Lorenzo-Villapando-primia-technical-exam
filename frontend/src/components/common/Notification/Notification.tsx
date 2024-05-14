import { DeviceContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback, useState} from 'react'
import { NotificationContainer } from './notification.style'

export type NotificationProps = {
    message: string
}

const Notification = (props: NotificationProps) => {
    const device = useContext(DeviceContext)

    const {
        message
    } = props
    ////////////////////console.log("Notification RENDERED")

    const [ show, setShow ] = useState(true)


    useEffect(() => {
        const timer = setTimeout(() => {
        // You can add logic to hide the notification after a certain time
        // For example: set some state to hide the notification
        setShow(false)
        }, 3000); // Hides the notification after 3 seconds (adjust as needed)
        setShow(true)

        return () => clearTimeout(timer);
    }, []);

  return <> <NotificationContainer>{message}</NotificationContainer></>


}

Notification.defaultProps = {
    message: ""
}

export default Notification