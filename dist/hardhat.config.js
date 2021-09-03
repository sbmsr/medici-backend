"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@typechain/hardhat");
const config_1 = require("hardhat/config");
const config = {
    solidity: "0.8.4",
    networks: {
        hardhat: {
            chainId: 1337,
            mining: {
                auto: false,
                interval: 5000,
            },
        },
    },
};
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
(0, config_1.task)("accounts", "Prints the list of accounts", async (args, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
        console.log(await account.address);
    }
});
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map