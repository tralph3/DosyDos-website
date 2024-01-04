import './Section.css';

function Section({title, content, isEven}) {
    return (
            <div style={{"background-color": isEven ? 'cornsilk' : 'white'}} className="section">
            <h2 className="subtitle">{title}</h2>
            {content}
        </div>
    );
}

export { Section };
