import { ChangeEvent } from "react";
import { Row, Col, Form } from "react-bootstrap";

interface RangeControlComboProps {
  name: string;
  label?: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  max: number;
  min: number;
  step?: number;
}

export default function RangeControlCombo({
  name,
  label,
  value,
  onChange,
  max,
  min,
  step = 1,
}: RangeControlComboProps) {
  return (
    <Form.Group>
      <Form.Label>{label} </Form.Label>
      <Row className="gx-2">
        <Col xs={9} className="d-flex align-items-center">
          <Form.Range
            id={`${name}-range`}
            name={name}
            className="flex-grow-4"
            value={value}
            onChange={onChange}
            max={max}
            min={min}
            step={step}
          />
        </Col>
        <Col>
          <Form.Control
            id={`${name}-input`}
            name={name}
            className="flex-grow-1"
            type="number"
            value={value}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}
