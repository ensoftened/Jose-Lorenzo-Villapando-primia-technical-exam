import styled from "styled-components";

export const STHead = styled.thead<{
    $customStyle?: any
}>`
    width: 100%;
    color: ${({theme}) => theme.neutral.dark};
    font-size: inherit;


    ${({$customStyle}) => $customStyle}
`;