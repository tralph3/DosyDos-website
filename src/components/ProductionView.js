import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./ProductionView.css";
import { getConfigAndProductions } from "../util";
import ReactPlayer from 'react-player';

function ProductionView() {
    let { prodName } = useParams();
    const [productions, setProductions] = useState(Object);
    useEffect(() => {
        async function populate() {
            let data = await getConfigAndProductions();
            setProductions(data.productions);
        }

        populate();
    }, []);

    if (!productions[prodName]) {
        return <div>Unknown production</div>;
    }

    let production = productions[prodName];
    return (
        <div>
        <ReactPlayer
            url={production.link}
            controls="true"
            width="100vw"
            height="80vh"
        />
            <p className="pview-title">
                {production.title}
            </p>
            <p className="pview-date">
                {production.releaseDate}
            </p>
            <p className="pview-description">
                {production.description}
                </p>
            </div>
    );
}

export { ProductionView };
