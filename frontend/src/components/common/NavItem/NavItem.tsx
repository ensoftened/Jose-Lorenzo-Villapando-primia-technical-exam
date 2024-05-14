import { DeviceContext } from '@App'
import { faChevronCircleRight, faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '@style-helpers/theme';
import React, {Children, useEffect, useContext, useMemo, useState, useCallback, useRef} from 'react'
import { NavLink, useLocation, useMatch } from 'react-router-dom'
import { SArrowIcon, SDiv, SIcon, SNavLink, SParent, SSubMenu } from './navItem.style';

type NavItemProps = {
    to?: string;
    icon: any;
    linkLabel: string;
    key: string;
    children?: any
}

const NavItem = (props: NavItemProps) => {
    const {
        to,
        icon,
        linkLabel,
        key,
        children
    } = props
    const device = useContext(DeviceContext)
    const location = useLocation()


    return (
        <li>
            {
                children ? 
                 <ParentNav linkLabel={linkLabel} children={children} icon={icon} key={key} />


                : <NavLinkComponent icon={icon} linkLabel={linkLabel} to={to} key={key} />
            }
            
        </li>
    )
}

const NavLinkComponent = (props: any) => {
    const {
        icon,
        linkLabel,
        to,
        key
    } = props

    const [ navItemOnMouseOver, setNavItemOnMouseOver ] = useState(false)

    const match = useMatch(`${to}/*`) 

    const handleMouseOver = () => {
        setNavItemOnMouseOver(true)
    }

    const handleMouseOut = () => {
        setNavItemOnMouseOver(false)

    }

    return (
        <>
            <SNavLink 
            
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut} 

                $navItemOnMouseOver={navItemOnMouseOver}
                $active={to ? match : false}
                to={to!}
                key={key}
            >
                <SDiv $active={match}>
                    <SIcon><FontAwesomeIcon icon={icon} /></SIcon> {linkLabel}
                </SDiv>
  
            </SNavLink>
        </>
    )
}

const ParentNav = (props: any) => {
    const {
        linkLabel,
        children,
        icon,
        key
    } = props

    const [ navItemOnMouseOver, setNavItemOnMouseOver ] = useState(false)
    const [ navListShown, setNavListShown ] = useState(false)
    const [ checked, setisChecked ] = useState(false)

    const checkBoxRef = useRef<any>()
    const bodyNodeRef = useRef<any>()


    const handleMouseOver = () => {
        setNavItemOnMouseOver(true)
    }

    const handleMouseOut = () => {
        setNavItemOnMouseOver(false)

    }

    
    const handleCheckBoxChange = () => {
        setisChecked(!checked)
    }

    const handleClick = () => {
        checkBoxRef.current.click()
    }

    return<> <SParent 
    
        onMouseOver={handleMouseOver} 
        onMouseOut={handleMouseOut} 
        onClick={handleClick}

        $navItemOnMouseOver={navItemOnMouseOver}
        key={key}
    >
        <SDiv>
            <SIcon><FontAwesomeIcon icon={icon} /></SIcon> {linkLabel} 
            
            <SArrowIcon $checked={checked}><FontAwesomeIcon icon={faChevronRight} /></SArrowIcon>     
            <input ref={checkBoxRef} onChange={handleCheckBoxChange} type={"checkbox"} hidden />

            
        
        </SDiv>   
    </SParent>

            
    <SSubMenu $checked={checked}>

        {Children.map(children, (item) => {
        if (item != null) {
            const { icon, linkLabel, to, key, onClick, children } = item.props;

            if(item.props.children) {
                return <ParentNav linkLabel={linkLabel} children={children} icon={icon} key={key} />
            } else {
            //////////////////console.log("NO CHILDREN")
                return <NavLinkComponent icon={icon} linkLabel={linkLabel} to={to} key={key} />
            }

        }
    })}

    </SSubMenu>

    </>
    
}

export default NavItem