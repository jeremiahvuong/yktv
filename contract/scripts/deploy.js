const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory(
    "DomainsV3"
  );
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("marin", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain marin.yktv");

  txn = await domainContract.setRecord("marin", "sparcjv");
  await txn.wait();
  console.log("Set record for marin.yktv");

  const address = await domainContract.getAddress("marin");
  console.log("Owner of domain marin:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
