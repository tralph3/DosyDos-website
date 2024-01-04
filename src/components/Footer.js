import './Footer.css';

function Footer({title}) {
    return (
        <div className="footer">
            <h3>{title}</h3>
            <div className="contactIcons">
            <h4>Icono 1</h4>
            <h4>Icono 2</h4>
            <h4>Icono 3</h4>
            </div>
        </div>
    );
}

export { Footer };
