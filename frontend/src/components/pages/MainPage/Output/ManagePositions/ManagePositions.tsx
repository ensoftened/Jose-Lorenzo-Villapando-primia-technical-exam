import { DeviceContext } from "@App";
import Avatar from "@common/Avatar/Avatar";
import Button from "@common/Button/Button";
import DatePicker from "@common/DatePicker/DatePicker/DatePicker";
import DatePicker2 from "@common/DatePicker/DatePicker2/DatePicker2";
import { Div } from "@common/Div/Div";
import H3 from "@common/Headings/H3";
import H4 from "@common/Headings/H4";
import IconButton from "@common/IconButton/IconButton";
import Modal from "@common/Modal/Modal";
import Pagination from "@common/Pagination/Pagination";
import TBody from "@common/Table/TBody/TBody";
import TD from "@common/Table/TD/TD";
import TH from "@common/Table/TH/TH";
import TR from "@common/Table/TR/TR";
import Table from "@common/Table/Table/Table";
import TextField from "@common/TextField/TextField/TextField";
import TextField2 from "@common/TextField/TextField2/TextField2";
import {
  faDownload,
  faEdit,
  faPlus,
  faRefresh,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPaginatedUsers, searchUsers } from "@services/userService";
import { theme } from "@style-helpers/theme";
import { formatDateTime } from "@utils/date-formatting/formatDateTime";
import generateQueryString from "@utils/generateQueryString";
import { toNumber } from "lodash";
import React, {
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import FormModal from "./FormModal/FormModal";
import inputData from "./FormModal/inputData";
import userFormData from "@test-data/userFormData";
import CircleSkeleton from "@common/Skeleton/CircleSkeleton/CircleSkeleton";
import RectangleSkeleton from "@common/Skeleton/RectangleSkeleton/RectangleSkeleton";
import NoDataImage1 from "@static-images/No-Data-Placeholders/no-data-1.png";
import Image from "@common/Image/Image";
import H2 from "@common/Headings/H2";
import H5 from "@common/Headings/H5";
import H6 from "@common/Headings/H6";

import Notification from "@common/Notification/Notification";
import isObjectEmpty from "@utils/isObjectEmpty";
import useManagePositions from "./useManagePositions";
import Span from "@common/Span/Span";
import { ModalContext } from "@contexts/ModalProvider";
import useWindowSize from "@hooks/useWindowSize";

export type ManagePositionsProps = {};

const ManagePositions = (props: ManagePositionsProps) => {
  const device = useContext(DeviceContext);
  const { windowSize }: any = useWindowSize();

  console.log("WINDOWSIZE", windowSize);

  const { shouldModalShow: shouldFormModalShow } = useContext(ModalContext);
  //States and functions from logic
  const {
    //States

    positionList,
    setPositionList,

    data,
    setData,
    listLoading,
    mode,

    //Functions

    handleCreateButtonClick,
    handleModalClose,

    handlePositionItemClick,
  } = useManagePositions(props);

  console.log("POSITION LIST", positionList);

  return (
    <Div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        gridColumnGap: "0px",
        gridRowGap: "0px",
        minHeight: "inherit",
      }}
    >
      <Div
        style={{
          padding: "20px",

          gridArea: "1 / 1 / 2 / 2",

          borderRadius: "5px",
        }}
      >
        {/* Page Title */}
        <H4 style={{ padding: "10px 0", color: theme.neutral.dark }}>
          Manage Positions
        </H4>

        {/* Header */}
        <Div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "1fr",
            width: "100%",
            padding: "10px 0",
          }}
        >
          <Div
            style={{
              gridArea: "1/7/2/9",
              padding: "10px 5px",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button onClick={handleCreateButtonClick} size={"small"}>
              Create a new position
            </Button>
          </Div>
        </Div>

        <Div style={{width: "100%"}}>
          {/* Table */}
          {listLoading == true ? (
            <></>
          ) : (
            <>
              {positionList.length > 0 && (
                <>
                  {positionList.map((position: any, index: number) => {
                    return (
                      <Div
                        style={{
                          backgroundColor: "white",
                          margin: "20px 0",
                          padding: "20px",
                          borderLeftWidth: "5px",
                          borderLeftColor: theme.primary.main,
                          borderLeftStyle: "solid",
                          fontWeight: "bold",
                          color: theme.neutral.dark,
                          cursor: "pointer",
                        }}

                        onClick={() => handlePositionItemClick(position)}
                      >
                        {position.position_name}
                      </Div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </Div>

        {/* FORM MODAL */}
        {shouldFormModalShow[0] == true && (
          <FormModal
            isOpen={shouldFormModalShow[0]}
            onClose={handleModalClose}
            style={{ width: "500px" }}
            data={data}
            setData={setData}
            setPositionList={setPositionList}
            positionList={positionList}
            mode={mode}
          />
        )}
      </Div>
    </Div>
  );
};

export default ManagePositions;
