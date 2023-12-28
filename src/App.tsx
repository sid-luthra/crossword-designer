import BackgroundDisplay from "./features/background/components/background-display";
import TitleInput from "./features/title/components/title-input";
import PuzzleDisplay from "./features/puzzle-container/components/puzzle-display";
import PuzzleInput from "./features/puzzle-container/components/puzzle-input";
import GenerateGridButton from "./features/grid-display/components/generate-grid-button";
import { Provider } from "react-redux";
import store from "./store/store";
import ControlPanel from "./features/control-panel/components/control-panel";
import ControlPanelButton from "./features/control-panel/components/control-panel-button";
import { useState } from "react";
import GridDisplayInput from "./features/grid-display/components/grid-display-input";
import PuzzleList from "./features/saved-puzzles/components/puzzle-list";
import LayoutWrapper from "./features/layouts/components/layout-wrapper";
import ClueListInput from "./features/clue-display/components/clue-list-input";
import { Stack } from "react-bootstrap";

function App() {
  const [showControls, setShowControls] = useState(false);

  return (
    <Provider store={store}>
      <div className="100vh">
        <BackgroundDisplay>
          <ControlPanelButton onClick={() => setShowControls(true)} />
          <PuzzleDisplay>
            <LayoutWrapper />
          </PuzzleDisplay>
        </BackgroundDisplay>
        <ControlPanel show={showControls} setShow={setShowControls}>
          <PuzzleList />
          <hr />
          <PuzzleInput />
          <hr />
          <TitleInput />
          <hr />
          <GridDisplayInput />
          <hr />
          <ClueListInput />
          <hr />
          <Stack gap={2}>
            <GenerateGridButton />
            <GenerateGridButton iterations={2}>
              Quick Generate
            </GenerateGridButton>
          </Stack>
        </ControlPanel>
      </div>
    </Provider>
  );
}

export default App;
