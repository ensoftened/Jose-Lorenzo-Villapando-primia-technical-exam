import { DeviceContext } from '@App'
import { Div } from '@common/Div/Div'
import H6 from '@common/Headings/H6'
import Image from '@common/Image/Image'
import { theme } from '@style-helpers/theme'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import Error404Image1 from "@static-images/404-Placeholders/404-Error-bro.png";


export type Error404PageProps = {

}

const Error404Page = (props: Error404PageProps) => {
    const device = useContext(DeviceContext)
    //////////////console.log("Error404Page RENDERED")


    useEffect(() => {
        document.title = "Not found"
    }, [])

    return (
        <Div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "100px",
            flexDirection: "column",
            gap: "5px"

        }}>
            <Image style={{

            }} src={Error404Image1} height={500} />

            <H6
                style={{
                    color: theme.neutral.dark
                }}
            >
                404
            </H6>

            <H6
                style={{
                    color: theme.neutral.dark,
                    fontWeight: "normal"
                }}
            >
                Page not found
            </H6>
        </Div>
    )
}

export default Error404Page