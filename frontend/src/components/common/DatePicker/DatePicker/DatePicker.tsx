import React, {  useContext, useEffect, useState, useCallback, useMemo, memo, useRef, CSSProperties, RefObject } from 'react'

import applyStyle from '../../../../utils/applyStyle'

import setTheme from '../../../../utils/setTheme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowLeft, faArrowRight, faCalendar, faCalendarAlt, faChevronCircleDown, faChevronDown, faChevronLeft, faChevronRight, faSpinner, faX } from '@fortawesome/free-solid-svg-icons'
import { click } from '@testing-library/user-event/dist/click'
import { CSSTransition } from 'react-transition-group'
import { useDatePickerX } from './useDatePicker'
import generateListOfNumbers from '../../../../utils/generateListOfNumbers'
import { neutral, primary } from '../../../../style-helpers/theme'
import { getLastWeekOfPrevMonth } from '../helpers'
import DatePickerXProps from '../../../../types/DatePickerProps'
import { SCalendarBody, SCalendarButton, SCalendarDiv, SCalendarHeader, SCalendarIcon, SClearButton, SClearIcon, SDateGrid, SDatePanel, SDayItem, SDaysOfWeek, SDiv, SLabel, SLeftButton, SMonthAndYearSection, SMonthButton, SMonthItem, SMonthItemDiv, SMonthPanel, SPastAndFutureDateGrid, SRightButton, SSpinner, SStartAdornment, STextField, SYearButton, SYearItem, SYearItemDiv, SYearPanel } from './datePicker.style'
import PropTypes from 'prop-types';
import DatePickerProps from '../../../../types/DatePickerProps'
import { DeviceContext } from '@App'



const daysOfWeek : string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months : string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


