const main = async () => {
  const DEPLOYMINT_DOMAIN_NAME = "marin";
  const DEPLOYMINT_METADATA = "wooooo!";

  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register(DEPLOYMINT_DOMAIN_NAME, {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log(`Minted domain ${DEPLOYMINT_DOMAIN_NAME}.yktv`);

  txn = await domainContract.setRecord(
    DEPLOYMINT_DOMAIN_NAME,
    DEPLOYMINT_METADATA
  );
  await txn.wait();
  console.log(`Set record for ${DEPLOYMINT_DOMAIN_NAME}.yktv`);

  const address = await domainContract.getAddress(DEPLOYMINT_DOMAIN_NAME);
  console.log(`Owner of domain ${DEPLOYMINT_DOMAIN_NAME}:`, address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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
