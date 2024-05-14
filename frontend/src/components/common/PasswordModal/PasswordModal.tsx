import { DeviceContext } from "@App";
import React, {
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import usePasswordModal from "./usePasswordModal";
import Modal from "@common/Modal/Modal";
import FormControl from "@common/FormControl/FormControl";
import TextField2 from "@common/TextField/TextField2/TextField2";
import Button from "@common/Button/Button";
import { Div } from "@common/Div/Div";

export type PasswordModalProps = {
  isOpen: boolean;
  onClose?: any;
  title?: string;
  style?: any;
};

const PasswordModal = (props: PasswordModalProps) => {

  const { isOpen, onClose, title, style } = props;

  const {
    errors,
    submissionLoading,


    data,

    elRef,
    handleChange,
    handleSubmit,
    handleModalClose,
  } = usePasswordModal(props);
  const device = useContext(DeviceContext);

  const ref = useRef<any>();
  //////////////////console.log("PasswordModal RENDERED")

  useEffect(() => {}, []);

  return (
    <Modal
      title={"Please enter your password"}
      isOpen={isOpen}
      onClose={handleModalClose}
      style={style}
    >
      <form onSubmit={handleSubmit}>
        <FormControl
          ref={elRef}
          style={{ padding: "17px 2.5px" }}
          errorStyle={{ fontSize: "10px" }}
        >
          <TextField2
            error={errors["password"]}
            label={"Password"}
            name={"password"}
            onChange={handleChange}
            placeholder={"Enter password"}
            type={"password"}
            value={data.password}
          />
        </FormControl>

        <Div
          style={{ display: "flex", justifyContent: "right", width: "100%" }}
        >
          <Button
            size={"small"}
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

export default PasswordModal;
