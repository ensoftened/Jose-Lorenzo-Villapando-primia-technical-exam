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
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import userFormData from "@test-data/userFormData";
import CircleSkeleton from "@common/Skeleton/CircleSkeleton/CircleSkeleton";
import RectangleSkeleton from "@common/Skeleton/RectangleSkeleton/RectangleSkeleton";
import NoDataImage1 from "@static-images/No-Data-Placeholders/no-data-1.png";
import Image from "@common/Image/Image";

import H6 from "@common/Headings/H6";

import { ModalContext } from "@contexts/ModalProvider";
import useWindowSize from "@hooks/useWindowSize";
import useSystemUsers from "./useSystemUsers";

export type SystemUsersProps = {};

const SystemUsers = (props: SystemUsersProps) => {
  const device = useContext(DeviceContext);
  const { windowSize }: any = useWindowSize();

  console.log("WINDOWSIZE", windowSize);

  const { shouldModalShow: shouldFormModalShow } = useContext(ModalContext);
  //States and functions from logic
  const {
    //States

    userList,
    setUserList,

    tableLoading,

    //Functions
  } = useSystemUsers(props);

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
          boxShadow: "0px 0px 6px -1px rgba(0,0,0,0.4)",
          gridArea: "1 / 1 / 2 / 2",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        {/* Page Title */}
        <H4 style={{ padding: "10px 0", color: theme.neutral.dark }}>
          System Users
        </H4>

        {/* Header */}

        {/* Table */}
        <Table style={{ fontSize: "10px" }}>
          <TBody>
            <TR>
              <TH>POSITION</TH>
              <TH>EMPLOYEE'S NAME</TH>
              <TH>EMAIL ADDRESS</TH>
              <TH>DATE HIRED</TH>
            </TR>

            {
              //Loading
              tableLoading == true ? (
                <>
                  {Array(3)
                    .fill(0)
                    .map((item: any, index: number) => {
                      return (
                        <TR>
                          {
                            <>
                              {/* Name  */}

                              <TD>
                                <RectangleSkeleton />
                              </TD>

                              <TD>
                                <RectangleSkeleton />
                              </TD>

                              <TD>
                                <RectangleSkeleton />
                              </TD>

                              <TD>
                                <RectangleSkeleton />
                              </TD>

         
                            </>
                          }
                        </TR>
                      );
                    })}
                </>
              ) : (
                //Not Loading
                <>
                  {userList.length > 0 && (
                    <>
                      {userList.map((item: any, index: number) => {
                        const {
                          positionName,
                          firstName,
                          middleName,
                          lastName,
                          emailAddress,
                          dateHired,
                        } = item;
                        return (
                          <TR
                            style={{
                              borderBottom:
                                "2px solid " + theme.neutral.lightest,
                            }}
                          >
                            <TD>{positionName}</TD>
                            <TD>
                              {" "}
                              {firstName +
                                " " +
                                (middleName
                                  ? middleName.charAt(0) + ". "
                                  : "") +
                                lastName}
                            </TD>
                            <TD>{emailAddress}</TD>
                            <TD><Div style={{fontWeight: "bold"}}>{formatDateTime(dateHired).convertedDate}</Div><Div>{formatDateTime(dateHired).convertedTime}</Div></TD>

                            {/* EDIT BUTTON */}
                          </TR>
                        );
                      })}
                    </>
                  )}
                </>
              )
            }
          </TBody>
        </Table>

        {
          //If object list is empty
          tableLoading == false && userList.length <= 0 && (
            <Div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Image style={{}} src={NoDataImage1} height={500} />

              <H6
                style={{
                  color: theme.neutral.dark,
                }}
              >
                No results found
              </H6>

              <H6
                style={{
                  color: theme.neutral.dark,
                  fontWeight: "normal",
                }}
              >
                We can't find the user you're looking for
              </H6>
            </Div>
          )
        }

        {/* FORM MODAL */}
      </Div>
    </Div>
  );
};

export default SystemUsers;
