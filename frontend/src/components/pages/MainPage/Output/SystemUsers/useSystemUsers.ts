import { useEffect, useCallback, useMemo, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { toNumber } from "lodash";

import generateQueryString from "@utils/generateQueryString";
import { SystemUsersProps } from "./SystemUsers";
import { ModalContext } from "@contexts/ModalProvider";
import { fetchAllSystemUsers } from "@services/systemUserService";

const useSystemUsers = (props: SystemUsersProps) => {
  const {
    shouldModalShow,

    openModal,
    closeModal,
  }: any = useContext(ModalContext);
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);

  const [tableLoading, setTableLoading] = useState(true);

  const {} = props;

  useEffect(() => {
    document.title = "System Users";
    const loadData = async () => {
      const response: any = await fetchAllSystemUsers();

      setUserList(response.data);
      setTableLoading(false);
    };

    loadData();
  }, []);

  return {
    //States
    userList,
    setUserList,
    tableLoading,
  };
};

export default useSystemUsers;
