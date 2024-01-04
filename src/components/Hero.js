import './Hero.css';

function Hero({title, subtitle}) {
    return (
      <div className="hero-image">
        <div className="hero-text">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
        </div>
      </div>
    );
}

export { Hero };
