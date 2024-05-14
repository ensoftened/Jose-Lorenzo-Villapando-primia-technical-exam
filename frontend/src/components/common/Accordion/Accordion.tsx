import { DeviceContext } from '@App'
import React, {useEffect, useState, useContext, useMemo, useRef, useCallback} from 'react'
import { SArrowSpan, SBodyDiv, SHeadButton, SHeadDiv } from './accordion.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'

type AccordionProps = {
    head: any,
    body: any
}

const Accordion = (props: AccordionProps) => {
    const {
        head, body
    } = props
    const device = useContext(DeviceContext)
    //////////////////////////////////////////console.log("Accordion RENDERED", head.props.children)

    const [ checked, setisChecked ] = useState(false)

    const checkBoxRef = useRef<any>()
    const bodyNodeRef = useRef<any>()

    const handleCheckBoxChange = () => {
        setisChecked(!checked)
    }

    const handleHeadButtonClick = () => {
        checkBoxRef.current.click()
    }
    


    useEffect(() => {}, [])

    return (
        <>
            {/* Head */}
            <SHeadDiv $checked={checked}   >
                <SHeadButton onClick={handleHeadButtonClick}>
                    {head.props.children}
                </SHeadButton>
                <SArrowSpan $checked={checked} onClick={handleHeadButtonClick}><FontAwesomeIcon icon={faChevronDown}/></SArrowSpan>
                <SBodyDiv $checked={checked} onClick={() =>{}} ref={bodyNodeRef}>
                {body.props.children}
            </SBodyDiv>
            
            </SHeadDiv>

            <input ref={checkBoxRef} onChange={handleCheckBoxChange} type={"checkbox"} hidden />

            {/* Body */}

                
    


            
            

        
        </>
    )
}

export default Accordion