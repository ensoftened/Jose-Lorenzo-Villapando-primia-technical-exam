import styled from "styled-components";

export const SImage = styled.img<{
    $customStyle?: any
}>`
  ${({$customStyle}) => $customStyle }
`;