import { useAppSelector } from "../../../store/hooks";
import Newspaper from "./newspaper";
import NewspaperAlt from "./newspaper-alt";
import SideBySide from "./side-by-side";
import SideBySideStacked from "./side-by-side-stacked";

export default function LayoutWrapper() {
  const { layout } = useAppSelector((state) => state.puzzle.puzzleBoard);

  switch (layout) {
    case "side-by-side":
      return <SideBySide />;
    case "side-by-side-stacked":
      return <SideBySideStacked />;
    case "newspaper":
      return <Newspaper />;
    case "newspaper-alt":
      return <NewspaperAlt />;
    default:
      return <SideBySide />;
  }
}
