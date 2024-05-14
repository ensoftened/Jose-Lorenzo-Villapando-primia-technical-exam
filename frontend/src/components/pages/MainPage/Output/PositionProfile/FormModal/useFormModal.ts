import { useEffect, useCallback, useMemo, useContext, useState } from "react";
import { FormModalProps } from "./FormModal";
import {
  checkIfIngredientNameIsTaken,
  createNewPosition,
  editIngredient,
  fetchAllPositions,
  getAllIngredients,
} from "@services/positionService";
import {
  checkIfUsernameIsTaken,
  createNewUser,
  editUser,
  getPaginatedUsers,
} from "@services/userService";
import useForm from "@hooks/useForm";
import inputData from "./inputData";
import { useLocationFields } from "@hooks/useLocationFields";
import Notify from "@utils/notify";
import { showToast } from "@utils/showToast";
import { AxiosError } from "axios";
import { getAllResponsibilities } from "@services/responsibilityService";
import { ModalContext } from "@contexts/ModalProvider";
import {
  addCandidateToPosition,
  fetchAllPositionCandidates,
} from "@services/positionCandidateService";

const useFormModal = (props: FormModalProps) => {
  const {
    //Passed States
    data,
    setData,
    positionObject,
    setPositionObject,

    //Passed Functions
    onClose,
  } = props;
  const { closeModal }: any = useContext(ModalContext);

  const [errors, setErrors] = useState<any>({});
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [submitIndex, setSubmitIndex] = useState(0);

  const [originalData, setOriginalData] = useState(data);

  const schema: any = useMemo(
    () => ({
      firstName: {
        component: "TextField",
        validateOnBlur: true,
        validators: {
          required: {
            value: true,
            errorMessage: "Candidate's first name is required",
          },
        },
      },
      middleName: {
        component: "TextField",
        validateOnBlur: true,
        validators: {
          required: false,
        },
      },
      lastName: {
        component: "TextField",
        validateOnBlur: true,
        validators: {
          required: {
            value: true,
            errorMessage: "Candidate's last name is required",
          },
        },
      },
      emailAddress: {
        component: "TextField",
        validateOnBlur: true,
        validators: {
          required: {
            value: true,
            errorMessage: "Candidate's email address is required",
          },
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
      ////////console.log("HEY YOU")
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
    setSubmitIndex((prev) => prev + 1);

    console.log("THE ERRORS", errors);

    const isValid: boolean = await validateForm(
      schema,
      data,
      errors,
      setErrors
    );

    ////////console.log("isValid", isValid)

    let message;
    if (isValid == true) {
      setSubmissionLoading(true);

      //insert axios async submit function

      console.log("HERE PO");
      let response: any;
      response = await addCandidateToPosition(data);

      ////////////console.log("createdUser", createdUser);

      if (response) {
        ////////////console.log("YEAAA");
        message = response?.data.message;

        showToast(message, "success");
      } else {
        ////////////console.log("ELSA");
      }

      const retrievedPositionCandidate: any = await fetchAllPositionCandidates(
        data.positionID
      );
      // console.log("RETRIEVED ROLES", retrievedPositions);
      // setPositionList(retrievedIngredients?.data.list);

      setPositionObject(retrievedPositionCandidate.data);

      handleModalClose(true);
    }
  };

  const handleModalClose = (success?: boolean) => {
    //////////////console.log("WILL CLOSE")
    closeModal(0, () => {
      setErrors({});
      setData({ ...inputData, positionID: positionObject.position.positionID });
      onClose(success);
    });
  };

  const handleDynamicFieldChange = useCallback(
    (
      value: any,
      name: string,
      index: number,
      fieldName: string,
      component: string,
      errors?: any
    ) => {
      ////////////////////////////console.log("value", value)
      ////////////////////////////console.log("index", index)
      ////////////////////////////console.log("fieldName", fieldName)
      ////////////////////////////console.log("component", component)

      ////////////////////////////console.log("name", name)

      handleDynamicFormControlChange(
        value,
        schema,
        data,
        setData,
        errors,
        setErrors,
        index,
        fieldName,
        component,
        name
      );
    },
    []
  );

  useEffect(() => {
    const loadData = async () => {
      console.log("THE DATA TO SET", data);
      setOriginalData(data);
    };

    loadData();
  }, []);

  return {
    //States
    errors,
    submissionLoading,
    shouldClose,
    submitIndex,
    //Refs
    elRef,

    //Functions
    handleChange,
    handleSubmit,
    handleModalClose,
    handleDynamicFieldChange,
  };
};

export default useFormModal;
