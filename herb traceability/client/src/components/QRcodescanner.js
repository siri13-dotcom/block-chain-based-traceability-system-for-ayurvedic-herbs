import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { getHarvest, getProcessing } from "../api/blockchainAPI";

export default function QRCodeScanner() {
  const [scanResult, setScanResult] = useState("");
  const [harvest, setHarvest] = useState(null);
  const [processing, setProcessing] = useState([]);

  const handleScan = async (result) => {
    if (result?.text) {
      const batchId = result.text.split("/").pop();
      setScanResult(batchId);
      setHarvest(await getHarvest(batchId));
      setProcessing(await getProcessing(batchId));
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-6">
      <h2 className="font-bold mb-2">Scan QR Code</h2>
      <QrReader constraints={{ facingMode: "environment" }} onResult={handleScan} style={{ width: "100%" }}/>
      {scanResult && harvest && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Batch: {scanResult}</h3>
          <p>Collector: {harvest.collector}</p>
          <p>Species: {harvest.species}</p>
          <p>Location: {harvest.location}</p>
          <p>Coordinates: {harvest.latitude}, {harvest.longitude}</p>
        </div>
      )}
    </div>
  );
}
