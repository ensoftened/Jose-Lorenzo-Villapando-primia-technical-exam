import styled from "styled-components";

export const SH3 = styled.div<{
    $customStyle: any
}>`
    font-size: ${({theme}) => theme.h3.fontSize};
    font-family: ${({theme}) => theme.h3.fontFamily};
    font-weight: bold;
    letter-spacing: 1px;
font-family:Helvetica;
    ${({$customStyle}) => $customStyle }
`;