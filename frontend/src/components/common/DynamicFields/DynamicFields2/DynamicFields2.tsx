import React, { useState, useRef, useEffect, useContext } from "react";

import DatePicker from "../../DatePicker/DatePicker/DatePicker";
import Select from "../../Select/Select/Select";
import TextField from "../../TextField/TextField/TextField";
import IconButton from "../../IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faMinus,
  faPlus,
  faTrash,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import FormControl from "../../FormControl/FormControl";
import {
  SAbsoluteDiv,
  SDeleteButtonDiv,
  SFormControlsColumn,
  SLabel,
  SRelativeDiv,
  SRow,
  SRowTitleIndex,
} from "./dynamicFields2.style";
import { sentenceCase } from "text-case";
import { DeviceContext } from "../../../../App";
import { Div } from "@common/Div/Div";

import isObjectEmpty from "@utils/isObjectEmpty";
import AutoComplete2 from "@common/AutoComplete/AutoComplete2/AutoComplete2";
import Select2 from "@common/Select/Select2/Select2";
import TextField2 from "@common/TextField/TextField2/TextField2";
import isRealNumber from "@utils/isRealNumber";
import getDefaultValidationMessage from "@utils/getDefaultValidationMessage";
import DatePicker2 from "@common/DatePicker/DatePicker2/DatePicker2";
import TextArea2 from "@common/TextArea/TextArea2/TextArea2";
import CheckList from "@common/CheckList/CheckList";

type DynamicFields2Props = {
  initialFields: any;
  values: any;
  onChange: any;
  name: string;
  submitIndex: number;
  minRows: number;
  maxRows: number;
  label?: string;
  size?: string;
  preRowCreationFunction?: any;
  rowTitleIndex?: string;
};

const valuesToRows = (values: any, initialFields: any, minRows: number) => {
  ////////////////////////////////////////////////////////////////////console.log("CONVERTING", initialFields)
  //////console.log("YEYE", values);
  const tempRow: any[] = [];
  console.log("THEVALUES", values)
  // if (minRows > 0) {
    
  values.map((value: any) => {
    let obj: any = {};
    Object.keys(value).map((key: string, index: number) => {
      //console.log("ANG VALUE", value)
      //////////////////////////////////////////////////////////////////////////////////////////////console.log("initialFields[key]", initialFields[key])
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(initialFields[index])
      //////////////////////////////////////////////////////////////////////////////////////////////////////console.log("value[key]", value[key])
      //////////////////////////////////////////////////////////////////////////////////////////////////////console.log("pushing", {...initialFields[index], value: value[key]})
      obj = { ...obj, [key]: { ...initialFields[key], value: value[key] } };
    });

    //console.log("THE OBJ", obj)

    
    tempRow.push(obj);
  });
  // }

  ////////////////////console.log("TEMP ROW", tempRow)
  //////////////////////////////////////////////////////////////////////////////////////////////console.log("TEMP", tempRow)

  return tempRow;
};

const valuesToRows2 = (initialFields: any) => {
  const tempRow: any[] = [];
  ////////////////////console.log("HEHEHE")
  let obj: any = {};
  Object.keys(initialFields).map((fieldName: string, index: number) => {
    const field = initialFields[fieldName];
    ////////////////////////////////////////////////////////////////////////////////////////////console.log("field", initialFields[fieldName])
    ////////////////////////////////////////////////////////////////////////////////////////////console.log("fieldName", fieldName)

    let value: any = null;
    if (field.component == "Select" || field.component == "AutoComplete" ) {
      value = {};
    } else if (
      field.component == "TextField" ||
      field.component == "DatePicker"
    ) {
      value = "";
    } else if (
      field.component == "CheckList"
    ) {
      value = [];
    }
    obj = { ...obj, [fieldName]: { ...initialFields[fieldName], value } };
  });

  ////console.log("TEMP ROW2", obj)

  return obj;
};

const makeBlankValues = (initialFields: any) => {
  //////////////////////////////////////////////////////////////////////////console.log("INITIAL FIELDS", initialFields)

  let obj = {};
  Object.keys(initialFields).map((key: string) => {
    const { component } = initialFields[key];

    if (component === "Select" || component === "AutoComplete") {
      obj = { ...obj, [key]: {} };
    } else if(component === "CheckList"){
      obj = { ...obj, [key]: [] };
    }
    else {
      obj = { ...obj, [key]: "" };
    }
  });

  return obj;
};