const DatePicker = (props : DatePickerProps) => {
    const {
        color,
        disabled,
        endAdornment,
        error,
        loading,
        onChange,
        startAdornment,
        style,
        value,
        name,
        size,
        label,
        clearable,

        startYear,
        endYear
    } = props

    const controlled : boolean = (value!==undefined) ? true : false
    const device : string = useContext(DeviceContext)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("RENDERED")
    const {
        years,

        stateValue,
        setStateValue,
        calendarShown,
        setCalendarShown,
        monthsShown,
        setMonthsShown,
        yearsShown,
        setYearsShown,
        daysShown,
        setDaysShown,
        monthButtonOnMouseOver,
        setMonthButtonOnMouseOver,
        leftAndRightButtonClicked,
        setleftAndRightButtonClicked,
        leftAndRightButtonClickedIndex,
        setleftAndRightButtonClickedIndex,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        currentDay,
        setCurrentDay,
        selectedDay,
        setSelectedDay,
        isCalendarOnMouseOver,
        setIsCalendarOnMouseOver,
        lastWeekOfPrevMonth,
        nextMonthNumberOfDays,
        nextMonthListOfDays,
        isRightButtonOnMouseOver,
        isRightButtonOnMouseDown,
        isLeftButtonOnMouseOver,
        isLeftButtonOnMouseDown,
        isCalendarButtonOnMouseOver, 
        setIsCalendarButtonOnMouseOver,
        handleCalendarButtonMouseUp,
        handleCalendarButtonMouseDown,
        isCalendarButtonOnMouseDown,
        shouldCalendarShowAtTop,
        isClearButtonOnMouseOver, setIsClearButtonOnMouseOver,

        arrowRef,
        calendarIconRef,
        calendarRef,
        dayItemRefs,
        dayNodeRef,
        labelRef,
        listOfDays,
        monthNodeRef,
        monthYearButtonsDivRef,
        nodeRef,
        startingDay,
        textFieldRef,
        yearNodeRef,
        yearRefs,
        isFocused,
        isMouseOver,

        focused,
        handleCalendarButtonBlur,
        handleCalendarButtonClick,
        handleCalendarOnMouseLeave,
        handleCalendarOnMouseOver,
        handleCalendarButtonOnMouseLeave,
        handleChange,
        handleDayItemClick,
        handleFocus,
        handleItemOnMouseDown,
        handleItemOnMouseLeave,
        handleItemOnMouseOver,
        handleItemOnMouseUp,
        handleLeftButtonClick,
        handleMonthButtonClick,
        handleMonthButtonMouseLeave,
        handleMonthButtonMouseOver,
        handleMonthItemClick,
        handleMouseLeave,
        handleMouseOver,
        handleRightButtonClick,
        handleTextFieldBlur,
        handleYearButtonClick,
        handleYearItemButtonClick,
        handleRightButtonMouseOver,
        handleRightButtonMouseLeave,
        handleRightButtonMouseDown,
        handleLeftButtonMouseOver,
        handleLeftButtonMouseLeave,
        handleLeftButtonMouseDown,
        handleCalendarButtonOnMouseOver,

        handleClearButtonClick,
        handleClearButtonMouseOver,
        handleClearButtonMouseLeave,
            

    } = useDatePickerX(props)
    //States

    let x=-1
    let itr = -1

    ////////////////////////////////////////////////////////////////////////////////////////////////console.log("CURRENT", new Date((currentMonth+1) + "/01/" + (currentYear)))
    ////////////////////////////////////////////////////////////////////////////////////////////////console.log("2nd", new Date("01/01/"+(startYear!)))

    return (
        <SDiv
            $focused={isFocused}
            $error={error}
            $size={size}

        >
            {/* TEXT FIELD */}
            <STextField 
                $loading={loading}
                $disabled={disabled}
                $startAdornment={startAdornment}
                $error={error}
                $focused={isFocused}
                $value={stateValue}
                $mouseOver={isMouseOver}
                $size={size}
                $clearable={clearable}


                type={"text"}
                ref={textFieldRef}
                onChange={handleChange}
                value={stateValue}
                disabled={(disabled || loading) ? true : false}

                
                //onClick={handleClick}
                onFocus={handleFocus}
                onBlur={handleTextFieldBlur}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                placeholder={""}

                name={name}

                className={"input-text"}
            />
            
            {/* LABEL / PLACEHOLDER */}
            <SLabel ref={labelRef} 

                $loading={loading}
                $disabled={disabled}
                $startAdornment={startAdornment}
                $error={error}
                $focused={isFocused}
                $value={stateValue}
                $size={size}


               onClick={handleFocus}                 
                onBlur={handleTextFieldBlur}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} 

            >
                {label}
            </SLabel>

            {/* START ADORNMENT */}
            <SStartAdornment
                $loading={loading}
                $disabled={disabled}
                $size={size}


                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} 
            >
                {startAdornment}
            </SStartAdornment>

            {
                loading==true &&
                <SSpinner $size={size}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </SSpinner>
            }

            {
                (clearable == true && loading==false && disabled==false) &&
                <SClearButton
                    
                    $loading={loading}
                    $disabled={disabled}
                    $startAdornment={startAdornment}
                    $error={error}
                    $focused={isFocused}
                    $mouseOver={isClearButtonOnMouseOver}
                    $size={size}


                    onMouseOver={handleClearButtonMouseOver}
                    onMouseLeave={handleClearButtonMouseLeave}
                    onClick={handleClearButtonClick}  
                    ref={arrowRef} 
                    type={"button"}
                    disabled={disabled || loading}
                
                >
                    <SClearIcon><FontAwesomeIcon icon={faX} /></SClearIcon>
                </SClearButton>
            }


            {
                (!loading) &&
                <SCalendarButton 
                    $loading={loading}
                    $disabled={disabled}
                    $mouseOver={isCalendarButtonOnMouseOver}
                    $mouseDown={isCalendarButtonOnMouseDown}
                    $size={size}


                    $calendarShown={calendarShown}

                    ref={calendarIconRef}

                    onMouseOver={handleCalendarButtonOnMouseOver}
                    onMouseLeave={handleCalendarButtonOnMouseLeave}
                    onMouseUp={handleCalendarButtonMouseUp}
                    onMouseDown={handleCalendarButtonMouseDown}
                    onBlur={handleCalendarButtonBlur}
                    onClick={handleCalendarButtonClick}
                    disabled={disabled || loading}
                    type={"button"}
                
                >
                    <SCalendarIcon><FontAwesomeIcon icon={faCalendarAlt} /></SCalendarIcon>

                </SCalendarButton>
            }

            

            

            <CSSTransition unmountOnExit nodeRef={calendarRef} in={calendarShown} timeout={100} classNames={"fadeScaleShort"}>
                <SCalendarDiv
                        ref={calendarRef}
                        $shouldCalendarShowAtTop={shouldCalendarShowAtTop}
                        $size={size}
                        onMouseOver={handleCalendarOnMouseOver} onMouseLeave={handleCalendarOnMouseLeave}
                
                >
                    {/** MONTH AND YEAR SELECTION SECTION **/}
                    
                    <SCalendarHeader>
                        <CSSTransition unmountOnExit nodeRef={monthYearButtonsDivRef} in={leftAndRightButtonClicked} timeout={200} classNames={"fadeScaleLong"}>  
                        <SMonthAndYearSection ref={monthYearButtonsDivRef}> 
                                {/** MONTH BUTTON**/}
                                <SMonthButton 
                                    $size={size}
                                    onClick={handleMonthButtonClick}
                                    onMouseLeave={handleMonthButtonMouseLeave}

                                    type={"button"}
                                >
                                    
                                    { months [currentMonth]}
                                
                                
                                
                                </SMonthButton>
                      


                                {/** YEAR BUTTON**/}     
                                <SYearButton
                                     $size={size}

                                    onClick={handleYearButtonClick}
                                    type={"button"}
                                >
                                    {currentYear}
                                </SYearButton>
  
                        </SMonthAndYearSection>
                        </CSSTransition>

                        {
                            (yearsShown==false && monthsShown == false) &&
                        
                            <>
                                {
                                    ( new Date((currentMonth+1) + "/01/" + (currentYear)) > new Date("01/01/"+(startYear!))) &&
                                    <SLeftButton 
                                        $mouseOver={isLeftButtonOnMouseOver}
                                        $mouseDown={isLeftButtonOnMouseDown}
                                               $size={size}

                                        onClick={handleLeftButtonClick}
                                        onMouseOver={handleLeftButtonMouseOver}
                                        onMouseLeave={handleLeftButtonMouseLeave}
                                        onMouseDown={handleLeftButtonMouseDown}
                                        onMouseUp={handleLeftButtonMouseLeave} 
                                        type={"button"}
                        
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} />
           
                                    </SLeftButton>
                                }

                                {
                                    ( new Date((currentMonth+1) + "/01/" + (currentYear)) < new Date("11/30/"+(endYear!))) &&
                                   

                                <SRightButton  

                                    $mouseOver={isRightButtonOnMouseOver}
                                    $mouseDown={isRightButtonOnMouseDown}
                                    $size={size}

                                    onClick={handleRightButtonClick} 
                                    onMouseOver={handleRightButtonMouseOver}
                                    onMouseLeave={handleRightButtonMouseLeave}
                                    onMouseDown={handleRightButtonMouseDown}
                                    onMouseUp={handleRightButtonMouseLeave}
                                    type={"button"}
                                   
                                >   
                                    <FontAwesomeIcon icon={faChevronRight} />
                                
                                </SRightButton>
                                }
                            </>
                        }
                

                    </SCalendarHeader>
                    



                    <SCalendarBody>
                        {/** DATES and DAYS panel **/}
                        <CSSTransition unmountOnExit nodeRef={dayNodeRef} in={daysShown} timeout={300} classNames={"fadeScaleShort"}>
                            <SDatePanel 
                                ref={dayNodeRef} 
                  
                            >
                                {
                                    daysOfWeek.map((day : string) => {
                                        return (
                                            <SDaysOfWeek $size={size}>
                                                {day}
                                            </SDaysOfWeek>
                                        )
                                    })
                                
                            
                                }

                                {
                                        Array(42).fill(0).map((item : number, index:number) => {
                                            if(index == startingDay || (index > startingDay && x < listOfDays.length-1)) {
                                               
                                                x++
                                                return <SDateGrid 
                                                    >
                                                        <DayItem
                                                            active={selectedDay==listOfDays[x]}
                                                            onClick={handleDayItemClick}
                                                            index={index}
                                                            size={size}
                                                        >
                                                            {listOfDays[x]}
                                                        </DayItem>
                                                    </SDateGrid>
                                            
                                            } else {

                                                if(index>=listOfDays.length) itr++

                                                return <SPastAndFutureDateGrid $size={size}> 
                                                    {
                                                        index <= 7 &&
                                                        <>{lastWeekOfPrevMonth[index]}</>
                                                    }

                                                    {
                                                        index > 7 &&
                                                        <>{nextMonthListOfDays[itr]}</>
                                                    }
                                                    
                                                    
                                                </SPastAndFutureDateGrid>
                                            }

                                            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("MINK")
                                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("day ", listOfDays[index])
                                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("dayOfWeek ", new Date(currentMonth + "-" + listOfDays[index]+ "-"+currentYear).getDay())
                                        
                                        })
                                }
                            </SDatePanel>
                        </CSSTransition>
                        

                        {/** MONTHS PANEL **/}
                        <CSSTransition unmountOnExit nodeRef={monthNodeRef} in={monthsShown} timeout={100} classNames={"fadeScaleShort"}>
                            <SMonthPanel ref={monthNodeRef}>
                                {
                                    months.map((month : string, index : number) => {
                                        return <SMonthItemDiv 
                                            $size={size}

                                        >
                                            <MonthItem
                                                size={size}
                                                active={currentMonth == index}
                                                onClick={handleMonthItemClick}
                                                index={index}
                                            >
                                                {month}
                                            </MonthItem>

                                          
                                        </SMonthItemDiv>
                                    })
                                }
                            </SMonthPanel>
                        </CSSTransition>
                    

                        {/** YEARS PANEL */}

                        <CSSTransition unmountOnExit nodeRef={yearNodeRef} in={yearsShown} timeout={100} classNames={"fadeScaleShort"}>

                            <SYearPanel $size={size} ref={yearNodeRef}>
                                {
                                    years.map((year : number, index : number) => {
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("HEHE")
                                        return <SYearItemDiv 
 
                                            ref={ref => yearRefs.current[index] = ref}

                                        >

                                            <YearItem
                                                active={currentYear==years[index]}
                                                onClick={handleYearItemButtonClick}
                                                index={index}
                                                size={size}
                                            >
                                                {year}
                                            </YearItem>
                                        </SYearItemDiv>
                                    })
                                }
                            </SYearPanel>
                        </CSSTransition>

                    </SCalendarBody>
                   
                   
                        
                </SCalendarDiv>
            </CSSTransition>
        



        </SDiv>

    )
}

