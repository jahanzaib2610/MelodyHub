"use client";

import { useState } from "react";
import { useToast } from "@/components/toast";

interface AddSongFormProps {
  onSongAdded: () => void;
}

export function AddSongForm({ onSongAdded }: AddSongFormProps) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      addToast({
        type: "error",
        message: "Please enter a song title",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (response.ok) {
        addToast({
          type: "success",
          message: "Song added successfully!",
        });
        setTitle("");
        onSongAdded();
      } else {
        const data = await response.json();
        addToast({
          type: "error",
          message: data.error || "Failed to add song",
        });
      }
    } catch {
      addToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="music-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Add New Song
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="songTitle" className="block text-sm font-medium text-foreground mb-1">
            Song Title
          </label>
          <input
            id="songTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter song title..."
            className="w-full px-3 py-2 border border-border rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isLoading ? "Adding..." : "Add Song"}
        </button>
      </form>
    </div>
  );
}
