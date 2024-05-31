import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductionView.css";
import { getConfigAndProductions } from "../util";
import ReactPlayer from "react-player";
import { Footer } from "./Footer";

function SheetEntry({ role, name }) {
    return (
        <div className="sheet-entry">
            {role}
            <span className="sheet-right-side">
                {name}
            </span>
        </div>
    );
}

function ProductionView() {
  let { prodName } = useParams();
  const [productions, setProductions] = useState(Object);
  const [config, setConfig] = useState(Object);
  useEffect(() => {
    async function populate() {
      let data = await getConfigAndProductions();
      setProductions(data.productions);
      setConfig(data.config);
    }

    populate();
  }, []);

  if (!productions[prodName]) {
    return <div>Unknown production</div>;
  }
  let contactConfig = config["contact"];

    let production = productions[prodName];
    let techSheetEntries = [];
    for (let entryKey in production["sheet"]) {
        let sheetEntry = production["sheet"][entryKey];
        techSheetEntries.push(
            <SheetEntry
                key={entryKey}
                role={sheetEntry[0]}
                name={sheetEntry[1]}
            />,
        );
    }

  return (
    <div>
      <div className="video-container">
        <ReactPlayer
          url={production.link}
          controls="true"
          width="100%"
          height="auto"
          config={{
            vimeo: {
              playerOptions: {
                responsive: true,
                vimeo_logo: false,
              },
            },
          }}
          style={{ margin: "0 auto" }}
        />
      </div>
      <p className="pview-title">{production.title}</p>
      <p className="pview-date">{production.releaseDate}</p>
        <p className="pview-description">{production.description}</p>
        <div className="pview-tech-sheet">
            {techSheetEntries}
            </div>
      <div style={{ "margin-top": "15vh" }} />
      <Footer contactConfig={contactConfig} />
    </div>
  );
}

export { ProductionView };
