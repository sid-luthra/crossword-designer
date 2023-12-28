import { Stack } from "react-bootstrap";

import useGridDisplay from "../hooks/use-grid-display";
import RangeControlCombo from "../../../components/inputs/range-control-combo";
import { TwitterPicker } from "react-color";

export default function GridDisplayInput() {
  const { gridDisplay, handleGridDisplayChange, changeGridValue } =
    useGridDisplay();

  return (
    <Stack gap={2}>
      <div className="fw-bold">Grid Layout</div>
      <RangeControlCombo
        name="percentWidth"
        label="Grid Width"
        value={gridDisplay.percentWidth}
        onChange={handleGridDisplayChange}
        max={100}
        min={0}
        step={5}
      />
      <RangeControlCombo
        name="percentHeight"
        label="Grid Height"
        value={gridDisplay.percentHeight}
        onChange={handleGridDisplayChange}
        max={100}
        min={0}
        step={5}
      />
      <RangeControlCombo
        name="marginRightInches"
        label="Margin Right (Inches)"
        value={gridDisplay.marginRightInches}
        onChange={handleGridDisplayChange}
        max={5}
        min={0}
        step={0.25}
      />
      <RangeControlCombo
        name="marginBottomInches"
        label="Margin Bottom (Inches)"
        value={gridDisplay.marginBottomInches}
        onChange={handleGridDisplayChange}
        max={5}
        min={0}
        step={0.25}
      />
      <RangeControlCombo
        name="boxSizeInches"
        label="Box Size (inches)"
        value={gridDisplay.boxSizeInches}
        onChange={handleGridDisplayChange}
        max={3}
        min={0.5}
        step={0.25}
      />
      <RangeControlCombo
        name="boxMarginInches"
        label="Box Margin (inches)"
        value={gridDisplay.boxMarginInches}
        onChange={handleGridDisplayChange}
        max={0.5}
        min={0}
        step={0.025}
      />
      <p>Box Color</p>
      <TwitterPicker
        color={gridDisplay.boxColor}
        onChange={(color) => changeGridValue("boxColor", color.hex)}
      />
      <p>Box Border Color</p>
      <TwitterPicker
        color={gridDisplay.boxBorderColor}
        onChange={(color) => changeGridValue("boxBorderColor", color.hex)}
      />
      <RangeControlCombo
        name="boxBorderWidth"
        label="Box Border (pixels)"
        value={gridDisplay.boxBorderWidth}
        onChange={handleGridDisplayChange}
        max={5}
        min={0}
        step={1}
      />
    </Stack>
  );
}
