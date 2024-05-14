import styled from "styled-components";

export const SUl = styled.ul<{
    $customStyle?: any
}>`
    ${({$customStyle}) =>  $customStyle}
`;