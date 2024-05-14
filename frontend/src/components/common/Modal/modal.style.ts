import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {

    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
        transform: translateY(0);
  }
  to {

        transform: translateY(-50px);
  }
`;


export const ModalOverlay = styled.div<{ $isOpen: boolean}>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999999999999;
  animation: ${(props) => (props.$isOpen == true ? fadeIn : fadeOut)} 0.2s ease-in;
`;



export const SModalCard = styled.div<{
  $customStyle?: any;
  $isOpen: boolean
}>`
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  //padding: 20px;
  border-radius: 5px;
  position: absolute;
  animation: ${(props) => (props.$isOpen == true ? slideIn : slideOut)} 0.2s ease-in;


  ${({$customStyle}) => {
    if($customStyle) return $customStyle

    return

  }}


`;

export const SModalContent = styled.div<{

}>`
  background: #fff;
  padding: 15px;
  font-size: 14px;

`;


export const ModalHeader = styled.div`
    border-bottom: 1px solid ${({theme}) => theme.neutral.lightest};
    position: relative;
    padding: 10px;
`;

export const SModalTitle = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    color: black;
    font-family: Roboto Regular;
    font-size: 14px;
`;

export const ModalClose = styled.button`
  display: flex;
  justify-content: flex-end;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
`;