import styled from "styled-components";

export const SLi = styled.li<{
    $customStyle?: any
}>`
    ${({$customStyle}) =>  $customStyle}
`;