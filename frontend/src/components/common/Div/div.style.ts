import styled from "styled-components";

export const SDiv = styled.div<{
    $customStyle?: any
}>`
    ${({$customStyle}) =>  $customStyle}
`;