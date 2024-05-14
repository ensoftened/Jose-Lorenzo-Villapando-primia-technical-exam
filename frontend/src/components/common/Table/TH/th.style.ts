import styled from "styled-components";

export const STH = styled.th`
    text-align: left;
    border-bottom: ${({theme}) => "2px solid" + theme.primary.lighter};
    font-size: inherit;
    padding: 10px 0px;
`;