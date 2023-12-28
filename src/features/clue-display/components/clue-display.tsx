import useClueList from "../hooks/use-clue-list";
import ClueList from "./clue-list";

export default function ClueDisplay({
  horizontal,
  columns = 1,
  fullWidth,
  fullHeight,
  width,
  height,
}: {
  horizontal: boolean;
  columns?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  width?: number;
  height?: number;
}) {
  const { words } = useClueList();

  return (
    <div
      style={{
        width: fullWidth ? "100%" : width,
        height: fullHeight ? "100%" : height,
        overflow: "hidden",
      }}
    >
      <ClueList
        title={horizontal ? "Across" : "Down"}
        horizontal={horizontal}
        words={words}
        columns={columns}
      />
    </div>
  );
}
