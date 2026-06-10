async function main() {
  const HerbTraceability = await ethers.getContractFactory("HerbTraceability");
  const contract = await HerbTraceability.deploy();
  await contract.deployed();
  console.log("✅ HerbTraceability deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
