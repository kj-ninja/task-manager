import { useCallback } from "react";

import { useModalStore } from "./modal.store";

interface ModalOptions {
  id?: string;
  group?: string;
  allowDuplicate?: boolean;
}

export const useModalManager = () => {
  const storeIsModalOpen = useModalStore((store) => store.isOpen);
  const storeClearAll = useModalStore((store) => store.clearAll);
  const storeOpenModal = useModalStore((store) => store.openModal);
  const storeClearGroup = useModalStore((store) => store.clearGroup);

  const openModal = useCallback(
    (content: React.ReactNode, options: ModalOptions = {}) => {
      const id = options.id || Math.random().toString(36);
      storeOpenModal(id, content, options.group, options.allowDuplicate);
    },
    [storeOpenModal]
  );

  const clearGroup = useCallback(
    (group: string) => {
      storeClearGroup(group);
    },
    [storeClearGroup]
  );

  const toggleModal = useCallback(
    (content: React.ReactNode, options: ModalOptions = {}) => {
      const id = options.id || Math.random().toString(36);
      if (storeIsModalOpen(id, options.group)) {
        storeClearAll();
      } else {
        storeOpenModal(id, content, options.group, options.allowDuplicate);
      }
    },
    [storeIsModalOpen, storeClearAll, storeOpenModal]
  );

  return {
    isModalOpen: storeIsModalOpen,
    openModal,
    toggleModal,
    closeModal: storeClearAll,
    clearAll: storeClearAll,
    clearGroup,
  };
};