import type { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  id: string;
  group?: string;
  open: boolean;
  content: ReactNode;
}

interface ModalStoreState {
  modalsQueue: ModalState[];
}

interface ModalStoreActions {
  isOpen: (id: string, group?: string) => boolean;
  openModal: (id: string, component: ReactNode, group?: string, allowDuplicate?: boolean) => void;
  closeModal: (id: string) => void;
  clearModal: (id: string) => void;
  clearAll: () => void;
  clearGroup: (group: string) => void;
}

export const useModalStore = create<ModalStoreState & ModalStoreActions>((set, get) => ({
  modalsQueue: [],

  openModal: (id, content, group = "default", allowDuplicate = false) => {
    set((state) => {
      if (!allowDuplicate) {
        const existingModalIndex = state.modalsQueue.findIndex((modal) => modal.id === id);
        if (existingModalIndex !== -1) {
          const updatedQueue = [...state.modalsQueue];
          updatedQueue[existingModalIndex] = { id, content, open: true, group };
          return { modalsQueue: updatedQueue };
        }
      }

      const newModal: ModalState = { id, content, open: true, group };
      return { modalsQueue: [newModal, ...state.modalsQueue] };
    });
  },

  isOpen: (id, group = "default") => {
    return get().modalsQueue.some((modal) => modal.id === id && modal.group === group && modal.open);
  },

  closeModal: (id) => {
    set((state) => ({
      modalsQueue: state.modalsQueue.map((modal) => (modal.id === id ? { ...modal, open: false } : modal)),
    }));
  },

  clearModal: (id) => {
    set((state) => ({
      modalsQueue: state.modalsQueue.filter((modal) => modal.id !== id),
    }));
  },

  clearAll: () => {
    set({ modalsQueue: [] });
  },

  clearGroup: (group) => {
    set((state) => ({
      modalsQueue: state.modalsQueue.filter((modal) => modal.group !== group),
    }));
  },
}));