import { useEffect } from "react";
import {
  actOnEscapeKeydown,
  disablePageScroll,
  enablePageScroll,
} from "../../browser-utils";
import { Box, ButtonGroup, Overlay } from "./Dialog.styled";

const Dialog = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  useEffect(() => {
    actOnEscapeKeydown(onCancel, true);
    disablePageScroll();

    return () => {
      actOnEscapeKeydown(onCancel, false);
      enablePageScroll();
    };
  }, [onCancel]);

  return (
    <Overlay
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <Box>
        Confirmer l'action ?
        <ButtonGroup>
          <button onClick={onCancel}>Annuler</button>
          <button onClick={onConfirm}>Confirmer</button>
        </ButtonGroup>
      </Box>
    </Overlay>
  );
};

export default Dialog;
