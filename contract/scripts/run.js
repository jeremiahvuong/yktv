const main = async () => {
  const RUN_DOMAIN_NAME = "eric";
  const RUN_METADATA = "idkkkk";

  const domainContractFactory = await hre.ethers.getContractFactory("Domains");

  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register(RUN_DOMAIN_NAME, {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  txn = await domainContract.setRecord(RUN_DOMAIN_NAME, RUN_METADATA);
  await txn.wait();
  console.log(`Set record for ${RUN_DOMAIN_NAME}.yktv`);

  const address = await domainContract.getAddress(RUN_DOMAIN_NAME);
  console.log(`Owner of domain "${RUN_DOMAIN_NAME}":`, address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  const findrecord = await domainContract.getRecord(RUN_DOMAIN_NAME);
  console.log(`${RUN_DOMAIN_NAME}'s Record:`, findrecord);
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
