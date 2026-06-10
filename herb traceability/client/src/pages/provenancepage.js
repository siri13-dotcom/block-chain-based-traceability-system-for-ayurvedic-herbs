import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHarvest, getProcessing } from "../api/blockchainAPI";

export default function ProvenancePage() {
  const { batchId } = useParams();
  const [harvest, setHarvest] = useState(null);
  const [processing, setProcessing] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setHarvest(await getHarvest(batchId));
      setProcessing(await getProcessing(batchId));
    }
    fetchData();
  }, [batchId]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="font-bold text-xl mb-4">🌿 Provenance: {batchId}</h1>
      {harvest && (
        <div className="p-4 border rounded mb-4">
          <p><strong>Collector:</strong> {harvest.collector}</p>
          <p><strong>Species:</strong> {harvest.species}</p>
          <p><strong>Location:</strong> {harvest.location}</p>
          <p><strong>Coordinates:</strong> {harvest.latitude}, {harvest.longitude}</p>
          {harvest.latitude && harvest.longitude && (
            <iframe
              title="map"
              width="100%"
              height="200"
              className="mt-2 rounded"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${harvest.latitude},${harvest.longitude}&zoom=14&maptype=roadmap`}
            />
          )}
        </div>
      )}
      {processing.length > 0 && (
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Processing Steps</h3>
          <ul className="list-disc list-inside">
            {processing.map((p,i) => (
              <li key={i}>{p.step}: {p.details}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
