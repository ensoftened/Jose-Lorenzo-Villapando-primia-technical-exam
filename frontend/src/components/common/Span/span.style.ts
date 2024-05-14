import styled from "styled-components";

export const SSpan = styled.span<{$customStyle?: any}>`
    ${({$customStyle}) => $customStyle }
`;