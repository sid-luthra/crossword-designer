import { Col, Image, Row } from "react-bootstrap";
import useBackground from "../hooks/use-background";

const BACKGROUNDS = ["grass", "wood", "brick", "boxwood"];

export default function BackgroundSelect() {
  const { background, setBackground } = useBackground();

  return (
    <Row className="d-flex" xs={3}>
      <Col
        className={
          background.type === "transparent"
            ? "d-flex flex-column p-2 border border-primary border-3"
            : "d-flex flex-column p-2"
        }
      >
        <Image
          className="mx-auto mb-1"
          src={`/backgrounds/transparent.avif`}
          onClick={() => {
            setBackground("transparent");
          }}
          width={30}
          height={30}
        />
        <div className="text-center small text-muted">TRANSPARENT</div>
      </Col>
      {BACKGROUNDS.map((bg) => (
        <Col
          key={bg}
          className={
            bg === background.type
              ? "d-flex flex-column p-2 border border-primary border-3"
              : "d-flex flex-column p-2"
          }
        >
          <Image
            className="mx-auto mb-1"
            src={`/backgrounds/${bg}.jpg`}
            onClick={() => {
              setBackground(bg);
            }}
            width={30}
            height={30}
          />
          <div className="text-center small text-muted">{bg.toUpperCase()}</div>
        </Col>
      ))}
    </Row>
  );
}
