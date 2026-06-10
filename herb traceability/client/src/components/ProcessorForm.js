import React, { useState } from "react";
import { addProcessing } from "../api/blockchainAPI";

export default function ProcessorForm() {
  const [form, setForm] = useState({ batchId: "", step: "", details: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProcessing(form);
    alert("✅ Processing Step Added");
    setForm({ batchId: "", step: "", details: "" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-6">
      <h2 className="text-lg font-bold mb-4">Add Processing Step</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="batchId" placeholder="Batch ID" value={form.batchId} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="step" placeholder="Step Name" value={form.step} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="details" placeholder="Details" value={form.details} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Add Processing</button>
      </form>
    </div>
  );
}
