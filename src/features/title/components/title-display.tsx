import useTitle from "../hooks/use-title";

export default function TitleDisplay() {
  const { titleRef, title, fontSizePixels } = useTitle();

  return (
    <div
      ref={titleRef}
      className="text-center"
      style={{
        fontSize: fontSizePixels,
        lineHeight: `${fontSizePixels}px`,
        fontFamily: title.font,
        color: title.color,
        marginBottom: title.marginBottomPixels,
      }}
    >
      {title.text}
    </div>
  );
}
