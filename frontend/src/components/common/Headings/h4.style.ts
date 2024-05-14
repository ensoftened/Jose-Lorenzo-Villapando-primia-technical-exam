import styled from "styled-components";

export const SH4 = styled.div<{
  $customStyle: any;
}>`
  font-size: ${({ theme }) => theme.h4.fontSize};
  font-family: ${({ theme }) => theme.h4.fontFamily};
  font-weight: bold;
    letter-spacing: 1px;
font-family:Helvetica;
  ${({ $customStyle }) => $customStyle}
`;
