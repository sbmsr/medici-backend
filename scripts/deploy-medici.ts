import { ethers, upgrades } from "hardhat";

async function main() {
  const Medici = await ethers.getContractFactory("Medici");
  const mediciProxy = await upgrades.deployProxy(Medici, [ethers.utils.parseUnits(".01", "ether")]);

  await mediciProxy.deployed();

  console.log("Medici deployed to:", mediciProxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
