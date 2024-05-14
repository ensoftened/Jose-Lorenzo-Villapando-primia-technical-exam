import { DeviceContext, UserContext } from '@App'
import React, {useEffect, useContext, useMemo, useCallback} from 'react'
import { SLoginFormCard, SLoginMainDiv } from './login.style'
import LoginForm from './LoginForm'

type LoginProps = {

}

const Login = (props: LoginProps) => {
    const currentUser = useContext(UserContext);
    const device = useContext(DeviceContext)
    //////////////////////////////////////console.log("Login RENDERED")


    useEffect(() => {}, [])

    return (
        <>
        {/* {
            (!currentUser) && */}
            <SLoginMainDiv>
                <SLoginFormCard $device={device}>
                    <LoginForm/>
                </SLoginFormCard>
            </SLoginMainDiv>
            
        {/* } */}
        </>

    )
}

export default Login    