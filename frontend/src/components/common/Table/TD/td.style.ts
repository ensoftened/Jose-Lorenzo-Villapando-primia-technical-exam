import styled from "styled-components";

export const STD = styled.td<{
  $style?: any;
  $customStyle?: any;
}>`
  border-bottom: ${({theme}) => "1px solid" + theme.neutral.lightest};
  padding: 7.5px 5px;
  font-size: inherit;
  border:0; 
  
  ${({$customStyle}) => $customStyle}


`;