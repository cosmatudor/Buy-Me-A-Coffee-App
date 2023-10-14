const {ethers} = require("hardhat");


async function main() {
  const factory = await ethers.getContractFactory("BuyMeACoffee");
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed at: " + contract.target);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });