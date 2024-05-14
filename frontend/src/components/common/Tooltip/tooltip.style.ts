import styled from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipContent = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
  top: 125%;
  left: 50%;
  transform: translateX(-50%);
`;
