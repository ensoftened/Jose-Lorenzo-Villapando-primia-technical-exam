import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";

import _ from "lodash";
import {
  SButton,
  SCol1,
  SCol2,
  SMainDiv,
  SPageButtonDiv,
} from "./pagination.style";

import { Div } from "@common/Div/Div";

const Pagination = (props: any) => {
  //////////////////////////////////////////////////////////////////////////////////////console.log  ('Pagination Component Rendered')
  const {
    itemsCount,
    pageSize,
    onPageChange,
    currentPage,
    size,
    onPrevClick,
    onNextClick,
    loading,
    objectListCount,
  } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  ////////////////////console.log("PAGESCOUNT", pagesCount);

  useEffect(() => {
    document.title = "";
  }, []);

  const handleNextClick = () => {
    if (currentPage < pagesCount) onPageChange(Number(currentPage) + 1);
  };

  const handlePrevClick = () => {
    if (currentPage <= pagesCount) onPageChange(Number(currentPage) - 1);
  };

  let pages = _.range(1, pagesCount + 1);

  if (pagesCount > 5) {
    if (currentPage < 3) {
      pages = _.range(1, 6);
    } else if (currentPage > 2 && currentPage < pagesCount - 1) {
      pages = _.range(currentPage - 2, currentPage + 3);
    } else {
      pages = _.range(pagesCount - 4, pagesCount + 1);
    }
  }

  //const { } = usePagination(props)

  if (pagesCount === 1) return null;
  return (
    <SMainDiv>
      {loading == false && objectListCount > 0 && (
        <>
          <SCol1 $size={size}>
            <>
              Showing{" "}
              {currentPage == 1 ? 1 : pageSize * currentPage - (pageSize - 1)}-
              {pageSize * currentPage > itemsCount
                ? itemsCount
                : pageSize * currentPage}{" "}
              of {itemsCount} entries
            </>
          </SCol1>

          <SCol2 $size={size}>
            {pagesCount > 1 && currentPage > 1 && (
              <SButton onClick={handlePrevClick}>Prev</SButton>
            )}

            {pagesCount > 5 && currentPage > 3 && (
              <SPageButtonDiv>
                <SButton $size={size} onClick={() => onPageChange(1)}>
                  1
                </SButton>

                {(pagesCount != 7 || currentPage != 4) && <>...</>}
              </SPageButtonDiv>
            )}

            {pages.map((page) => {
              return (
                <SButton
                  $size={size}
                  key={page}
                  $active={currentPage == page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </SButton>
              );
            })}

            {pagesCount > 5 && currentPage < pagesCount - 2 && (
              <Div style={{ display: "inline-block" }}>
                {(pagesCount != 7 || currentPage != 4) && <>...</>}

                <SButton
                  disabled={false}
                  $size={size}
                  onClick={() => onPageChange(pagesCount)}
                >
                  {pagesCount}
                </SButton>
              </Div>
            )}

            {pagesCount > 1 && currentPage < pagesCount && (
              <SButton $size={size} onClick={handleNextClick}>
                Next
              </SButton>
            )}
          </SCol2>
        </>
      )}
    </SMainDiv>
  );
};

Pagination.defaultProps = {
  size: "small",
};

export default Pagination;
