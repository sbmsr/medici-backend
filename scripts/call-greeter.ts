import hre from "hardhat";
import { Greeter } from "../typechain/index";

async function main() {
  let Greeter: Greeter;
  Greeter = (await hre.ethers.getContractAt("Greeter", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")) as Greeter;
  console.log(await Greeter.greet());
}

main().catch((e) => console.error(e));
