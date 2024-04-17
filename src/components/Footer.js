import "./Footer.css";

function Footer({ contactConfig }) {
  let title = contactConfig["title"];
  let iconComponents = [];
  for (let iconKey in contactConfig["icons"]) {
    const iconName = contactConfig["icons"][iconKey]["icon"];
    const iconLink = contactConfig["icons"][iconKey]["link"];
    const iconFile = require(`../img/icons/${iconName}`);

    iconComponents.push(
      <a key={iconKey} href={iconLink} target="new">
        <img src={iconFile} alt={iconKey + " logo"}></img>
      </a>,
    );
  }

  return (
    <div className="footer">
      <h3>{title}</h3>
      <div className="contactIcons">{iconComponents}</div>
    </div>
  );
}

export { Footer };
