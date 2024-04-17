import { useState, useEffect } from "react";
import productionsFile from "./productions.toml";
import configFile from "./config.toml";
import "./App.css";
import { Hero } from "./components/Hero";
import { Subtitle } from "./components/Subtitle";
import { Production } from "./components/Production";
import { Footer } from "./components/Footer";
import { Quote } from "./components/Quote";
const about_image = require(`./img/about.png`);
const toml = require("toml");

export default function DosyDos() {
  let [productions, setProductions] = useState(Object);
  let [config, setConfig] = useState(Object);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productionsResponse, configResponse] = await Promise.all([
          fetch(productionsFile),
          fetch(configFile),
        ]);
        const [productionsText, configText] = await Promise.all([
          productionsResponse.text(),
          configResponse.text(),
        ]);

        setProductions(toml.parse(productionsText));
        setConfig(toml.parse(configText));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
