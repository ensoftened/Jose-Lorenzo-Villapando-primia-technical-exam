import { DeviceContext } from "@App";
import Button from "@common/Button/Button";
import { Div } from "@common/Div/Div";
import H4 from "@common/Headings/H4";
import { fetchAllPositionCandidates } from "@services/positionCandidateService";
import { theme } from "@style-helpers/theme";
import isObjectEmpty from "@utils/isObjectEmpty";
import React, {
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";
import usePositionProfile from "./usePositionProfile";
import FormModal from "./FormModal/FormModal";
import { ModalContext } from "@contexts/ModalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Span from "@common/Span/Span";

export type PositionProfileProps = {};

const PositionProfile = (props: PositionProfileProps) => {
  const device = useContext(DeviceContext);

  const { shouldModalShow: shouldFormModalShow } = useContext(ModalContext);

  const {
    positionObject,
    setPositionObject,
    data,
    setData,

    handleCreateButtonClick,
    handleModalClose,
    handleHireBtnClick,
  } = usePositionProfile(props);

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

        {isObjectEmpty(positionObject) == false ? (
          <Div>
            {" "}
            <Div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Div style={{ justifyContent: "left" }}>
                <H4
                  style={{
                    padding: "10px 0",
                    color: theme.neutral.dark,
                  }}
                >
                  {positionObject.position.positionName}
                </H4>
              </Div>
              <Div style={{ justifyContent: "right" }}>
                <Button onClick={handleCreateButtonClick} size={"small"}>
                  Add new candidate
                </Button>
              </Div>
            </Div>
            <Div
              style={{
                width: "100%",
              }}
            >
              {positionObject.positionCandidates.map((candidate: any) => {
                return (
                  <Div
                    style={{
                      backgroundColor: "white",
                      margin: "20px 0",
                      padding: "20px",
                      borderLeftWidth: "5px",
                      borderLeftColor: theme.secondary.main,
                      borderLeftStyle: "solid",

                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Div>
                      <Div
                        style={{
                          fontWeight: "bold",
                          color: theme.neutral.dark,
                        }}
                      >
                        {" "}
                        {candidate.firstName +
                          " " +
                          (candidate.middleName
                            ? candidate.middleName.charAt(0) + ". "
                            : "") +
                          candidate.lastName}
                      </Div>
                      <Div style={{ color: theme.neutral.light }}>
                        {candidate.emailAddress}
                      </Div>
                    </Div>

                    {candidate.isHired == 0 ? (
                      <Button
                        size={"small"}
                        variant={"text"}
                        theme={"secondary"}
                        style={{ fontWeight: "bold" }}
                        onClick={() => handleHireBtnClick(candidate)}
                      >
                        Hire this candidate
                      </Button>
                    ) : (
                      <Div
                        style={{
                          fontSize: "12px",
                          color: theme.okTheme.main,
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Span style={{ padding: "0 5px" }}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </Span>
                        Hired
                      </Div>
                    )}
                  </Div>
                );
              })}
            </Div>
          </Div>
        ) : (
          <>POSITION NOT FOUND</>
        )}

        {shouldFormModalShow[0] == true && (
          <FormModal
            isOpen={shouldFormModalShow[0]}
            onClose={handleModalClose}
            style={{ width: "500px" }}
            data={data}
            setData={setData}
            positionObject={positionObject}
            setPositionObject={setPositionObject}
          />
        )}
      </Div>
    </Div>
  );
};

export default PositionProfile;
