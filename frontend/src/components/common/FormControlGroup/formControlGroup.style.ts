import styled from "styled-components";

export const SMainDiv = styled.div`
background-color: white;
`;
export const SCol1 = styled.div`
    grid-area: 1 / 1 / 6 / 2;
    margin-right: 15px;
`;
export const SCol2 = styled.div`
    grid-area: 1 / 2 / 2 / 10
`;

export const SLabel = styled.div<{
    $size?: string
}>`
    margin-top: ${({$size}) => (($size=="small") ? "23px" : (($size=="medium") ? "30px" : "") )};
    padding:  5px;
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}) => theme.neutral.dark};
    font-family: Roboto Regular;
    border-bottom: 1px ${({theme}) => theme.neutral.lighter } dashed;
`;