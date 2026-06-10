import { ethers } from "ethers";
import HerbTraceability from "./HerbTraceability.json";

const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
let contract;

async function initContract() {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, HerbTraceability.abi, signer);
}

export async function addHarvest(data) {
  if (!contract) await initContract();
  const tx = await contract.addHarvestEvent(
    data.batchId,
    data.collector,
    data.location,
    data.species,
    data.latitude,
    data.longitude
  );
  return tx.wait();
}

export async function addProcessing(data) {
  if (!contract) await initContract();
  const tx = await contract.addProcessingEvent(data.batchId, data.step, data.details);
  return tx.wait();
}

export async function getHarvest(batchId) {
  if (!contract) await initContract();
  return await contract.getHarvestEvent(batchId);
}

export async function getProcessing(batchId) {
  if (!contract) await initContract();
  return await contract.getProcessingEvents(batchId);
}
