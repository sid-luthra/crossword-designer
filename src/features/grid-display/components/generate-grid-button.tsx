import { Button } from "react-bootstrap";
import sampleWords from "../../../data/sample-words";
import useGrid from "../../../hooks/use-grid";
import useGridDisplay from "../hooks/use-grid-display";

interface GenerateGridButtonProps {
  iterations?: number;
  children?: React.ReactNode;
}

export default function GenerateGridButton({
  iterations = 25,
  children,
}: GenerateGridButtonProps) {
  const { gridDisplay } = useGridDisplay();
  const { generateGrid } = useGrid();

  return (
    <Button
      onClick={() => {
        generateGrid({
          sizeX: gridDisplay.boxCountX,
          sizeY: gridDisplay.boxCountY,
          words: sampleWords,
          iterations,
        });
      }}
    >
      {children || "Generate Grid"}
    </Button>
  );
}
