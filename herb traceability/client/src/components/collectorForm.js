import React, { useState } from "react";
import { addHarvest } from "../api/blockchainAPI";

export default function CollectorForm({ onBatchCreated }) {
  const [form, setForm] = useState({
    batchId: "",
    collector: "",
    species: "",
    location: "",
    latitude: "",
    longitude: ""
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({
          ...form,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6)
        });
        setLoadingLocation(false);
      },
      (err) => {
        alert("Unable to fetch location: " + err.message);
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addHarvest(form);
    alert("✅ Harvest Submitted");
    onBatchCreated(form.batchId);
    setForm({ batchId: "", collector: "", species: "", location: "", latitude: "", longitude: "" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Submit Harvest Event</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="batchId" placeholder="Batch ID" value={form.batchId} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="collector" placeholder="Collector Name" value={form.collector} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="species" placeholder="Herb Species" value={form.species} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="location" placeholder="Village/City" value={form.location} onChange={handleChange} className="w-full p-2 border rounded"/>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" name="latitude" value={form.latitude} readOnly className="w-full p-2 border rounded" placeholder="Latitude"/>
          <input type="text" name="longitude" value={form.longitude} readOnly className="w-full p-2 border rounded" placeholder="Longitude"/>
        </div>
        <button type="button" onClick={detectLocation} className="w-full bg-blue-600 text-white p-2 rounded">{loadingLocation ? "Detecting..." : "📍 Auto-Detect GPS"}</button>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Submit Harvest</button>
      </form>
    </div>
  );
}
