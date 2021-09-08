import hre, { ethers } from "hardhat";
import { Medici } from "../typechain/index";

async function main() {
  let Medici: Medici = (await hre.ethers.getContractAt(
    "Medici",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  )) as Medici;
  const balance = await ethers.provider.getBalance(Medici.address);
  const formattedBal = ethers.utils.formatEther(balance);

  console.log(formattedBal);
}

main().catch((e) => console.error(e));
