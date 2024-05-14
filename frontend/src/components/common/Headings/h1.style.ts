import styled from "styled-components";

export const SH1 = styled.h1<{
  $customStyle: any;
}>`
  font-size: ${({ theme }) => theme.h1.fontSize};
  font-family: ${({ theme }) => theme.h1.fontFamily};
  font-weight: bold;
  letter-spacing: 1px;
  font-family: Helvetica;

  ${({ $customStyle }) => $customStyle}
`;
