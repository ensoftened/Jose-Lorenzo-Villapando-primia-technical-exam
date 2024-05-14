import styled, { css } from "styled-components";

export const SRow = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.neutral.lightest};
  padding: 0px 0px 0px 0;
  gap: 5px;
  height: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const SFormControlsColumn = styled.div`
  width: 100%;
  display: inline-block;
  ${(props) =>
    css`
      @media (min-width: 767px) {
        display: flex;
        flex-direction: row;
      }
    `};

  ${(props) =>
    css`
      @media (max-width: 766px) {
        display: inline-block;
      }
    `}; //background: red;
`;
export const SRelativeDiv = styled.div<{
  $size?: string;
}>`
  display: flex;
  justify-content: right;
  padding: 5px 0;
  width: 100%;
`;
export const SDeleteButtonDiv = styled.div<{
  $size?: string;
}>`
  display: flex;
  align-items: center;
`;

export const SAbsoluteDiv = styled.div<{
  $device: string;
}>`
  display: inline-block;
`;

export const SLabel = styled.div<{
  $customWidth?: string;
  $error?: string;
}>`
  color: ${({ theme }) => theme.neutral.dark};
  font-family: Helvetica;

  cursor: context-menu;
  font-size: 10px;
  font-weight: bold;
  //position: absolute;
  //left : 0px;
  //top :-5px;
  z-index: 0;
  transition: 0.15s;

  ${({ $error, theme }) => {
    let style = {};
    if ($error) {
      style = {
        ...style,
        color: theme.errorTheme.main,
        //padding: "5px"
      };
    }

    return style;
  }}
`;

export const SRowTitleIndex = styled.div`
  font-size: 12px;
  width: 100%;
  font-weight: bold;
  font-family: Roboto Regular;
  padding: 10px 2.5px;
  color: ${({ theme }) => theme.primary.main};
`;
