import Close from "../Icons/Close";
import { Button } from "./CloseButton.styled";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick}>
      <Close />
    </Button>
  );
};

export default CloseButton;
