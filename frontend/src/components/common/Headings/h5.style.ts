import styled from "styled-components";

export const SH5 = styled.div<{
  $customStyle: any;
}>`
  font-size: ${({ theme }) => theme.h5.fontSize};
  font-family: ${({ theme }) => theme.h5.fontFamily};
  font-weight: bold;
    letter-spacing: 1px;
font-family:Helvetica;
  ${({ $customStyle }) => $customStyle}
`;
