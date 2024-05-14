import styled from "styled-components";

export const STable = styled.table<{
    $size?: string
    $customStyle?: any
}>`
    width: 100%;
    color: ${({theme}) => theme.neutral.dark};
    font-size: ${({$size}) => ($size == "small") ? "10px" : (($size == "medium") ? "16px" : "")};
   border-collapse:collapse;


    ${({$customStyle}) => $customStyle}
`;