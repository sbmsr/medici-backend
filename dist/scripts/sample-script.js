"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    const Greeter = await hardhat_1.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello World");
    await greeter.deployed();
    console.log("Greeter deployed to:", greeter.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=sample-script.js.map