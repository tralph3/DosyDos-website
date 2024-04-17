import './Production.css';

function Production({title, releaseDate, coverName, type}) {
    const cover = require(`../img/covers/${coverName}`);

    return (
        <div className="production">
            <div className="production-cover">
                 <img alt={coverName} src={cover}/>
            </div>
            <div className="production-info">
            <h4 className="production-info">{releaseDate} · {type.toUpperCase()}</h4>
            <h2 className="production-title">{title.toUpperCase()}</h2>
            </div>
        </div>
    );
}

export { Production };
