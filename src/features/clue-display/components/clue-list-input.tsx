import { Form, Stack } from "react-bootstrap";
import RangeControlCombo from "../../../components/inputs/range-control-combo";
import useClueList from "../hooks/use-clue-list";
import FontSelector from "../../../components/inputs/font-selector";
import { TwitterPicker } from "react-color";

export default function ClueListInput() {
  const {
    heading,
    clueText,
    handleClueHeadingChange,
    setHeadingColor,
    handleClueTextChange,
    setClueTextColor,
    randomizeClues,
    setRandomizeClues,
    hideAnswers,
    setHideAnswers,
  } = useClueList();

  return (
    <Stack gap={2}>
      <div className="fw-bold">Clue Headings</div>
      <RangeControlCombo
        name="fontSize"
        label="Font Size"
        value={heading.fontSize}
        onChange={handleClueHeadingChange}
        max={300}
        min={10}
      />
      <FontSelector
        name="font"
        value={heading.font}
        onChange={handleClueHeadingChange}
      />
      <div>
        <p>Heading Color</p>
        <TwitterPicker
          color={heading.color}
          onChange={(color) => setHeadingColor(color.hex)}
        />
      </div>
      <div className="fw-bold">Clue Text</div>
      <RangeControlCombo
        name="fontSize"
        label="Font Size"
        value={clueText.fontSize}
        onChange={handleClueTextChange}
        max={100}
        min={10}
      />
      <FontSelector
        name="font"
        value={clueText.font}
        onChange={handleClueTextChange}
      />
      <div>
        <p>Heading Color</p>
        <TwitterPicker
          color={clueText.color}
          onChange={(color) => setClueTextColor(color.hex)}
        />
      </div>
      <div className="fw-bold">Options</div>
      <Form.Check
        checked={randomizeClues}
        label="Lorem Ipsum clues"
        onChange={(e) => setRandomizeClues(e.target.checked)}
      />
      <Form.Check
        checked={hideAnswers}
        label="Hide answers"
        onChange={(e) => setHideAnswers(e.target.checked)}
      />
    </Stack>
  );
}