const MonthItem = (props: any) => {
    const {
        onClick,
        active,
        index,
        children,
        size
    } = props

    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const handleClick = (index: number) => {
        onClick(index)
    }
    const handleItemOnMouseOver = () => {
        setIsMouseOver(true)
    }
    const handleItemOnMouseLeave = () => {
        setIsMouseOver(false)
        setIsMouseDown(false)

    }
    const handleItemOnMouseDown = () => {
        setIsMouseDown(true)
    }
    const handleItemOnMouseUp = () => {
        setIsMouseDown(false)
    }

    return (
        <>
            <SMonthItem
                $active={active}
                $mouseOver={isMouseOver}
                $mouseDown={isMouseDown}
                $size={size}
                onClick={() => handleClick(index)}
                onMouseOver={handleItemOnMouseOver}
                onMouseLeave={handleItemOnMouseLeave}
                onMouseDown={handleItemOnMouseDown}
                onMouseUp={handleItemOnMouseUp}
            >
                {children}
            </SMonthItem>
        
        </>
    )
}

const YearItem = (props: any) => {
    const {
        onClick,
        active,
        index,
        children,
        size
    } = props

    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const handleClick = (index: number) => {
        onClick(index)
    }
    const handleItemOnMouseOver = () => {
        setIsMouseOver(true)
    }
    const handleItemOnMouseLeave = () => {
        setIsMouseOver(false)
        setIsMouseDown(false)

    }
    const handleItemOnMouseDown = () => {
        setIsMouseDown(true)
    }
    const handleItemOnMouseUp = () => {
        setIsMouseDown(false)
    }

    return (
        <>
            <SYearItem
                $active={active}
                $mouseOver={isMouseOver}
                $mouseDown={isMouseDown}
                $size={size}
                onClick={() => handleClick(index)}
                onMouseOver={handleItemOnMouseOver}
                onMouseLeave={handleItemOnMouseLeave}
                onMouseDown={handleItemOnMouseDown}
                onMouseUp={handleItemOnMouseUp}
            >
                {children}
            </SYearItem>
        
        </>
    )
}

