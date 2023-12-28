import { Form } from "react-bootstrap";

interface FontSelectorProps {
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FontSelector({
  name,
  value,
  onChange,
  label = "Font",
}: FontSelectorProps) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Select name={name} value={value} onChange={onChange}>
        <option value="Arial">Arial</option>
        <option value="Oswald">Oswald</option>
        <option value="Pinyon Script">Pinyon Script</option>
        <option value="Playfair Display">Playfair Display</option>
        <option value="Raleway">Raleway</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="cursive">System Cursive</option>
        <option value="sans-serif">System Sans</option>
        <option value="serif">System Serif</option>
      </Form.Select>
    </Form.Group>
  );
}
