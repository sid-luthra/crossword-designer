import GridDisplay from "../../grid-display/components/grid-display";
import ClueDisplay from "../../clue-display/components/clue-display";
import useLayout from "../hooks/use-layout";
import TitleDisplay from "../../title/components/title-display";

export default function SideBySideStacked() {
  const { invGridWidth } = useLayout();

  return (
    <div className="d-flex">
      <div>
        <TitleDisplay />
        <GridDisplay />
      </div>
      <div className="d-flex flex-column">
        <ClueDisplay horizontal={true} width={invGridWidth} />
        <ClueDisplay horizontal={false} width={invGridWidth} />
      </div>
    </div>
  );
}
