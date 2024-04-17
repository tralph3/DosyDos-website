import './Quote.css';

function Quote({quote, author}) {
    return (
        <div className="quote">
            <i className="quote-text">"{quote}"</i>
            <p className="quote-author">- {author}</p>
        </div>
    );
}

export { Quote };
