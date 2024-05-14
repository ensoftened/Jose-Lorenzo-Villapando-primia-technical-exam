import { checkIfUsernameIsTaken } from "@services/userService";
import getDefaultValidationMessage from "@utils/getDefaultValidationMessage";
import isObjectEmpty from "@utils/isObjectEmpty";
import isRealNumber from "@utils/isRealNumber";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { sentenceCase } from "text-case";

const useForm = (
  schema: any,
  data: any,
  setData: any,
  errors: any,
  setErrors: any,
  originalData?: any
) => {
  const [errorToRemove, setErrorToRemove] = useState<string>();
  const [removalTriggerIndex, setRemovalTriggerIndex] = useState<number>(0);

  console.log("USE FORM", originalData);
  const elRef = useRef<any | null>({});

  //////////////////////////////////////console.log("SHEMA UNDER HOOK", schema)

  const handleFormControlChange = async (
    value: any,
    data: any,
    setData: any,
    errors: any,
    setErrors: any,
    name: string,
    trigger?: string
  ) => {
    console.log("schema[name]", name, schema[name])
    const validateOnBlur = schema[name]?.validateOnBlur;
    if (name) {
      ////////////////////////////////////////////////////////////console.log("DITO")
      //////////////////////////////////////////////console.log("trigger", value)
      let isValid = false;
      if (
        ((validateOnBlur == true && trigger == "blur") ||
          ((validateOnBlur == false || !validateOnBlur) &&
            trigger == "change") ||
          !validateOnBlur) &&
        schema[name].component != "CheckBox"
      ) {
        //////////////////////////console.log("VALIDATING",)
        isValid = await validateProperty(
          value,
          data,
          setData,
          errors,
          setErrors,
          name
        );
      }

      if (schema[name].component == "PhotoUploader" && isValid == false) {
        ////////////////////////////////////////////////////console.log("FALSE")
        setData((prev: any) => {
          return {
            ...prev,
            [name]: {},
          };
        });
      } else {
        ////////////////////////////////////////////////////console.log("TRUE", value)
        setData((prev: any) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
    }
  };

  const validateProperty = async (
    value: any,
    data: any,
    setData: any,
    errors: any,
    setErrors: any,
    name: string
  ) => {
    const { component } = schema[name];

    console.log("THE NAME", name);
    console.log("THE VALUE", value);
    console.log("ORIGINALDATA", name, originalData);

    console.log(
      "THE SCHEMA",
      schema,
      name,
      component == "Select",
      value,
      value.hasOwnProperty("_id")
    );

    if (schema[name].validators) {
      const {
        required,
        min,
        max,
        maxTicked,
        minTicked,
        allowedFileTypes,
        maxSize,
        unique,
        regex,
      } = schema[name].validators;
      let message = "";

      ////////////////////////////////////////////////////////////////////////console.log("NAME", name)
      if (required) {
        if (
          ((component == "TextField" ||
            component == "TextArea" ||
            component == "DatePicker") &&
            value == "") ||
          ((component == "Select" || component == "RadioList") &&
            value.hasOwnProperty("_id") == false) ||
          (component == "CheckList" && value.length <= 0) ||
          (component == "PhotoUploader" && value instanceof File == false)
        ) {
          //console.log("yii");
          if (required == true || required.value == true) {
            message = required.errorMessage
              ? required.errorMessage
              : getDefaultValidationMessage("required", name, "", "");
          }
          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        }
      }

      if (value instanceof File == true) {
        if (allowedFileTypes) {
          const substrings = value.name.split(".");
          const fileExtension = substrings[substrings.length - 1];
          ////////////////////////////////////////////////////////////console.log("Array.isArray(allowedFileTypes)", Array.isArray(allowedFileTypes.values)==true && allowedFileTypes.values.includes(fileExtension)==false)

          if (
            Array.isArray(allowedFileTypes) == true &&
            allowedFileTypes.includes(fileExtension) == false
          ) {
            message = "Invalid file type";
            setErrors((prev: any) => {
              return { ...prev, [name]: message };
            });
            return false;
          } else if (
            Array.isArray(allowedFileTypes.values) == true &&
            allowedFileTypes.values.includes(fileExtension) == false
          ) {
            ////////////////////////////////////////////////////////////console.log("HEREEEEE")
            message = allowedFileTypes.errorMessage
              ? allowedFileTypes.errorMessage
              : "Invalid file type";
            setErrors((prev: any) => {
              return { ...prev, [name]: message };
            });
            return false;
          }

          ////////////////////////////////////////////////////////////console.log("FILE EXTENSION", fileExtension)
        }

        if (maxSize) {
          if (typeof maxSize == "number" && value.size > maxSize * 1000000) {
            message =
              sentenceCase(name) + "  should not exceed " + maxSize + " MB";
            setErrors((prev: any) => {
              return { ...prev, [name]: message };
            });
            return false;
          } else if (
            typeof maxSize == "object" &&
            value.size < maxSize.value * 1000000
          ) {
            message = maxSize.errorMessage
              ? maxSize.errorMessage
              : sentenceCase(name) +
                "  should not exceed " +
                maxSize.value +
                " MB";
            setErrors((prev: any) => {
              return { ...prev, [name]: message };
            });
            return false;
          }
        }
      }

      if (min) {
        ////////////////////////////////////////////////////////////console.log("TYPE OF MIN", typeof min == "object")

        if (typeof min == "number" && value.length < min) {
          message =
            sentenceCase(name) +
            " should have at least " +
            min +
            " character(s)";
          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        } else if (typeof min == "object" && value.length < min.value) {
          message = min.errorMessage
            ? min.errorMessage
            : sentenceCase(name) +
              " should have at least " +
              min.value +
              " character(s)";
          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        }
      }

      ////////////////////////////////////////////////////////////console.log("DI FALSE")

      if (max) {
        ////////////////////////////////////////////////////////////console.log("TYPE OF MAX", typeof max == "object")

        if (typeof max == "number" && value.length > max) {
          message =
            sentenceCase(name) +
            " should only have a maximum of " +
            max +
            " character(s)";

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        } else if (typeof max == "object" && value.length > max.value) {
          message = max.errorMessage
            ? max.errorMessage
            : sentenceCase(name) +
              " should only have a maximum of " +
              max.value +
              " character(s)";

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        }
      }

      if (regex) {
        //console.log("REGEX.VALUE", regex.value)
        //console.log("VALUE", value)
        //console.log("regex.value.test(value)", regex.value.test(value))
        ////////////////////////////////////////////////////////////console.log("TYPE OF MAX", typeof max == "object")
        if (typeof regex == "object" && regex.value.test(value) == false) {
          message = regex.errorMessage
            ? regex.errorMessage
            : "Format is not allowed";

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        }
      }

      if (minTicked) {
        ////////////////////////////////////////////////////////////console.log("TYPE OF MAX", typeof max == "object")

        if (typeof minTicked == "number" && value.length < minTicked) {
          message = "Please tick at least " + minTicked + " item(s)";

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        } else if (
          typeof minTicked == "object" &&
          value.length < minTicked.value
        ) {
          message = minTicked.errorMessage
            ? minTicked.errorMessage
            : "Please tick at least " + minTicked.value + " item(s)";

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        }
      }

      // if(minTicked && (value.length < minTicked)) {
      //   setErrors((prev: any)  => {return {...prev, [name]: "Please tick at least " + minTicked + " items"}})
      //   return false
      // }

      if (maxTicked) {
        if (typeof maxTicked == "number" && value.length > maxTicked) {
          message = "You can only tick " + maxTicked + " item(s)";

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        } else if (
          typeof maxTicked == "object" &&
          value.length > maxTicked.value
        ) {
          message = maxTicked.errorMessage
            ? maxTicked.errorMessage
            : "You can only tick " + maxTicked.value + " item(s)";

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });
          return false;
        }
      }

      if (unique) {
        //////////////console.log("CHECKING UNIQUENESS")
        const retrievedData = await unique(value);

        //////////////////////console.log("IS TAKEN? ", retrievedData.data.taken)

        if (retrievedData.data.taken == true && value != originalData[name]) {
          message = getDefaultValidationMessage("unique", name, "", value);

          setErrors((prev: any) => {
            return { ...prev, [name]: message };
          });

          return false;
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////console.log("trulaloo", name, errors)

    //const newErrors = errors
    // ////////////////////////////////////////////////////////////////////////console.log("NEW ERRORS", newErrors)

    // delete newErrors[name]

    // setErrors(newErrors)

    setErrorToRemove(name);
    setRemovalTriggerIndex((prev) => prev + 1);
    return true;
  };

  const handleDynamicFormControlChange = (
    value: any,
    schema: any,
    data: any,
    setData: any,
    errors: any,
    setErrors: any,
    index: number,
    fieldName: string,
    component: string,
    name: string
  ) => {
    // if(name) {
    //   ////////////////////////////////////////////////////////////////console.log("VALIDATION", index, validateDynamicFieldsProperty(value, index, fieldName, component, name))
    // }

    setData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (errorToRemove) {
      ////////////////////////////////////////////////////////////////////////console.log("REMOVING")
      const newErrors = { ...errors };
      delete newErrors[errorToRemove];
      setErrors(newErrors);
    }
  }, [removalTriggerIndex]);

  const validateForm = async (
    schema: any,
    data: any,
    errors: any,
    setErrors: any
  ) => {
    let tempErrors: any = {};
    let listOfFieldsWithError: any = [];

    //////console.log("SCHEMA", schema);

    await Promise.all(
      Object.keys(schema).map(async (key: string) => {
        ////////////////////////////////////////////////////////////////////////console.log("KEY", key, data[key] )
        ////console.log("ANG ERRORS", errors)
        if (
          schema[key].validators ||
          schema[key].component == "Dynamic Fields"
        ) {
          const { component, validators } = schema[key];

          let message = "";

          const value = data[key];

          if (component == "Dynamic Fields") {
            //////console.log("DYNAMIC !!!", schema[key]);
            data[key].map((row: any, index: number) => {
              ////////////////////////////////////////////////////////////////////////console.log("index", index)
              Object.keys(row).map((key2: string, index2: number) => {
                if (
                  row[key2] == "" ||
                  isObjectEmpty(row[key2]) == true ||
                  row[key2]._id == ""
                ) {
                  //////////////////////////////////console.log("OO YES", index2)
                  // if(index==0) {
                  listOfFieldsWithError.push(key);
                  // }
                  tempErrors = {
                    ...tempErrors,
                    [key2 + "_" + index]: getDefaultValidationMessage(
                      "required",
                      key2,
                      "",
                      ""
                    ),
                  };
                } else {
                  ////console.log("DELETING!!!", tempErrors);
                  if (row[key2]) {
                    delete tempErrors[key2 + "_" + index];
                    delete errors[key2 + "_" + index];
                  }
                }
              });
            });
          } else if (component == "CheckList") {
            if (validators.minTicked) {
              if (
                typeof validators.minTicked == "number" &&
                value.length < validators.minTicked
              ) {
                message =
                  "Please tick at least " + validators.minTicked + " item(s)";
                tempErrors = {
                  ...tempErrors,
                  [key]: message,
                };
              } else if (
                typeof validators.minTicked == "object" &&
                value.length < validators.minTicked.value
              ) {
                message = validators.minTicked.errorMessage
                  ? validators.minTicked.errorMessage
                  : "Please tick at least " +
                    validators.minTicked.value +
                    " item(s)";
                tempErrors = {
                  ...tempErrors,
                  [key]: message,
                };
              }
            }

            if (validators.maxTicked) {
              if (
                typeof validators.maxTicked == "number" &&
                value.length > validators.maxTicked
              ) {
                message =
                  "You can only tick " + validators.maxTicked + " item(s)";
                tempErrors = {
                  ...tempErrors,
                  [key]: message,
                };
              } else if (
                typeof validators.maxTicked == "object" &&
                value.length > validators.maxTicked.value
              ) {
                message = validators.maxTicked.errorMessage
                  ? validators.maxTicked.errorMessage
                  : "You can only tick " +
                    validators.maxTicked.value +
                    " item(s)";
                tempErrors = {
                  ...tempErrors,
                  [key]: message,
                };
              }
            }
          } else {
            if (component == "TextField" || component == "TextArea") {
              if (validators.regex) {
                if (
                  typeof validators.regex == "object" &&
                  validators.regex.value.test(value) == false
                ) {
                  message = message = validators.regex.errorMessage
                    ? validators.regex.errorMessage
                    : "Format is not allowed";
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                }
              }

              if (validators.min) {
                if (
                  typeof validators.min == "number" &&
                  value.length < validators.min
                ) {
                  message =
                    sentenceCase(key) +
                    " should have at least " +
                    validators.min +
                    " character(s)";
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                } else if (
                  typeof validators.min == "object" &&
                  value.length < validators.min.value
                ) {
                  message = validators.min.errorMessage
                    ? validators.min.errorMessage
                    : sentenceCase(key) +
                      " should have at least " +
                      validators.min.value +
                      " character(s)";
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                }
              }

              if (validators.max) {
                if (
                  typeof validators.max == "number" &&
                  value.length > validators.max
                ) {
                  message =
                    sentenceCase(key) +
                    " should only have a maximum of " +
                    validators.max +
                    " character(s)";
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                } else if (
                  typeof validators.max == "object" &&
                  value.length > validators.max.value
                ) {
                  message = validators.max.errorMessage
                    ? validators.max.errorMessage
                    : sentenceCase(key) +
                      " should only have a maximum of " +
                      validators.max.value +
                      " character(s)";
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                }
              }

              if (validators.unique) {
                const retrievedData = await validators.unique(value);

                ////////////////////console.log("THE VALUE", value)
                //////////////////////console.log("retrievedData.data.taken", retrievedData.data.taken)
                if (
                  retrievedData.data.taken == true &&
                  value != originalData[key]
                ) {
                  //////////////////////console.log("TRULALOO", key)
                  message = getDefaultValidationMessage(
                    "unique",
                    "",
                    "",
                    value
                  );
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                }

                //////////////////////console.log("TEMP2", tempErrors)
              }
            }

            if (component == "PhotoUploader") {
              if (validators.allowedFileTypes && value instanceof File) {
                ////////////////////////////////////////////////////////////console.log("THE VALUE PHOTO", value)

                const substrings = value?.name.split(".");
                const fileExtension = substrings[substrings.length - 1];
                ////////////////////////////////////////////////////////////console.log("Array.isArray(allowedFileTypes)", Array.isArray(validators.allowedFileTypes.values)==true && validators.allowedFileTypes.values.includes(fileExtension)==false)

                if (
                  Array.isArray(validators.allowedFileTypes) == true &&
                  validators.allowedFileTypes.includes(fileExtension) == false
                ) {
                  message = "Invalid file type";
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                } else if (
                  Array.isArray(validators.allowedFileTypes.values) == true &&
                  validators.allowedFileTypes.values.includes(fileExtension) ==
                    false
                ) {
                  message = validators.allowedFileTypes.errorMessage
                    ? validators.allowedFileTypes.errorMessage
                    : "Invalid file type";

                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                }
              }

              if (validators.maxSize) {
                ////////////////////////////////////////////////////////console.log("THE VALUE PHOTO", value)
                if (
                  typeof validators.maxSize == "number" &&
                  value.size > validators.maxSize * 1000000
                ) {
                  message =
                    sentenceCase(key) +
                    " should not exceed " +
                    validators.maxSize +
                    " MB(s)";
                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                } else if (
                  typeof validators.maxSize == "object" &&
                  value.size > validators.maxSize.value * 1000000
                ) {
                  message = validators.maxSize.errorMessage
                    ? validators.maxSize.errorMessage
                    : sentenceCase(key) +
                      " should not exceed " +
                      validators.maxSize.value +
                      " MB(s)";

                  tempErrors = {
                    ...tempErrors,
                    [key]: message,
                  };
                }
              }
            }

            if (validators.required) {
              console.log("REQUIRED");
              if (
                (validators.required == true ||
                  validators.required.value == true) &&
                (((component == "TextField" ||
                  component == "TextArea" ||
                  component == "DatePicker") &&
                  value == "") ||
                  ((component == "Select" || component == "RadioList") &&
                    isObjectEmpty(value) == true) ||
                  ((component == "PhotoUploader" ||
                    component == "FileUploader") &&
                    value instanceof File == false))
              ) {
                console.log("RADIOLIST OO");
                message = validators.required.errorMessage
                  ? validators.required.errorMessage
                  : getDefaultValidationMessage("required", key, "", "");
                tempErrors = {
                  ...tempErrors,
                  [key]: message,
                };
              }
            }
          }
        }

        //////////////////////console.log("TEMP3", tempErrors)
      })
    );

    //////////////////////console.log("TEMP1", tempErrors)
    ////////////////////////////////////////////////////////////////////////console.log("ERRORS", errors)

    tempErrors = { ...tempErrors };
    //////////////console.log("TEMP AFTER", tempErrors)
    setErrors(tempErrors);

    Object.keys(tempErrors).map((key: string) => {
      listOfFieldsWithError.push(key);
    });

    //////////////////////////////////console.log("THE LIST", listOfFieldsWithError)
    ////console.log("TEMP ERRORS", errors);

    if (JSON.stringify(tempErrors) == "{}") {
      return true;
    } else {
      elRef.current[listOfFieldsWithError[0]].scrollIntoView({
        block: "center",
      });
      return false;
    }
    ////////////////////////////////////////////////////////////////////////console.log("ALL ERRORS", tempErrors)
  };

  return {
    handleFormControlChange,
    handleDynamicFormControlChange,
    validateForm,
    elRef,
  };
};

export default useForm;
