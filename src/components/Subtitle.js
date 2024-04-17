import "./Subtitle.css";

function Subtitle({ title, quote }) {
  return (
    <div className="subtitle-outer-container">
      <div className="subtitle-inner-container">
        <h2 className="subtitle">{title}</h2>
        {quote}
      </div>
    </div>
  );
}

export { Subtitle };
