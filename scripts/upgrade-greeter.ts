import hre, { upgrades } from "hardhat";

async function main() {
  let Greeter = await hre.ethers.getContractFactory("Greeter");
  await upgrades.upgradeProxy("0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0", Greeter);
  console.log("Greeter upgraded successfully");
}

main().catch((e) => console.error(e));
