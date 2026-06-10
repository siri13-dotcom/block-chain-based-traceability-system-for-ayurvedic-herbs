import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator({ batchId }) {
  const url = `http://localhost:3000/provenance/${batchId}`;
  return (
    <div className="p-4 max-w-xl mx-auto mt-6 flex flex-col items-center">
      <h2 className="font-bold mb-2">QR Code for Batch {batchId}</h2>
      <QRCodeCanvas value={url} size={200}/>
      <p className="text-sm mt-2 break-all">{url}</p>
    </div>
  );
}
