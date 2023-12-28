import { Form, InputGroup, Stack } from "react-bootstrap";
import usePuzzleDisplay from "../hooks/use-puzzle-display";
import BackgroundSelect from "../../background/components/background-select";
import LayoutInput from "../../layouts/components/layout-input";

export default function PuzzleInput() {
  const { presets, puzzleBoard, handleDimsChange, handlePaddingChange } =
    usePuzzleDisplay();

  return (
    <Stack gap={2}>
      <div className="fw-bold">Puzzle Layout</div>
      <Form.Group>
        <Form.Label>Puzzle Size</Form.Label>
        <Form.Select
          id="puzzle-size"
          value={puzzleBoard.label}
          onChange={handleDimsChange}
        >
          {presets.map((preset) => (
            <option key={preset.label} value={preset.label}>
              {preset.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <LayoutInput />
      <Form.Group>
        <Form.Label>Padding</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            id="puzzle-padding"
            value={puzzleBoard.paddingInches}
            onChange={handlePaddingChange}
          />
          <InputGroup.Text>inches</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <BackgroundSelect />
    </Stack>
  );
}
