import { ReactNode } from "react";
import { Offcanvas } from "react-bootstrap";

export default function ControlPanel({
  children,
  show,
  setShow,
}: {
  children: ReactNode;
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  return (
    <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Puzzle Controls</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}
