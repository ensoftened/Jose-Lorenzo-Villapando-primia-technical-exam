import styled from "styled-components";

export const RippleContainer = styled.div<{
  $duration?: number,
  $backgroundColor?: string
}>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.5;
    background-color: ${({$backgroundColor}) => $backgroundColor};
    animation-name: ripple;
    animation-duration: ${({$duration}) => $duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;