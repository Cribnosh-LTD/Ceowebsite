"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

export default function AdminDashboard() {
  const pieces = useQuery(api.pieces.get);
  const addPiece = useMutation(api.pieces.add);
  const removePiece = useMutation(api.pieces.remove);
  const updatePiece = useMutation(api.pieces.update);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<Id<"pieces"> | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    source: "",
    date: "",
    url: "",
    category: "By Me" as "By Me" | "About Me",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updatePiece({ id: editingId, ...formData });
      setEditingId(null);
    } else {
      await addPiece(formData);
      setIsAdding(false);
    }
    setFormData({
      title: "",
      source: "",
      date: "",
      url: "",
      category: "By Me",
      description: "",
    });
  };

  const handleEdit = (piece: any) => {
    setEditingId(piece._id);
    setFormData({
      title: piece.title,
      source: piece.source,
      date: piece.date,
      url: piece.url,
      category: piece.category,
      description: piece.description,
    });
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-oswald uppercase tracking-tight">Admin Dashboard</h1>
          <button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingId(null);
            }}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all uppercase tracking-widest text-sm"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            {isAdding ? "Cancel" : "Add New Piece"}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">Title</label>
                <input
                  required
                  className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:border-black transition-colors"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">Source</label>
                <input
                  required
                  className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:border-black transition-colors"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">Date</label>
                <input
                  required
                  className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:border-black transition-colors"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">URL</label>
                <input
                  required
                  className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:border-black transition-colors"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">Category</label>
                <select
                  className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:border-black transition-colors"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                >
                  <option value="By Me">By Me</option>
                  <option value="About Me">About Me</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">Description</label>
                <textarea
                  required
                  className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:border-black transition-colors h-32"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
            >
              <Check size={18} />
              {editingId ? "Update Piece" : "Save Piece"}
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 gap-6">
          {pieces === undefined ? (
            <div className="text-center py-20 opacity-50 uppercase tracking-widest text-sm">Loading...</div>
          ) : pieces.length === 0 ? (
            <div className="text-center py-20 opacity-50 uppercase tracking-widest text-sm">No pieces found.</div>
          ) : (
            pieces.map((piece) => (
              <div key={piece._id} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center group">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-gray-100 rounded text-gray-500 font-oswald">
                      {piece.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">{piece.date}</span>
                  </div>
                  <h3 className="text-xl font-oswald uppercase">{piece.title}</h3>
                  <p className="text-sm text-gray-500 font-inter">{piece.source}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(piece)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors text-blue-600"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => removePiece({ id: piece._id })}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
