import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { ModalClose, SModalCard, ModalHeader, ModalOverlay, SModalContent, SModalTitle } from "./modal.style";
import { CSSTransition } from "react-transition-group";
import { ModalContext } from "@contexts/ModalProvider";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
  style?: any;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, style }) => {
//////////////////////////////////////////////////////////////console.log("MODAL RENDERED")
    const ref = useRef<any>()


  const {
    shouldClose
  } = useContext(ModalContext)

  const shouldCloseUndefined = (shouldClose === undefined) || (shouldClose === null) || (shouldClose == false)
  return (
    <>
      {
        isOpen &&
            <ModalOverlay $isOpen={isOpen && shouldCloseUndefined}>
            <SModalCard  $isOpen={isOpen && shouldCloseUndefined} $customStyle={style} ref={ref}>
                <ModalHeader>
                <SModalTitle>{title}</SModalTitle>
                    <ModalClose onClick={onClose}>&times;</ModalClose>
                </ModalHeader>
                <SModalContent>{children}</SModalContent>
            </SModalCard>
          </ModalOverlay>
      }
    </>


  );
};

export default Modal;