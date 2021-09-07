import hre, { ethers } from "hardhat";
import { Medici } from "../typechain/index";

async function main() {
  let Medici: Medici;
  Medici = (await hre.ethers.getContractAt("Medici", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")) as Medici;
  console.log(await Medici.attemptPurchase({ value: ethers.utils.parseEther("0.1") }));
}

main().catch((e) => console.error(e));
