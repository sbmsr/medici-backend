import hre, { upgrades } from "hardhat";

async function main() {
  let Medici = await hre.ethers.getContractFactory("Medici");
  await upgrades.upgradeProxy("0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0", Medici);
  console.log("Medici upgraded successfully");
}

main().catch((e) => console.error(e));
