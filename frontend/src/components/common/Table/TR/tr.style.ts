import styled from "styled-components";

export const STR = styled.tr<{
    $customStyle?: any
}>`
    font-size: inherit;

    ${({$customStyle}) => $customStyle}

`;