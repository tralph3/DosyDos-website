import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Hero } from "./components/Hero";
import { Subtitle } from "./components/Subtitle";
import { Production } from "./components/Production";
import { Footer } from "./components/Footer";
import { Quote } from "./components/Quote";
import { ProductionView } from "./components/ProductionView";
import { getConfigAndProductions } from "./util";
const about_image = require(`./img/about.png`);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/production/:prodName",
        element: <ProductionView />,
    }
]);

function Home() {
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

    if (!config || Object.keys(config).length === 0) {
        return null;
    }

    let productionComponents = [];
  for (let productionKey in productions) {
    let production = productions[productionKey];
    productionComponents.push(
      <Production
          key={productionKey}
          internalName={productionKey}
        title={production["title"]}
        coverName={production["coverName"]}
        releaseDate={production["releaseDate"]}
        type={production["type"]}
      />,
    );
  }

  let heroConfig = config["hero"];
  let aboutConfig = config["about"];
  let portfolioConfig = config["portfolio"];
  let contactConfig = config["contact"];

  let aboutQuote = (
    <Quote quote={aboutConfig["quote"]} author={aboutConfig["quote-author"]} />
  );
  let portfolioQuote = (
    <Quote
      quote={portfolioConfig["quote"]}
      author={portfolioConfig["quote-author"]}
    />
  );
  return (
    <>
      <Hero title={heroConfig["title"]} subtitle={heroConfig["subtitle"]} />
      <Subtitle quote={portfolioQuote} title={portfolioConfig["title"]} />
      <div className="productions">{productionComponents}</div>
      <Subtitle
        quote={aboutQuote}
        title={aboutConfig["title"]}
        content=<p className="aboutContent">{aboutConfig["content"]}</p>
      />
      <div className="about">
        <p>
          <div className="aboutText">{aboutConfig["content"]}</div>
        </p>
        <img src={about_image} alt="about-decoration" align="right" />
      </div>
      <Footer contactConfig={contactConfig} />
    </>
  );
}

export default function App() {
  return (
      <RouterProvider router={router} />
  );
}
