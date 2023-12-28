import { Button } from "react-bootstrap";

export default function ControlPanelButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="light"
      className="position-absolute top-0 end-0 m-3"
    >
      Settings
    </Button>
  );
}
