import React, { useContext, useEffect, useState, useCallback, useMemo, memo, } from 'react'
import { useRadioList} from './useRadioList'
import CheckBox from '../CheckBox/CheckBox'
import CheckListXProps from '../../../types/CheckListProps'
import { SCheckListDiv, SDiv, SLabel } from './radioList.style'
import TextField from '../TextField/TextField/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import RadioButton from '../RadioButton/RadioButton'
import { Div } from '@common/Div/Div';

const RadioList = (props : CheckListXProps) => {
    //////////////////////////////////////////////////////////////////////////////////////console.log('CheckListX Component Rendered')
    const {
        items,
        withSelectAll,
        label,
        disabled,
        name,
        value,
        filterable,
        error
    } = props

    ////////////////////////////////////////////////////////////////console.log("VALUEx", items)

    const controlled : boolean = (value!==undefined) ? true : false


    const {
        stateValue,
        setStateValue,

        isSelectAllChecked,
        setIsSelectAllChecked,
        filteredItems, setFilteredItems,

        //Functions / Events
        handleSelectAllChange,
        handleChange,
        checkIfItemIsChecked,
        handleTextFieldChange
    } = useRadioList(props)

    const handleSearch = (searchValue: string) => {
        //////////////////////////////////////////////////////////////////////////////console.log("SEARCH VALUE", searchValue)

      let filteredItems = items.filter((item : any) => item.label.toUpperCase().includes(searchValue.toUpperCase()))
      setFilteredItems(filteredItems)

    }

    return (
        <>
            <SDiv  $error={error}>
                <SLabel $error={error}>{label}</SLabel>
                
                {
                    (filterable) &&
                    <Div>
                        <TextField  startAdornment={<FontAwesomeIcon icon={faSearch}/>} placeholder={"Search"} label={"Search"} onChange={handleSearch} />
                    </Div>
                }

                <SCheckListDiv>
                    {
                        filteredItems.map((item: any, index: number) => {
                          //  let val = value.filter((obj: any) => obj.id == item.id)[0]
                          ////////////////////////////////////////////////////////////////console.log("ITEMx", item)
                            ////////////////////////////////////////////////////////////////////////////console.log("ITEM", item)
                            ////////////////////////////////////////////////////////////////////////////console.log("VALUE", value)
                            //////////////////////////////////////////////////////////////////////////////////////console.log("VAL", val)
                            return <>
                                <RadioButton index={index} item={item} value={item} isChecked={(isSelectAllChecked==true) ? true : checkIfItemIsChecked(item)} onChange={handleChange} onFieldChange={handleTextFieldChange} isDisabled={disabled} name={name}>
                                    {item.label}
                                </RadioButton> 
                            </>
                        })
                    }
                </SCheckListDiv>
            </SDiv>
        </>
    )
}


export default memo(RadioList)