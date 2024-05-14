import styled from "styled-components";

export const SH2 = styled.h2<{
  $customStyle: any;
}>`
  font-size: ${({ theme }) => theme.h2.fontSize};
  font-family: ${({ theme }) => theme.h2.fontFamily};
  font-weight: bold;
    letter-spacing: 1px;
font-family:Helvetica;
  ${({ $customStyle }) => $customStyle}
`;
