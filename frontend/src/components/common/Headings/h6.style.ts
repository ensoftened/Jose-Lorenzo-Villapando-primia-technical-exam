import styled from "styled-components";

export const SH6 = styled.div<{
  $customStyle: any;
}>`
  font-size: ${({ theme }) => theme.h6.fontSize};
  font-family: ${({ theme }) => theme.h6.fontFamily};
  font-weight: bold;
font-family: Helvetica;
  ${({ $customStyle }) => $customStyle}
`;
