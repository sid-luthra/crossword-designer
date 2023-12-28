import { Button, Form, Stack } from "react-bootstrap";
import useSavedPuzzle from "../hooks/use-saved-puzzle";

export default function PuzzleList() {
  const {
    puzzleList,
    selectedPuzzle,
    setSelectedPuzzle,
    savePuzzle,
    loadPuzzle,
  } = useSavedPuzzle();

  return (
    <Stack gap={2}>
      <Form.Group>
        <Form.Label>Select a Puzzle</Form.Label>
        <Form.Select
          value={selectedPuzzle}
          onChange={(e) => setSelectedPuzzle(e.target.value)}
        >
          {puzzleList.map((puzzle) => {
            return (
              <option key={puzzle.id} value={puzzle.id}>
                {puzzle.name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Stack direction="horizontal" gap={2}>
        <Button onClick={loadPuzzle}>Load Puzzle</Button>
        <Button onClick={savePuzzle}>Save Puzzle</Button>
      </Stack>
    </Stack>
  );
}
