import GridDisplay from "../../grid-display/components/grid-display";
import ClueDisplay from "../../clue-display/components/clue-display";
import useLayout from "../hooks/use-layout";

export default function NewspaperAlt() {
  const { gridWidth, invGridHeight } = useLayout();

  return (
    <div className="d-flex">
      <div>
        <GridDisplay />
        <ClueDisplay
          horizontal={false}
          columns={2}
          height={invGridHeight}
          width={gridWidth}
        />
      </div>
      <ClueDisplay horizontal={true} fullHeight />
    </div>
  );
}
