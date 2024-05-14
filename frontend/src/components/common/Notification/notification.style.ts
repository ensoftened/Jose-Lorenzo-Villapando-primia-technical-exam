import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const NotificationContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #42b883;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  z-index: 1000000;
  font-size: 12px;
  animation: ${slideIn} 0.1s ease-in-out forwards;
`;