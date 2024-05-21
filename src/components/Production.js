import { Link } from 'react-router-dom';
import "./Production.css";

function Production({ internalName, title, releaseDate, coverName, type }) {
  const cover = require(`../img/covers/${coverName}`);

  return (
    <div className="production">
          <Link to={`/production/${internalName}`}>
      <div className="production-cover">
        <img alt={coverName} src={cover} />
          </div>
       </Link>
      <div className="production-info">
        <h4 className="production-info">
          {releaseDate} · {type.toUpperCase()}
        </h4>
        <h2 className="production-title">{title.toUpperCase()}</h2>
      </div>
    </div>
  );
}

export { Production };
