import productionsFile from "./productions.toml";
import configFile from "./config.toml";
const toml = require("toml");

async function getConfigAndProductions() {
    let productions = {};
    let config = {};

    try {
        const [productionsResponse, configResponse] = await Promise.all([
            fetch(productionsFile),
            fetch(configFile),
        ]);
        const [productionsText, configText] = await Promise.all([
            productionsResponse.text(),
            configResponse.text(),
        ]);

        productions = toml.parse(productionsText);
        config = toml.parse(configText);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return {
        productions: productions,
        config: config,
    };
}

export { getConfigAndProductions };
