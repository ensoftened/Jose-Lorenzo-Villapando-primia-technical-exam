import { useEffect, useCallback, useMemo, useContext, useState } from "react";
import { PasswordModalProps } from "./PasswordModal";
import useForm from "@hooks/useForm";
import inputData from "./inputData";
import { checkPassword } from "@services/authService";

const usePasswordModal = (props: PasswordModalProps) => {
  const { onClose } = props;

  const [data, setData] = useState(inputData);

  const [errors, setErrors] = useState<any>({});
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [originalData, setOriginalData] = useState(data);
  const [shouldClose, setShouldClose] = useState(false);
////////////////console.log("ANG DATA", data)
  const schema: any = useMemo(
    () => ({
      password: {
        component: "TextField",
        validateOnBlur: false,
        validators: {
          required: true,
        },
      },
    }),
    []
  );

  const {
    handleFormControlChange,
    handleDynamicFormControlChange,
    validateForm,
    elRef,
  } = useForm(schema, data, setData, errors, setErrors, originalData);

  const handleChange = useCallback(
    async (value: any, name?: string, trigger?: string) => {
      await handleFormControlChange(
        value,
        data,
        setData,
        errors,
        setErrors,
        name!,
        trigger
      );
    },
    [schema]
  );

  const handleSubmit = async () => {
    const isValid: boolean = await validateForm(
      schema,
      data,
      errors,
      setErrors
    );

    let message;
    if (isValid == true) {
      setSubmissionLoading(true);

      const response = await checkPassword(data)
      
      setSubmissionLoading(false)

      if(response.data.valid==true) handleModalClose(true)
      else setErrors({"password": "Invalid Password"})
       
      

    }
  };

  const handleModalClose = (success?: boolean) => {
    //////////////////////console.log("WILL CLOSE")
    setShouldClose(true);
    setTimeout(() => {
      setErrors({});
      setShouldClose(false);
      setData(inputData);

      onClose(success);
    }, 100);
  };

  useEffect(() => {}, []);

  return {
    errors,
    submissionLoading,

    shouldClose,

    data,

    elRef,
    handleChange,
    handleSubmit,
    handleModalClose,
  };
};

export default usePasswordModal;
