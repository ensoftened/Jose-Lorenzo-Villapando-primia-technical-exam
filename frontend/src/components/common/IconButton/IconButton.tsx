import React, { useContext, useEffect, useState, useCallback, useLayoutEffect, useMemo, memo, useRef, ComponentType, CSSProperties, isValidElement } from 'react'
import { GAINSBORO, GRAY, LIGHT_GRAY, MAGENTA, ORANGE,   WHITE } from '../../../constants/palette'
import { SIconButton, SIcon } from './iconButton.style'
import { primary } from '../../../style-helpers/theme'
import setTheme from '../../../utils/setTheme'
import PropTypes from 'prop-types';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import applyStyle from '../../../utils/applyStyle'
import styled from 'styled-components'
import Ripple from '../Ripple/Ripple'
import { Tooltip } from 'react-tooltip'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import generateRandomString from '../../../utils/generateRandomString'



type IconButtonXProps = {
    icon?: any,
    theme?: string,
    color?: string
    endAdornment?: any,
    size?: string,
    startAdornment?: any,
    style?: object,
    variant?: string,
    disabled?: boolean,
    onClick?: any,
    type?: any,
    tooltip?: any
    loading?: boolean,
}


const IconButton = (props: IconButtonXProps) => {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log('IconButtonX Component Rendered')

    const {
        icon,
        color,
        disabled,
        endAdornment,
        size,
        startAdornment,
        style,
        variant,
        onClick,
        theme,
        tooltip,
        loading
        
    } = props



    /* -- EVENT STATES -- */
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [tooltipId, setTooltipId] = useState("")

    //console.log("TYPEOF", icon.type === FontAwesomeIcon)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("THE THEME", theme)


    const handleClick = () => {
        if(onClick) onClick();
    };

    const handleMouseOver = () => {
        setIsMouseOver(true);
    };
    
    const handleMouseLeave = () => {
        setIsMouseOver(false);
    };
    
    const handleMouseDown = () => {
        setIsMouseDown(true);
    };
    
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    
    useEffect(() => {
        const randomTooltipId = generateRandomString(5)

        setTooltipId(randomTooltipId)
    }, [])
 
 


    return (
        <>
  
            
            <SIconButton 
                $size={size}
                $variant={variant}
                $isMouseOver={isMouseOver}
                $isMouseDown={isMouseDown}
                $disabled={disabled}
                $loading={loading}
                $bg={theme}
                $customStyle={style}

                type={"button"}
            
                onMouseOver={() => handleMouseOver}
                onMouseLeave={() => handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={()=>handleMouseUp}
                onClick={handleClick}
                disabled={loading || disabled}

                data-tooltip-id={tooltipId}
                data-tooltip-delay-show={100}
                data-tooltip-delay-hide={100}
            
            >
                    {
                        icon.type === FontAwesomeIcon ?           <SIcon $size={size}> {icon} </SIcon> : <>{icon}</>
           
                    }

          
              
            </SIconButton>

            {
                tooltip &&
                <Tooltip 
                    id={tooltipId}
                    content={tooltip.content}
                    place={tooltip.place}
                    style={{ 
                        zIndex: 10000000, 
                        fontSize: (size=="small") ? "12px" : ((size=="medium") ? "14px" : ""),
                        padding: (size=="small") ? "7.5px" : ((size=="medium") ? "10px" : ""),
                    }}
                />
            }



     
        
        </>
    )
}

IconButton.defaultProps = {
    type: "button",
    variant: "contained",
    size: "medium",
    disabled: false,
    loading: false
}


export default React.memo(IconButton)

