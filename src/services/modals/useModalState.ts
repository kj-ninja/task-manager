import { useCallback } from "react";

import { useModalContext } from "./Modal.context";
import { useModalStore } from "./modal.store";

interface CloseModalOptions {
  delay?: number;
}

export function useModalState() {
  const { id } = useModalContext();

  const modalsQueue = useModalStore((store) => store.modalsQueue);
  const closeModalStore = useModalStore((store) => store.closeModal);
  const clearModal = useModalStore((store) => store.clearModal);

  const modalState = modalsQueue.find((modal) => modal.id === id);
  const isOpen = modalState?.open ?? false;
  const modalGroup = modalState?.group;

  const closeModal = useCallback(
    (options?: CloseModalOptions) => {
      closeModalStore(id);

      if (options?.delay) {
        setTimeout(() => {
          clearModal(id);
        }, options.delay);
      } else {
        clearModal(id);
      }
    },
    [id, closeModalStore, clearModal]
  );

  return {
    isOpen,
    closeModal,
    group: modalGroup,
  };
}
