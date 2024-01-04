import { useState, useEffect } from 'react';
import productionsFile from './productions.toml';
import configFile from './config.toml';
import './App.css';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { Production } from './components/Production';
import { Footer } from './components/Footer';
const toml = require('toml');

export default function Catalepsia() {
    let [productions, setProductions] = useState(Object);
    let [config, setConfig] = useState(Object);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productionsResponse, configResponse] = await Promise.all(
                    [fetch(productionsFile), fetch(configFile)]
                );
                const [productionsText, configText] = await Promise.all(
                    [productionsResponse.text(), configResponse.text()]
                );

                setProductions(toml.parse(productionsText));
                setConfig(toml.parse(configText));
            } catch (error) {
                console.error('Error fetching data:', error);
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
            description={production["description"]}
            releaseDate={production["releaseDate"]}
            type={production["type"]}
            length={production["length"]}
            />
        );
    }

    let heroConfig = config["hero"];
    let aboutConfig = config["about"];
    let portfolioConfig = config["portfolio"];
    let contactConfig = config["contact"];
    return (
        <>
            <Hero title={heroConfig["title"]} subtitle={heroConfig["subtitle"]}/>
            <Section title={aboutConfig["title"]} isEven={false} content=<p style={{margin: 0, padding: 2 + 'rem'}}>{aboutConfig["content"]}</p>/>
            <Section title={portfolioConfig["title"]} isEven={true} content={productionComponents}/>
            <Footer contactConfig={contactConfig}/>
        </>
    );
}
