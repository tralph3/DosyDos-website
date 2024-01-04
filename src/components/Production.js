import './Production.css';

function Production({title, releaseDate, description, coverName, type, length}) {
    const cover = require(`../img/covers/${coverName}`);

    return (
            <div className="production">
            <img className="production-cover" alt="Production cover" src={cover}></img>
            <div className="production-info">
            <h2 className="production-title">{title}</h2>
            <h3 className="production-subtitle">{releaseDate + " • " + type + " • " + length}</h3>
            <p className="production-description">{description}</p>
            </div>
            </div>
    );
}

export { Production };
