import { DeviceContext } from "@App";
import Button from "@common/Button/Button";
import FormControl from "@common/FormControl/FormControl";
import FormControlGroup from "@common/FormControlGroup/FormControlGroup";
import Modal from "@common/Modal/Modal";
import PhotoUploader from "@common/PhotoUploader/PhotoUploader";
import Select from "@common/Select/Select/Select";
import Select2 from "@common/Select/Select2/Select2";
import TextField from "@common/TextField/TextField/TextField";
import TextField2 from "@common/TextField/TextField2/TextField2";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useForm from "@hooks/useForm";
import { useLocationFields } from "@hooks/useLocationFields";
import { getAllRoles } from "@services/roleService";
import React, {
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";
import inputData from "./inputData";
import {
  checkIfUsernameIsTaken,
  createNewUser,
  editUser,
  getPaginatedUsers,
} from "@services/userService";
import useFormModal from "./useFormModal";
import CheckList from "@common/CheckList/CheckList";
import DynamicFields from "@common/DynamicFields/DynamicFields/DynamicFields";
import DynamicFields2 from "@common/DynamicFields/DynamicFields2/DynamicFields2";
import { ModalContext } from "@contexts/ModalProvider";
import { Div } from "@common/Div/Div";

export type FormModalProps = {
  isOpen: boolean;
  onClose: any;
  style?: any;
  data: any;
  setData: any;
  setPositionObject: any;
  positionObject: any;
};

const FormModal = (props: FormModalProps) => {
  const device = useContext(DeviceContext);

  const { isOpen, style, data, } = props;

  const {
    //States
    errors,
    shouldClose,
    submissionLoading,
    submitIndex,

    //Refs
    elRef,

    //Functions
    handleChange,
    handleSubmit,
    handleModalClose,
    handleDynamicFieldChange,
  } = useFormModal(props);

  //console.log("DATA", data)

  return (
    <Modal
      title={"Add new candidate"}
      isOpen={isOpen}
      onClose={handleModalClose}
      style={style}
    >
      <form onSubmit={handleSubmit}>
        {/* Fields */}

        <FormControl
          ref={elRef}
          style={{ width: "100%", padding: "17px 2.5px" }}
        >
          <TextField2
            error={errors["firstName"]}
            label={"First Name"}
            name={"firstName"}
            onChange={handleChange}
            placeholder={"Enter Candidate's First Name"}
            type={"text"}
            value={data.firstName}
          />
        </FormControl>
        <FormControl
          ref={elRef}
          style={{ width: "100%", padding: "17px 2.5px" }}
        >
          <TextField2
            error={errors["middleName"]}
            label={"Middle Name"}
            name={"middleName"}
            onChange={handleChange}
            placeholder={"Enter Candidate's Middle Name"}
            type={"text"}
            value={data.middleName}
          />
        </FormControl>
        <FormControl
          ref={elRef}
          style={{ width: "100%", padding: "17px 2.5px" }}
        >
          <TextField2
            error={errors["lastName"]}
            label={"Last Name"}
            name={"lastName"}
            onChange={handleChange}
            placeholder={"Enter Candidate's Last Name"}
            type={"text"}
            value={data.lastName}
          />
        </FormControl>
        <FormControl
          ref={elRef}
          style={{ width: "100%", padding: "17px 2.5px" }}
        >
          <TextField2
            error={errors["emailAddress"]}
            label={"Email Address"}
            name={"emailAddress"}
            onChange={handleChange}
            placeholder={"Enter Candidate's Email Address"}
            type={"text"}
            value={data.emailAddress}
          />
        </FormControl>

        {/* Buttons */}
        <Div
          style={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            textAlign: "right",
            gap: "5px",
          }}
        >
          <Button
            theme={"primary"}
            variant={"outlined"}
            size={"small"}
            onClick={handleModalClose}
          >
            Cancel
          </Button>

          <Button
            theme={"primary"}
            variant={"contained"}
            size={"small"}
            endAdornment={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={handleSubmit}
            loading={submissionLoading}
          >
            Submit
          </Button>
        </Div>
      </form>
    </Modal>
  );
};

export default FormModal;
