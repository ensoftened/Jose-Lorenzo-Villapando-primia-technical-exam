import { useEffect, useCallback, useMemo, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import inputData from "./FormModal/inputData";
import { toNumber } from "lodash";
import {
  fetchAllPositions,
  searchIngredients,
} from "@services/positionService";
import generateQueryString from "@utils/generateQueryString";
import userFormData from "@test-data/userFormData";
import { Http2ServerResponse } from "http2";
import { ManagePositionsProps } from "./ManagePositions";
import { ModalContext } from "@contexts/ModalProvider";

const useManagePositions = (props: ManagePositionsProps) => {
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

  const {} = props;

  const handlePositionItemClick = (position: any) => {
    console.log(
      "REF",
      `${process.env.REACT_APP_CLIENT_URL}position/${position.position_id}`
    );
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}position/${position.position_id}`;
  };

  const handlePageChange = async (page: number) => {
    console.log("CLICKED", page);
    navigate(
      generateQueryString({
        search: searchData,
        dateFrom,
        dateTo,
        page: page.toString(),
      })
    );
  };

  const handleSearch = useCallback(
    async (event: any) => {
      if (event.key == "Enter") {
        //////////////////////////console.log("ENTERED")
        if (searchData === "" && dateFrom === null && dateTo === null) {
          navigate("");
        } else {
          navigate(
            generateQueryString({ search: searchData, dateFrom, dateTo })
          );
        }
      }
    },
    [dateFrom, dateTo, searchData]
  );

  const handleSearchDataChange = (value: any) => {
    setSearchData(value);
  };

  const handleDateRangeChange = (value: string, name: string) => {
    if (value) {
      const dateParts = value.split("/");
      const month = dateParts[0];
      const day = dateParts[1];
      const year = dateParts[2];

      const dateObj = new Date(+year, +month - 1, +day, +"00", +"00", +"00");

      if (name == "dateFrom") {
        setDateFrom(value);

        navigate(
          generateQueryString({
            search: searchData,
            dateFrom: dateObj.toISOString(),
            dateTo,
          })
        );
      } else {
        setDateTo(value);
        ////////////////////console.log("date from", dateFrom)
        navigate(
          generateQueryString({
            search: searchData,
            dateFrom,
            dateTo: dateObj.toISOString(),
          })
        );
      }
    }
  };

  const handleResetButtonClick = () => {
    setSearchData("");
    setDateTo("");
    setDateFrom("");
    navigate(generateQueryString({}));
  };

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

  const handleEditButtonClick = (index: number) => {
    setMode("edit");
    const ingredient: any = positionList[index];

    console.log("EDIT DATA", positionList[index]);
    const reshapedAliases = ingredient?.aliases.map((alias: any) => {
      return { alias };
    });

    setData({
      _id: ingredient._id,
      ingredientName: ingredient.ingredientName,
      translation: ingredient.translation,
      aliases: reshapedAliases,
    });

    console.log("RESHAPED ingredient", ingredient);

    openModal();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        ////////////console.log("LLOAD DATA")

        const response: any = await fetchAllPositions();

        console.log("THE RESPONSE", response.data);

        setPositionList(response.data);
        setListLoading(false);
      } catch (error) {
        ////////////console.log  (error)
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    document.title = "Manage Positions";
  }, []);

  return {
    //States
    searchParams,
    positionList,
    setPositionList,
    itemsCount,
    dateFrom,
    dateTo,
    searchData,
    currentPage,
    setCurrentPage,
    pageSize,
    data,
    setData,
    listLoading,
    mode,

    //Functions
    handlePageChange,
    handleSearch,
    handleSearchDataChange,
    handleDateRangeChange,
    handleResetButtonClick,
    handleCreateButtonClick,
    handleModalClose,
    handleEditButtonClick,
    handlePositionItemClick,
  };
};

export default useManagePositions;
