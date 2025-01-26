import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen
}: LoadingModalProps) => {
  return (
    <Modal hideCloseButton size="2xl" placement="center" isOpen={isOpen}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 bg-sky">
            <p>Redirecting..</p>
          </ModalHeader>

          <ModalBody className="">
            <div className="w-full flex justify-center flex-col items-center">
              <FaSpinner className="animate-spin text-5xl" />
              <p>Please wait.</p>
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
