import React, { useContext, useEffect, useState, useCallback, useMemo, memo, } from 'react'
import { useCheckList} from './useCheckList'
import CheckBox from '../CheckBox/CheckBox'
import { SCheckListDiv, SDiv, SLabel } from './checkList.style'
import TextField from '../TextField/TextField/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import CheckListProps from 'types/CheckListProps'
import { Div } from '@common/Div/Div';

const CheckList = (props : CheckListProps) => {
    //////////////////////////////console.log('CheckListX Component Rendered')
    const {
        items,
        withSelectAll,
        label,
        disabled,
        name,
        value,
        filterable,
        error,
        size
    } = props

    ////////////////////////////////////////////////////////////////////console.log("VALUEx", value)

    const controlled : boolean = (value!==undefined) ? true : false


    const {
        stateValue,
        setStateValue,
        filteredItems, setFilteredItems,

        isSelectAllChecked,
        setIsSelectAllChecked,


        //Functions / Events
        handleSelectAllChange,
        handleChange,
        checkIfItemIsChecked,
        handleTextFieldChange
    } = useCheckList(props)

    const handleSearch = (searchValue: string) => {
        //////////////////////////////////////////////////////////////////////////////console.log("SEARCH VALUE", searchValue)

      let filteredItems = items.filter((item : any) => item.label.toUpperCase().includes(searchValue.toUpperCase()))
      setFilteredItems(filteredItems)

    }

    return (
        <>
            <SDiv $error={error}>
                <SLabel $error={error}>{label}</SLabel>
                
                {
                    (filterable) &&
                    <Div>
                        <TextField  startAdornment={<FontAwesomeIcon icon={faSearch}/>} placeholder={"Search"} label={"Search"} onChange={handleSearch} />
                    </Div>
                }

                <SCheckListDiv $error={error}>
                    {
                        (withSelectAll==true) &&
                        <>
                            <CheckBox size={size} item={{_id: "Select All", label: "Select All"}} isChecked={isSelectAllChecked} onChange={handleSelectAllChange} disabled={disabled}>
                                Select All
                            </CheckBox>

                        </>
                    }
                    {
                        filteredItems.map((item: any, index: number) => {
                            let val = value.filter((obj: any) => obj._id == item._id)[0]

                            return <>
                                <CheckBox size={size} index={index}  item={item} value={val} isChecked={(isSelectAllChecked==true) ? true : checkIfItemIsChecked(item)} onChange={handleChange} onFieldChange={handleTextFieldChange} disabled={disabled} name={name}>
                                    {item.label}
                                </CheckBox> 
                            </>
                        })
                    }
                </SCheckListDiv>
            </SDiv>
        </>
    )
}

CheckList.defaultProps = {
    size: "small"
}


export default memo(CheckList)