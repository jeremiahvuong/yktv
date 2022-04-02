const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory(
    "DomainsDev"
  );

  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("erick", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  txn = await domainContract.setRecord("erick", "amiryan");
  await txn.wait();
  console.log("Set record for erick.yktv");

  const address = await domainContract.getAddress("erick");
  console.log("Owner of domain erick:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  const findrecord = await domainContract.getRecord("erick");
  console.log("Erick's Record:", findrecord);
};

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
