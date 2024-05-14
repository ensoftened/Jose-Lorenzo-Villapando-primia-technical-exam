import { useEffect, useCallback, useMemo, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import inputData from "./FormModal/inputData";
import { toNumber } from "lodash";
import { fetchAllPositions } from "@services/positionService";
import generateQueryString from "@utils/generateQueryString";
import { Http2ServerResponse } from "http2";
import { ModalContext } from "@contexts/ModalProvider";
import { PositionProfileProps } from "./PositionProfile";
import {
  fetchAllPositionCandidates,
  hireCandidate,
} from "@services/positionCandidateService";
import { showToast } from "@utils/showToast";

const usePositionProfile = (props: PositionProfileProps) => {
  const {
    shouldModalShow,

    openModal,
    closeModal,
  }: any = useContext(ModalContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [positionList, setPositionList] = useState([]);
  const [itemsCount, setItemsCount] = useState();
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState();
  const [data, setData] = useState<any>(inputData);
  const [listLoading, setListLoading] = useState(true);
  const [mode, setMode] = useState("none");

  const [positionObject, setPositionObject] = useState<any>({});

  const {} = props;

  console.log("THE DATA", data);

  const handleCreateButtonClick = () => {
    setMode("create");
    openModal();
  };

  const handleModalClose = (success?: boolean) => {
    if (success) {
      setSearchData("");
      setDateTo("");
      setDateFrom("");
      setCurrentPage(1);
      navigate(generateQueryString({ page: 1 }));
    }
  };

  const handleHireBtnClick = async (candidate: any) => {
    console.log("CANDIDATE", candidate);
    let message = "";
    const response: any = await hireCandidate(candidate.id.toString());

    ////////////console.log("createdUser", createdUser);

    if (response) {
      ////////////console.log("YEAAA");
      message = response?.data.message;

      showToast(message, "success");
    }

    const retrievedPositionCandidate: any = await fetchAllPositionCandidates(
      data.positionID
    );
    // console.log("RETRIEVED ROLES", retrievedPositions);
    // setPositionList(retrievedIngredients?.data.list);

    setPositionObject(retrievedPositionCandidate.data);
  };
  useEffect(() => {
    document.title = "Position";
    const loadData = async () => {
      const parts = window.location.href.split("/");
      const key = parts[parts.length - 1];
      const response: any = await fetchAllPositionCandidates(key);
      console.log("RESPONSE", response)
      if (response) {
        setPositionObject(response.data);
        setData((prev: any) => {
          console.log("THE PREV", prev);
          return {
            ...prev,
            positionID: response.data.position.positionID,
          };
        });
      } else {
        alert("NO DATA");
      }
    };

    loadData();
  }, []);

  return {
    //States
    positionObject,
    setPositionObject,
    data,
    setData,
    //Functions

    handleCreateButtonClick,
    handleModalClose,
    handleHireBtnClick,
  };
};

export default usePositionProfile;
