import hre from "hardhat";
import { Medici } from "../typechain/index";

async function main() {
  let Medici: Medici;
  Medici = (await hre.ethers.getContractAt("Medici", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")) as Medici;
  let signer = (await hre.ethers.getSigners())[0];
  console.log(signer.address);
  let filter = Medici.filters.paymentSuccessful(signer.address);
  let paymentSuccessEvents = await Medici.provider.getLogs(filter);
  console.log(paymentSuccessEvents);
}

main().catch((e) => console.error(e));
