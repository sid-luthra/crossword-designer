import { Form, Stack } from "react-bootstrap";
import useTitle from "../hooks/use-title";
import RangeControlCombo from "../../../components/inputs/range-control-combo";
import FontSelector from "../../../components/inputs/font-selector";
import { TwitterPicker } from "react-color";

export default function TitleInput() {
  const { title, handleTitleChange, setTitleColor } = useTitle();

  return (
    <Stack gap={2}>
      <div className="fw-bold">Title</div>
      <Form.Group>
        <Form.Label>Text</Form.Label>
        <Form.Control
          id="title"
          name="text"
          type="text"
          value={title.text}
          onChange={handleTitleChange}
        />
      </Form.Group>
      <RangeControlCombo
        name="fontSize"
        label="Font Size"
        value={title.fontSize}
        onChange={handleTitleChange}
        max={500}
        min={10}
      />
      <FontSelector
        name="font"
        value={title.font}
        onChange={handleTitleChange}
        label="Title Font"
      />
      <div>
        <p>Title Color</p>
        <TwitterPicker
          color={title.color}
          onChange={(color) => setTitleColor(color.hex)}
        />
      </div>
      <RangeControlCombo
        name="marginBottomInches"
        label="Margin Bottom (Inches)"
        value={title.marginBottomInches}
        onChange={handleTitleChange}
        max={10}
        min={0}
        step={0.25}
      />
    </Stack>
  );
}
