import GridDisplay from "../../grid-display/components/grid-display";
import ClueDisplay from "../../clue-display/components/clue-display";
import useLayout from "../hooks/use-layout";
import TitleDisplay from "../../title/components/title-display";

export default function Newspaper() {
  const { gridHeight, invGridHeight } = useLayout();

  return (
    <div>
      <TitleDisplay />

      <div className="d-flex border-bottom border-light">
        <div>
          <GridDisplay />
        </div>
        <ClueDisplay horizontal={true} height={gridHeight} />
      </div>
      <ClueDisplay
        horizontal={false}
        columns={3}
        height={invGridHeight}
        fullWidth
      />
    </div>
  );
}
