import { DeviceContext } from '@App'
import { theme } from '@style-helpers/theme';
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { Div } from '@common/Div/Div';
import H4 from '@common/Headings/H4';
import H5 from '@common/Headings/H5';
import H6 from '@common/Headings/H6';


type SubFormProps = {
    title: string;
    children: any
}

const SubForm = (props: SubFormProps) => {
    const {
        title,
        children
    } = props
    const device = useContext(DeviceContext)
    //////////////////////////////////////console.log("SubForm RENDERED")


    useEffect(() => {}, [])

    return (
        <Div style={{padding: "20px 0 0 0",}}>
            <H6 style={{color: "black", borderBottom: "2px dotted " + theme.neutral.lighter, paddingBottom: "5px"}}>{title}</H6>
            <Div style={{padding: "10px 0"}}>
            {children}
            </Div>
        
        </Div>
    )
}

export default SubForm