import React, { useEffect, useRef } from "react";

import { ModalContext } from "./Modal.context";
import { useModalStore } from "./modal.store";

function ModalHostComp() {
  const modalsQueue = useModalStore((store) => store.modalsQueue);
  const clearAll = useModalStore((store) => store.clearAll);

  const canClearAll = useRef(false);

  useEffect(() => {
    canClearAll.current = true;
  }, []);

  useEffect(() => {
    return () => {
      // Clear all modals when the component unmounts
      if (canClearAll.current) {
        clearAll();
        canClearAll.current = false;
      }
    };
  }, [clearAll]);

  const currentGroup = modalsQueue[0]?.group;

  // Show all modals in the same group, or just the first modal if no group
  const visibleModals = currentGroup
    ? modalsQueue.filter((modal) => modal.group === currentGroup)
    : modalsQueue.slice(0, 1);

  return (
    <>
      {visibleModals.map(({ id, content }) => (
        <ModalContext.Provider key={id} value={{ id }}>
          {content}
        </ModalContext.Provider>
      ))}
    </>
  );
}

export const ModalHost = React.memo(ModalHostComp);
