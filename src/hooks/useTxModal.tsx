import TxModal from "components/modal";
import { ReactNode, createContext, useContext, useState } from "react";

interface ITxModalContextType {
  showModal: boolean;
  openModal: (content: ReactNode, onConfirm?: ()=> void, onCancel?: ()=> void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ITxModalContextType | undefined>(undefined);

interface IProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: IProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [onConfirm, setOnConfirm] = useState<() => void>();
  const [onCancel, setOnCancel] = useState<() => void>();

  const openModal = (content: ReactNode, onConfirm?: () => void, onCancel?: () => void) => {
    setModalContent(content);
    setShowModal(true);
    if (onConfirm) setOnConfirm(() => onConfirm);
    if (onCancel) setOnCancel(() => onCancel);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
    setOnConfirm(undefined);
    setOnCancel(undefined);
  };

  return (
    <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
      {showModal && (
        <TxModal onConfirm={onConfirm} onCancel={onCancel}>
          {modalContent}
        </TxModal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};