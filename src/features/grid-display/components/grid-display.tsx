import GridBox from "../../../components/grid-box/grid-box";
import "./grid-display.css";
import useGridDisplay from "../hooks/use-grid-display";
import { useAppSelector } from "../../../store/hooks";
import { selectGrid } from "../../../store/grid-slice";

export default function GridDisplay() {
  const { gridDisplay } = useGridDisplay();
  const { letterPlacements } = useAppSelector(selectGrid);

  const columns = Array.from({ length: gridDisplay.boxCountX }, (_, i) => i);
  const rows = Array.from({ length: gridDisplay.boxCountY }, (_, i) => i);

  return (
    <div
      style={{
        width: gridDisplay.widthPixels,
        height: gridDisplay.heightPixels,
        marginRight: gridDisplay.marginRightPixels,
        marginBottom: gridDisplay.marginBottomPixels,
      }}
    >
      {rows.map((row) => (
        <div key={row} className="grid-row">
          {columns.map((column) => (
            <GridBox
              key={`x${row}-y${column}`}
              data={letterPlacements?.find(
                (letterPlacement) =>
                  letterPlacement.x === column && letterPlacement.y === row
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