const DayItem = (props: any) => {
    const {
        onClick,
        active,
        index,
        children,
        size
    } = props

    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const handleClick = (event: any) => {
        onClick(event)
    }
    const handleItemOnMouseOver = () => {
        setIsMouseOver(true)
    }
    const handleItemOnMouseLeave = () => {
        //////////////////////////////////////////////////////////////////////////////////////////////////console.log("LEAVE")
        setIsMouseOver(false)
        setIsMouseDown(false)
    }
    const handleItemOnMouseDown = () => {
        setIsMouseDown(true)
    }
    const handleItemOnMouseUp = () => {
        setIsMouseDown(false)
    }

    return (
        <>
            <SDayItem
                $active={active}
                $mouseOver={isMouseOver}
                $mouseDown={isMouseDown}
                $size={size}

                onClick={(event) => handleClick(event)}
                onMouseOver={handleItemOnMouseOver}
                onMouseLeave={handleItemOnMouseLeave}
                onMouseDown={handleItemOnMouseDown}
                onMouseUp={handleItemOnMouseUp}
            >
                {children}



                
            </SDayItem>
        
        </>
    )
}

DatePicker.defaultProps = {
    disabled: false,
    loading: false,
    startYear: 1900,
    endYear: 2099,
    label: "",
    placeholder: "",
    size: "small",
    clearable: false
}



export default React.memo(DatePicker)