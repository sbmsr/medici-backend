import { providers } from "ethers";
import hre, { ethers } from "hardhat";
import { Medici } from "../typechain/index";

async function main() {
  let Medici: Medici = (await hre.ethers.getContractAt(
    "Medici",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  )) as Medici;

  let fromAddress = (await hre.ethers.getSigners())[0].address;
  let filter = Medici.filters.paymentSuccessful(fromAddress) as providers.Filter;
  filter.fromBlock = (await Medici.blockNumber()).toNumber();

  var logs = await ethers.provider.getLogs(filter);

  let { abi } = require("../artifacts/contracts/Medici.sol/Medici.json");
  let iface = new ethers.utils.Interface(abi);

  let formattedLogs = logs.map((log) => {
    let { args, name } = iface.parseLog(log);
    return {
      event: name,
      buyer: args.buyer,
      products: args.products,
    };
  });

  console.log(formattedLogs);
}

main().catch((e) => console.error(e));
