"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importDefault(require("hardhat"));
async function main() {
    console.log(await hardhat_1.default.ethers.ContractFactory);
    //   let Greeter: Greeter;
    //   Greeter = (await hre.ethers.getContractAt("Greeter", "0x5fbdb2315678afecb367f032d93f642f64180aa3")) as Greeter;
    //   Greeter.greet;
    //   console.log(await Greeter.greet());
}
main().catch((e) => console.error(e));
//# sourceMappingURL=call-greeter.js.map