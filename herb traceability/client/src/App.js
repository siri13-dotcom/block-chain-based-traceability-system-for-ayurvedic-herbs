import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollectorForm from "./components/CollectorForm";
import ProcessorForm from "./components/ProcessorForm";
import QRCodeGenerator from "./components/QRCodeGenerator";
import QRCodeScanner from "./components/QRCodeScanner";
import ProvenancePage from "./pages/ProvenancePage";

function App() {
  const [batchId, setBatchId] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">🌿 Ayurvedic Herb Traceability</h1>
            <CollectorForm onBatchCreated={setBatchId}/>
            <ProcessorForm />
            {batchId && <QRCodeGenerator batchId={batchId} />}
            <QRCodeScanner />
          </div>
        }/>
        <Route path="/provenance/:batchId" element={<ProvenancePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
