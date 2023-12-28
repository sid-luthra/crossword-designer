import { ReactNode } from "react";
import useBackground from "../hooks/use-background";
import { Button, ProgressBar } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";

export default function BackgroundDisplay({
  children,
}: {
  children: ReactNode;
}) {
  const { backgroundRef, background, downloadScreenshot } = useBackground();
  const { grid, loading, attempts } = useAppSelector((state) => state.grid);

  return (
    <div>
      <div className="position-absolute top-0 start-50 mt-4 translate-middle bg-white py-2 px-5 rounded">
        <div className="d-flex align-items-center justify-content-center">
          <div>
            <span className="fw-bold">Placed Words: </span>
            {grid.wordPlacements.length}
          </div>
        </div>
        {loading && (
          <ProgressBar className="w-100" now={(attempts / 50) * 100} />
        )}
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        ref={backgroundRef}
        style={{
          backgroundImage:
            background.type !== "transparent"
              ? `url(/backgrounds/${background.type.toLowerCase()}.jpg)`
              : "none",
          backgroundColor:
            background.type === "transparent" ? "green" : "white",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Button
          className="position-fixed top-0 start-0 m-3"
          variant="light"
          onClick={downloadScreenshot}
        >
          Screenshot
        </Button>
        {children}
      </div>
    </div>
  );
}
