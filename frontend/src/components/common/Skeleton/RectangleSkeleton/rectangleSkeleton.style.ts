import styled, { keyframes } from "styled-components";


const shimmerAnimation = keyframes`
  0% {
    background-position: 200%;
  }
  100% {
    background-position: -200%;
  }
`;


export const SSkeleton = styled.div<{

  $customStyle?: any
}>`
  width: 100%;
  height: 20px;
  border-radius: 4px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s linear infinite;
  display: inline-block;

  ${({$customStyle}) => $customStyle}
`;