const DynamicFields2 = ({
  initialFields,
  values,
  onChange,
  name,
  submitIndex,
  minRows,
  maxRows,
  label,
  size,
  preRowCreationFunction,
  rowTitleIndex,
}: DynamicFields2Props) => {
  const [rows, setRows] = useState(
    valuesToRows(values, initialFields, minRows)
  );
  const [inputIndex, setInputIndex] = useState(0);
  const [errors, setErrors] = useState<any>();

  const device: string = useContext(DeviceContext);
  //////////console.log("ROWS", rows)
  //////console.log("DynamicFields2 Rendered", initialFields);

  const addPerson = () => {
    ////////console.log("THE ROWS", rows);
    preRowCreationFunction([...rows, valuesToRows2(initialFields)].length - 1, [
      ...rows,
      valuesToRows2(initialFields),
    ]);

    setRows([...rows, valuesToRows2(initialFields)]);
    //////////////////////////////////////////////////////////////////////////console.log("VALUES", values)

    ////////////////////////////////////////////////////////////////////console.log("[...values, makeBlankValues(initialFields)]", [...values, makeBlankValues(initialFields)])
    onChange([...values, makeBlankValues(initialFields)], name);
  };

  const removePerson = (index: number) => {
    const updatedRows = [...rows];
    const updatedValues = [...values];

    //////////////////////////////////////////////////////////////////////console.log("UPDATED VALUES", updatedValues)

    if (errors) {
      //////console.log("ERRORS YES", errors);
      Object.keys(initialFields).map((key: string) => {
        delete errors[key + "_" + index];
      });
    }

    //////////////////////////////////////////////////////////////////////console.log("ERRORS AFTER", error)
    updatedRows.splice(index, 1);
    updatedValues.splice(index, 1);
    setRows(updatedRows);
    onChange(updatedValues, name);
  };

  //valuesToRows2(initialFields)

  const handleFieldChange = (
    value: any,
    index: number,
    fieldName: string,
    component: string,
    validators: any
  ) => {
    ////////////////////////////////////////////////////////////////////console.log("VALUES", values)
    ////////////////////////////////////////////////////////////////////console.log("VALUE", value)
    ////////////////////////////////////////////////////////////////////console.log("INDEX", index)
    ////////////////////////////////////////////////////////////////////console.log("FIELDNAME", fieldName)
    const isValid = validateDynamicFields2Property(
      value,
      index,
      fieldName,
      component,
      name,
      validators
    );

    const updatedRows = [...rows];
    const updatedValues = [...values];

    ////////////////////////////////////////////////////////////////////console.log("UPDATED VALUES", updatedValues)

    updatedRows[index][fieldName].value = value;
    updatedValues[index][fieldName] = value;

    setRows(updatedRows);

    onChange(updatedValues, name, index, fieldName, component, errors);
  };

  useEffect(() => {
    if (submitIndex > 0) {
      //////////////////////////////////////////////////////////////console.log("HEYYY", values)
      let tempErrors: any = {};
      values.map((row: any, index: number) => {
        //////console.log("THE ROW", row);
        //////////////////////////////////////////////////////////////////////console.log("index", index)
        Object.keys(row).map((key2: string) => {
          const { required, realNumber } = rows[index][key2].validators;

          console.log(  "key", key2);
          if (
            (required == true || required?.value == true) &&
            (row[key2] == "" ||
              isObjectEmpty(row[key2]) == true ||
              row[key2]._id == "")
          ) {
            tempErrors = {
              ...tempErrors,
              [key2 + "_" + index]:
                getDefaultValidationMessage("required", key2, "", "") + "!!!",
            };
          } else if (
            (realNumber == true || realNumber?.value == true) &&
            isRealNumber(row[key2]) == false
          ) {
            //////console.log("the key2");
            tempErrors = {
              ...tempErrors,
              [key2 + "_" + index]: getDefaultValidationMessage(
                "realNumber",
                "",
                "",
                ""
              ),
            };
          } else {
            if (row[key2]) {
              delete tempErrors[key2 + "_" + index];
            }
          }
        });
      });

      console.log("TEMP ERRORS", tempErrors)

      setErrors(tempErrors);
    }
  }, [submitIndex]);

  const validateDynamicFields2Property = (
    value: any,
    index: number,
    fieldName: string,
    component: string,
    name: string,
    validators: any
  ) => {
    //////console.log("VALIDATING", validators);
    //////console.log("THE VALUE", value);
    const targetField = fieldName + "_" + index;
    if (validators) {
      const { required, realNumber } = validators;
      if (
        (required == true || required?.value == true) &&
        ((["TextField", "DatePicker"].includes(component) && value == "") ||
          (["Select", "AutoComplete", "RadioList"].includes(component) &&
            (value.hasOwnProperty("_id") == false || value["_id"] == "")) ||
          (component == "CheckList" && value.length <= 0))
      ) {
        //////////////////////////////////////////////////////////////console.log("EYY", fieldName + "_" + index)
        setErrors((prev: any) => {
          return {
            ...prev,
            [targetField]: getDefaultValidationMessage(
              "required",
              fieldName,
              "",
              ""
            ),
          };
        });

        return false;
      }

      if (
        (realNumber == true || realNumber?.value == true) &&
        isRealNumber(value) == false
      ) {
        setErrors((prev: any) => {
          return {
            ...prev,
            [targetField]: getDefaultValidationMessage(
              "realNumber",
              "",
              "",
              ""
            ),
          };
        });

        return false;
      }
    }

    let newErrors = { ...errors };
    delete newErrors[targetField];
    setErrors(newErrors);

    // setErrors(errors)

    return true;
  };

  return (
    <>
      <SLabel $error={errors}>{label}</SLabel>
      <Div style={{}}>
        {
          //Render All Rows
          rows.map((row: any, index: number) => {
            //////console.log("ANG INDEX", rows);
            return (
              <>
                {rowTitleIndex && (
                  <SRowTitleIndex>{rowTitleIndex + (index + 1)}</SRowTitleIndex>
                )}

                <SRow>
                  <SFormControlsColumn>
                    {Object.keys(row).map((fieldName: string, i: number) => {
                      const field = row[fieldName];
                      const {
                        component,
                        items,
                        value,
                        type,
                        style,
                        label,
                        placeholder,
                        searchFunction,
                        preValidationFunction,
                        validators,
                        disabled,
                        loading,
                        withSelectAll,
                        filterable
                      } = field;

                      //////console.log("THE ITEMS", items);

                      return (
                        <>
                          {component === "TextField" && (
                            <FormControl style={{ ...style }}>
                              <TextField2
                                type={type}
                                error={
                                  errors ? errors[fieldName + "_" + index] : ""
                                }
                                label={label}
                                placeholder={placeholder}
                                size={size}
                                //startAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                // endAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                onChange={(e: any) =>
                                  handleFieldChange(
                                    e,
                                    index,
                                    fieldName,
                                    component,
                                    validators
                                  )
                                }
                                value={value}
                                name={fieldName}
                              />
                            </FormControl>
                          )}
                          {component === "TextArea" && (
                            <FormControl style={{ ...style }}>
                              <TextArea2
                                error={
                                  errors ? errors[fieldName + "_" + index] : ""
                                }
                                label={label}
                                placeholder={placeholder}
                                size={size}
                                //startAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                // endAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                onChange={(e: any) =>
                                  handleFieldChange(
                                    e,
                                    index,
                                    fieldName,
                                    component,
                                    validators
                                  )
                                }
                                value={value}
                                name={fieldName}
                              />
                            </FormControl>
                          )}
                          {component === "Select" && (
                            <FormControl style={{ ...style }}>
                              <Select2
                                label={label}
                                placeholder={placeholder}
                                size={size}
                                items={items}
                                error={
                                  errors ? errors[fieldName + "_" + index] : ""
                                }
                                //startAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                // endAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                onChange={(e: any) =>
                                  handleFieldChange(
                                    e,
                                    index,
                                    fieldName,
                                    component,
                                    validators
                                  )
                                }

                                disabled={disabled}
                                value={value}
                                name={fieldName}
                                loading={loading}
                              />
                            </FormControl>
                          )}
                          {component === "AutoComplete" && (
                            <FormControl style={{ ...style }}>
                              <AutoComplete2
                                label={label}
                                placeholder={placeholder}
                                size={size}
                                error={
                                  errors ? errors[fieldName + "_" + index] : ""
                                }
                                //startAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                // endAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                onChange={async (e: any) => {
                                  await preValidationFunction(
                                    e,
                                    index,
                                    rows,
                                    setRows
                                  );
                                  handleFieldChange(
                                    e,
                                    index,
                                    fieldName,
                                    component,
                                    validators
                                  );
                                }}
                                searchFunction={searchFunction}
                                value={value}
                                name={fieldName}
                              />
                            </FormControl>
                          )}
                          {component === "DatePicker" && (
                            <FormControl style={{ ...style }}>
                              <DatePicker2
                                label={label}
                                placeholder={placeholder}
                                size={size}
                                error={
                                  errors ? errors[fieldName + "_" + index] : ""
                                }
                                //startAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                // endAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                                onChange={(e: any) =>
                                  handleFieldChange(
                                    e,
                                    index,
                                    fieldName,
                                    component,
                                    validators
                                  )
                                }
                                value={value}
                                name={fieldName}
                              />
                            </FormControl>
                          )}

                          {component === "CheckList" && (
                          <FormControl style={{ ...style }}>
                            <CheckList
                              disabled={disabled}
                              items={items}
                              withSelectAll={withSelectAll}
                              filterable={filterable}
                              label={label}
                              size={size}
                              error={
                                errors ? errors[fieldName + "_" + index] : ""
                              }
                              //startAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                              // endAdornment={<FontAwesomeIcon icon={faEnvelope} />}
                              onChange={(e: any) =>
                                handleFieldChange(
                                  e,
                                  index,
                                  fieldName,
                                  component,
                                  validators
                                )
                              }
                              value={value}
                              name={fieldName}
                            />
                          </FormControl>
                        )}
                        </>
                      );
                    })}
                  </SFormControlsColumn>

                  <SDeleteButtonDiv>
                    <IconButton
                      tooltip={{
                        place: "bottom",
                        content: "Delete this row",
                      }}
                      disabled={rows.length < minRows}
                      size={"xs"}
                      theme={"errorTheme"}
                      onClick={() => removePerson(index)}
                      icon={<FontAwesomeIcon icon={faMinus} />}
                    />
                  </SDeleteButtonDiv>
                </SRow>
              </>
            );
          })
        }

        {rows.length < maxRows && (
        <SRelativeDiv $size={size}>
          <SAbsoluteDiv $device={device}>
            <IconButton
              tooltip={{ place: "bottom", content: "Add new row" }}
              size={"xs"}
              onClick={addPerson}
              icon={<FontAwesomeIcon icon={faPlus} />}
            />
          </SAbsoluteDiv>
        </SRelativeDiv>
         )} 
      </Div>
    </>
    //     <Div>
    //       <h1>List</h1>
    //       {rows.map((person: any, index: number) => (
    //         <Div key={index}>
    //           {/* <Input
    //             type="text"
    //             placeholder="Full Name"
    //             value={person.fullName}
    //             name={"fullName"}
    //             onChange={(e: any) => handleFullNameChange( e, index, "fullName")}
    //             onRemove={removePerson}

    //           /> */}

    //         <Div style={{display: "inline-block", margin: "20px 10px"}}>
    //           <TextFieldX
    //             value={person.fullName}
    //             onChange={(e: any) => handleFieldChange(e, index, "fullName")}
    //             name={"fullName"}
    //           />

    //         </Div>
    //         <Div style={{display: "inline-block", margin: "20px 10px"}}>
    //         <SelectX

    //             items={[
    //               {id: "Male", label: "Male"},
    //               {id: "Female", label: "Female"},
    //           ]}
    //             //startAdornment={<FontAwesomeIcon icon={faEnvelope} />}
    //             // endAdornment={<FontAwesomeIcon icon={faEnvelope} />}
    //             onChange={(e: any) => handleFieldChange(e, index, "gender")}
    //             value={person.gender}
    //             name={"gender"}
    //         />
    //         </Div>
    //         <Div style={{display: "inline-block", margin: "20px 10px"}}>
    //         <DatePickerX

    //                   value={person.dob}
    //                   onChange={(e: any) => handleFieldChange(e, index, "dob")}
    //         />
    //         </Div>

    // {/*
    //           <select
    //             value={person.gender}
    //             onChange={(e) => handleGenderChange(index, e.target.value)}
    //           >
    //             <option value="">Select Gender</option>
    //             <option value="Male">Male</option>
    //             <option value="Female">Female</option>
    //             <option value="Other">Other</option>
    //           </select> */}
    //           <button onClick={() => removePerson(index)}>Remove</button>
    //         </Div>
    //       ))}
    //       <button onClick={addPerson}>Add Person</button>
    //     </Div>
  );
};

DynamicFields2.defaultProps = {
  minRows: 1,
  maxRows: 4,
  size: "small",
};
export default React.memo(DynamicFields2);
