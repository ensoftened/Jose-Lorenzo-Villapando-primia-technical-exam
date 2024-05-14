import React, { useContext, useState, useRef, useEffect, CSSProperties, useMemo, useCallback } from "react"
import DatePickerProps from "../../../../types/DatePickerProps";
import { getLastWeekOfPrevMonth } from "../helpers";
import setTheme from "../../../../utils/setTheme";
import generateListOfNumbers from "../../../../utils/generateListOfNumbers";
import applyStyle from "../../../../utils/applyStyle";
import { DeviceContext } from "@App";



const daysOfWeek : string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months : string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


export const useDatePickerX = (props : DatePickerProps) => {  
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
      startYear,
      endYear,
      placeholder,
      name
      
  } = props     

  const device : string = useContext(DeviceContext)

  //////////////////////////////////////////////////////////////////////////////////////////////////////console.log("DATE PICKER RENDERED")
    //Constants
    const controlled : boolean = (value!==undefined) ? true : false
    const years : number[] = useMemo(() => generateListOfNumbers(Number(startYear), Number(endYear)), [])


    //States
    const [isFocused, setIsFocused] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)

    const [isRightButtonOnMouseOver, setIsRightButtonOnMouseOver] = useState(false)
    const [isRightButtonOnMouseDown, setIsRightButtonOnMouseDown] = useState(false)
    const [isLeftButtonOnMouseOver, setIsLeftButtonOnMouseOver] = useState(false)
    const [isLeftButtonOnMouseDown, setIsLeftButtonOnMouseDown] = useState(false)
    
    const [isCalendarButtonOnMouseOver, setIsCalendarButtonOnMouseOver] = useState(false)
    const [isCalendarButtonOnMouseDown, setIsCalendarButtonOnMouseDown] = useState(false)
    const [isClearButtonOnMouseOver, setIsClearButtonOnMouseOver] = useState(false)


    const [stateValue, setStateValue] = useState<any>();
    const [calendarShown, setCalendarShown] = useState(false);


    const [monthsShown, setMonthsShown] = useState(false)
    const [yearsShown, setYearsShown] = useState(false)

    const [daysShown, setDaysShown] = useState(true)


    const [monthButtonOnMouseOver, setMonthButtonOnMouseOver] = useState(false)

    const [leftAndRightButtonClicked, setleftAndRightButtonClicked] = useState(true);
    const [leftAndRightButtonClickedIndex, setleftAndRightButtonClickedIndex] = useState(0);




    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [currentDay, setCurrentDay] = useState<number>(new Date().getDate())
    const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate())

    const [ shouldCalendarShowAtTop, setShouldCalendarShowAtTop ] = useState(false)


    ////////////////////////////////////////////////////////////////////////////////////////////////////console.log("CURR YEAR", currentYear)

    const [isCalendarOnMouseOver, setIsCalendarOnMouseOver] = useState(false);
    

    const lastWeekOfPrevMonth = getLastWeekOfPrevMonth(currentYear, currentMonth) 
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("lastWeekOfPrevMonth", lastWeekOfPrevMonth)

    const startingDay : number = new Date((currentMonth+1) + "/1/"+currentYear).getDay()
    const nextMonthNumberOfDays = new Date(currentYear, (currentMonth+1)+1, 0).getDate();
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("nextMonthsNumberOfDays" + nextMonthNumberOfDays)
    const nextMonthListOfDays : number [] = []
    for(let i=0; i<nextMonthNumberOfDays; i++) {
        nextMonthListOfDays.push(i+1)
    }

    const numberOfDays = new Date(currentYear, currentMonth+1, 0).getDate();
    const listOfDays : number[] = []
    for(let i=0; i<numberOfDays; i++) {
        listOfDays.push(i+1)
    }


    let yearRefs = useRef<(HTMLDivElement | null)[]>([])
    const dayItemRefs = useRef<(HTMLDivElement | null)[]>([])


    //Refs
    const textFieldRef = useRef<any>(null)
    const labelRef = useRef<any>(null)
    const arrowRef = useRef<any>(null)

    const nodeRef = useRef<any>(null)
    const monthNodeRef = useRef<any>(null)
    const yearNodeRef = useRef<any>(null)
    const dayNodeRef = useRef<any>(null)
    const calendarIconRef = useRef<any>(null)
    const monthYearButtonsDivRef = useRef<any>(null)
    const calendarRef = useRef<any>(null)


    let x=-1
    let itr = -1

    //useEffect Hooks
    useEffect(() => {
      //setText(stateValue)
      setleftAndRightButtonClicked(true)
      setDaysShown(true)

      if(leftAndRightButtonClickedIndex==0){
          setSelectedDay(currentDay)
      } else {
          setSelectedDay(0)
      }
      
    }, [leftAndRightButtonClickedIndex])

    useEffect(() => {
        setSelectedDay(currentDay)
    }, [currentDay])

    useEffect(() => {

      if(yearsShown==true) { 
        //////////////////////////////////////////////////////////////////////////////////////////////////console.log("typeof currentYear", typeof currentYear)
          const index = years.indexOf(currentYear)
          //////////////////////////////////////////////////////////////////////////////////////////////////console.log("YEARS", years)
          //////////////////////////////////////////////////////////////////////////////////////////////////console.log("currentYear", currentYear)
          //////////////////////////////////////////////////////////////////////////////////////////////////console.log("index", index)
          yearRefs.current[index]?.scrollIntoView({ block: "center" });
          
      }
    }, [yearsShown])

