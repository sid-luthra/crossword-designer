import { Form } from "react-bootstrap";
import useLayout from "../hooks/use-layout";

const LAYOUTS = [
  { label: "Side-by-side", value: "side-by-side" },
  { label: "Side-by-side (Stacked)", value: "side-by-side-stacked" },
  { label: "Newspaper", value: "newspaper" },
  { label: "Newspaper (Alt)", value: "newspaper-alt" },
];

export default function LayoutInput() {
  const { layout, handleLayoutChange } = useLayout();

  return (
    <Form.Group>
      <Form.Label>Select Layout</Form.Label>
      <Form.Select
        id="layout"
        value={layout}
        onChange={handleLayoutChange}
        name="layout"
      >
        {LAYOUTS.map((layout) => (
          <option key={layout.value} value={layout.value}>
            {layout.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
