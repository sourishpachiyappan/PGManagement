import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddPGModalProps {
  onClose: () => void;
  onPGAdded: () => void;
}

export function AddPGModal({ onClose, onPGAdded }: AddPGModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    pg_type: "boys",
    total_inmates: 0,
    no_of_rooms: 0,
    ac_type: "non_ac",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "total_inmates" || name === "no_of_rooms" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API service to add PG
    console.log("Submitting PG data:", formData);
    // For now, simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onPGAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New PG Property</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">PG Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="pg_type" className="block text-sm font-medium text-gray-700">PG Type</label>
            <select
              id="pg_type"
              name="pg_type"
              value={formData.pg_type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="total_inmates" className="block text-sm font-medium text-gray-700">Total Capacity</label>
            <input
              type="number"
              id="total_inmates"
              name="total_inmates"
              value={formData.total_inmates}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="no_of_rooms" className="block text-sm font-medium text-gray-700">Number of Rooms</label>
            <input
              type="number"
              id="no_of_rooms"
              name="no_of_rooms"
              value={formData.no_of_rooms}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ac_type" className="block text-sm font-medium text-gray-700">AC Type</label>
            <select
              id="ac_type"
              name="ac_type"
              value={formData.ac_type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="ac">AC</option>
              <option value="non_ac">Non-AC</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Add PG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