//     function findIndexByValue(arr, value) {
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] === value) {
//       return i; // Return the index if the value is found
//     }
//   }
//   return -1; // Return -1 if the value is not found in the array
// }

    useEffect(() => {
        if(controlled) {
            if(value && value.length > 0){
                //////////////////////////////////////////////////////////////////////////////////////////////////////console.log("HERE ")
                setStateValue(value)
                setCurrentMonth(Number(value.split("/")[0])-1)
                setCurrentDay(Number(value.split("/")[1]))
                setCurrentYear(Number(value.split("/")[2]))
            } 
            else {
                //////////////////////////////////////////////////////////////////////////////////////////////////////console.log("HERE PO")
                setStateValue("")
                setCurrentMonth(new Date().getMonth())
                setCurrentDay(new Date().getDate())
                setCurrentYear(new Date().getFullYear())
            }
           
        }

      //textFieldRef.current.focus()
    }, [value])

    

    //Event Triggers

    const handleFocus = () => {
    
      if((!disabled && !loading)) {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("ON FOCUS")
          textFieldRef.current.placeholder = placeholder
          textFieldRef.current.focus()
          setIsFocused(true)
          
          const refStyle = textFieldRef.current.style


          const labelRefStyle = labelRef.current.style 


         // setCalendarShown(true)
      }



  }

  const handleTextFieldBlur = () => {
    ////////////////////////////////////////////////////////////////////////////////////////////////console.log("BLUR", stateValue)
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("BLURRR")
    if(/^(((0[1-9]|1[012])\/(?!00|29)([012]\d)|(0[13-9]|1[012])\/(29|30)|(0[13578]|1[02])\/31)\/(18|19|20|9999)\d{2}|02\/29\/((18|19|20)(0[48]|[2468][048]|[13579][26])|2000|9999))$/.test(stateValue)==false || (currentYear<startYear! || currentYear>endYear!)){
      ////////////////////////////////////////////////////////////////////////////////////////////////console.log("HEYYYY")
      

                //  textFieldRef.current.value = ""

        ////////////////////////////////////////////////////////////////////////////////////////////////console.log("DITO PO")
        setCurrentMonth(new Date().getMonth())
        setCurrentYear(Number(new Date().getFullYear()))
        setCurrentDay(new Date().getDate())
        setSelectedDay(new Date().getDate())

        setStateValue("")
        onChange("", name)
      
        


    } 



      if(isCalendarOnMouseOver ==false) setCalendarShown(false)
     
     // textFieldRef.current.focus()
      if(monthButtonOnMouseOver==true) {
          setMonthsShown(true)
          setDaysShown(false)
      }

       
      //else applyStyle(labelRefStyle, labelStyle_2)


      textFieldRef.current.placeholder = ""

      setIsFocused(false)



  }

  const handleChange = useCallback(() => {

      let inputValue = textFieldRef.current.value

      if(inputValue=="" || inputValue==null) {

          if(value) {
              setCurrentMonth(Number(value.split("/")[0])-1)
              setCurrentDay(Number(value.split("/")[1]))
              setCurrentYear(Number(value.split("/")[2]))    
          } else {
              setCurrentMonth(new Date().getMonth())
              setCurrentDay(new Date().getDate())
              setCurrentYear(Number(new Date().getFullYear()))    
          }


      } else {
          
          const inputParts = inputValue.split("/")
          const inputMonth = inputParts[0]
          const inputDate = inputParts[1]
          const inputYear= inputParts[2]
  
          setCurrentMonth(inputMonth-1)
          setCurrentDay(inputDate)
          setCurrentYear(Number(inputYear))
      }

      setStateValue(inputValue)





  }, [onChange])
  
  const handleMouseOver = () => {

    setIsMouseOver(true)

      
  }

  const handleMouseLeave = () => {
      setIsMouseOver(false)
  }



  const handleMonthButtonClick = () => {
      calendarIconRef.current.focus()
      setMonthsShown(true)
      setDaysShown(false)
      setYearsShown(false)
  }

  
  const handleYearButtonClick = () => {
      calendarIconRef.current.focus()


      if(yearsShown==false) {
          setMonthsShown(false)
          setDaysShown(false)
          setYearsShown(true)
      } else {
          setMonthsShown(false)
          setDaysShown(true)
          setYearsShown(false)
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("yearRefs", yearRefs)
  }
  

  const handleMonthButtonMouseOver = () => setMonthButtonOnMouseOver(true)
  const handleMonthButtonMouseLeave = () => setMonthButtonOnMouseOver(false)



  const handleMonthItemClick = (index : number) => {
      calendarIconRef.current.focus()
      setCurrentMonth(index)
      setMonthsShown(false)
      setDaysShown(true)
      setYearsShown(false)

      
      setStateValue(String(index+1).padStart(2, '0') + "/" + String(currentDay).padStart(2, '0') + "/" + currentYear)
      
  }

  const handleYearItemButtonClick = (index : number) => {
      calendarIconRef.current.focus()
      setCurrentYear(Number(years[index]))
      setMonthsShown(false)
      setDaysShown(true)
      setYearsShown(false)

      setStateValue(String(currentMonth+1).padStart(2, '0') + "/" + String(currentDay).padStart(2, '0') + "/" + years[index])
  }

  const handleItemOnMouseOver = (event : any, current: string) => {
      const dateItemRefStyle = event.target.style
      const textContent = event.currentTarget.textContent

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("CURRENT", current)
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("TEXT CONTENT", textContent)

      if((current==textContent)==false) {

      } else {

      }

  }
  const handleItemOnMouseLeave= (event : any, current: string, defaultStyle: any) => {
      const dateItemRefStyle = event.target.style
      const textContent = event.currentTarget.textContent

      if((current==textContent)==false) {
          applyStyle(dateItemRefStyle, defaultStyle) 
      } else {

      }
  }

  const handleItemOnMouseDown = (event : any, current: string) => {
      const dateItemRefStyle = event.target.style
      const textContent = event.currentTarget.textContent
      if((current==textContent)==false) {

      } else {

      }
  }

  const handleItemOnMouseUp = (event : any, current: string) => {
      const dateItemRefStyle = event.target.style
      const textContent = event.currentTarget.textContent
      if((current==textContent)==false) {

      }
  }

  const handleDayItemClick = (event : any) => {

    const textContent = event.currentTarget.textContent
    const val = String(currentMonth+1).padStart(2, '0') + "/" + textContent.padStart(2, '0') + "/" + currentYear

    const dateItemRefStyle = event.target.style
    const labelRefStyle = labelRef.current.style




    const calendarIconRefStyle = calendarIconRef.current.style


    setCurrentDay(textContent)

    if(controlled==false) setStateValue(val)
    onChange(val, name)


     
    setCalendarShown(false)

    textFieldRef.current.focus()
    setIsFocused(true)
  }

  const handleCalendarButtonClick = () => {
      calendarIconRef.current.focus()
      const calendarIconRefStyle = calendarIconRef.current.style
      if(calendarShown==false) {

      } else {

      }

              const textFieldRect = textFieldRef.current.getBoundingClientRect()
              const spaceAtBottom = window.innerHeight - textFieldRect.bottom
              ////////////////////////////console.log("SPACE AT BOTTOM", spaceAtBottom)
              ////////////////////////////////////console.log("List HEIGHT", listRect.height)

              if(spaceAtBottom < 360) {
                setShouldCalendarShowAtTop(true)
              } else {
                setShouldCalendarShowAtTop(false)
              }

      setCalendarShown(!calendarShown)
  
  
  }
  const handleCalendarButtonMouseDown = () => {
    setIsCalendarButtonOnMouseDown(true)
    
  
  }
  const handleCalendarButtonMouseUp= () => {
    setIsCalendarButtonOnMouseDown(false)
    
  
  }

  const handleLeftButtonClick = () => {
      setleftAndRightButtonClicked(false)
      setDaysShown(false)
      setleftAndRightButtonClickedIndex(prev => prev - 1)
      calendarIconRef.current.focus()
      if(currentMonth==0)  {
          setCurrentMonth(11)
          setCurrentYear(prev => Number(prev - 1))
      }
      else setCurrentMonth(prev => prev-1)
     
  }
  const handleRightButtonClick = () => {
      setleftAndRightButtonClicked(false)
      setDaysShown(false)
      setleftAndRightButtonClickedIndex(prev => prev + 1)
      calendarIconRef.current.focus()
      if(currentMonth==11)  {
          setCurrentMonth(0)
          setCurrentYear(prev => Number(prev + 1))
      }
      else setCurrentMonth(prev => prev+1)
      
  }

  const handleRightButtonMouseOver = () => {
    setIsRightButtonOnMouseOver(true)
  }

  const handleRightButtonMouseDown = () => {
    setIsRightButtonOnMouseDown(true)
  }

  const handleRightButtonMouseLeave = () => {
    setIsRightButtonOnMouseOver(false)
    setIsRightButtonOnMouseDown(false)
  }

  
  const handleLeftButtonMouseOver = () => {
    setIsLeftButtonOnMouseOver(true)
  }

  const handleLeftButtonMouseDown = () => {
    setIsLeftButtonOnMouseDown(true)
  }

  const handleLeftButtonMouseLeave = () => {
    setIsLeftButtonOnMouseOver(false)
    setIsLeftButtonOnMouseDown(false)
  }

  const handleCalendarButtonOnMouseOver = () => {
    setIsCalendarButtonOnMouseOver(true)
    setIsMouseOver(true)
  }

  const handleCalendarButtonOnMouseLeave = () => {
    setIsCalendarButtonOnMouseOver(false)
    setIsCalendarButtonOnMouseDown(false)
    setIsMouseOver(false)
  }

  const handleCalendarOnMouseOver = () => setIsCalendarOnMouseOver(true)
  const handleCalendarOnMouseLeave = () => setIsCalendarOnMouseOver(false)

  const handleCalendarButtonBlur = () => {
      if(isCalendarOnMouseOver==false) {
          setCalendarShown(false)
          setleftAndRightButtonClickedIndex(0)

          const calendarIconRefStyle = calendarIconRef.current.style


          if(/^(((0[1-9]|1[012])\/(?!00|29)([012]\d)|(0[13-9]|1[012])\/(29|30)|(0[13578]|1[02])\/31)\/(18|19|20|9999)\d{2}|02\/29\/((18|19|20)(0[48]|[2468][048]|[13579][26])|2000|9999))$/.test(stateValue)==true) {
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("OPO")
              const inputValue = textFieldRef.current.value
              const inputParts = inputValue.split("/")
              const inputMonth = inputParts[0]
              const inputDate = inputParts[1]
              const inputYear= inputParts[2]
      
              setCurrentMonth(inputMonth-1)
              setCurrentDay(inputDate)
              setCurrentYear(Number(inputYear))
          }
      }
  }

  const handleCalendarButtonOnMouseDown = () => {

  }
  
  const focused = () => document.activeElement === textFieldRef.current

    const postRenderFunction = () => {
    }

        const handleClearButtonClick = () => {
        setCurrentMonth(new Date().getMonth())
        setCurrentYear(Number(new Date().getFullYear()))
        setCurrentDay(new Date().getDate())
        setSelectedDay(new Date().getDate())
        if(controlled==false) {
                setStateValue("")
        } 
        
        onChange("", name)

  }
  const handleClearButtonMouseOver = () => {
    setIsClearButtonOnMouseOver(true)
  }
  const handleClearButtonMouseLeave = () => {
    setIsClearButtonOnMouseOver(false)
  }









   return {
    //Constants
    years, 
    //States
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
    isCalendarButtonOnMouseOver, 
    setIsCalendarButtonOnMouseOver,
    currentMonth,
    setCurrentMonth,
    currentYear,
    setCurrentYear,
    currentDay,
    setCurrentDay,
    selectedDay,
    setSelectedDay,
    isCalendarButtonOnMouseDown, 
    setIsCalendarButtonOnMouseDown,
    isCalendarOnMouseOver,
    isRightButtonOnMouseOver,
    isRightButtonOnMouseDown,
    isLeftButtonOnMouseOver,
    isLeftButtonOnMouseDown,
    setIsCalendarOnMouseOver,
    isFocused,
    isMouseOver,
    lastWeekOfPrevMonth,
    nextMonthNumberOfDays,
    nextMonthListOfDays,
    yearRefs,
    dayItemRefs,
    textFieldRef,
    labelRef,
    arrowRef,
    nodeRef,
    monthNodeRef,
    yearNodeRef,
    dayNodeRef,
    calendarIconRef,
    monthYearButtonsDivRef,
    startingDay,
    listOfDays,
    calendarRef,
    shouldCalendarShowAtTop,
    isClearButtonOnMouseOver, setIsClearButtonOnMouseOver,
    x,
    itr,



    handleFocus,
    handleTextFieldBlur,
    handleChange,
    handleMouseOver,
    handleMouseLeave,
    handleMonthButtonClick,
    handleYearButtonClick,
    handleMonthButtonMouseOver,
    handleMonthButtonMouseLeave,
    handleMonthItemClick,
    handleYearItemButtonClick,
    handleItemOnMouseOver,
    handleItemOnMouseLeave,
    handleItemOnMouseDown,
    handleItemOnMouseUp,
    handleDayItemClick,
    handleCalendarButtonClick,
    handleLeftButtonClick,
    handleRightButtonClick,
    handleCalendarOnMouseOver,
    handleCalendarOnMouseLeave,
    handleCalendarButtonBlur,
    handleRightButtonMouseOver,
    handleRightButtonMouseLeave,
    handleRightButtonMouseDown,
    handleLeftButtonMouseOver,
    handleLeftButtonMouseLeave,
    handleLeftButtonMouseDown,
    handleCalendarButtonOnMouseOver,
    handleCalendarButtonOnMouseLeave,
    handleCalendarButtonMouseDown,
    handleCalendarButtonMouseUp,
    handleClearButtonClick,
    handleClearButtonMouseOver,
    handleClearButtonMouseLeave,
    focused,


    //Function
    postRenderFunction
  }

}