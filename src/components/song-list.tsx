"use client";

import { useState } from "react";
import { useToast } from "@/components/toast";

interface DeleteDialogProps {
  isOpen: boolean;
  songTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteDialog({ isOpen, songTitle, onConfirm, onCancel }: DeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="music-card p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Delete Song
        </h3>
        <p className="text-muted-foreground mb-6">
          Are you sure you want to delete &quot;<span className="font-medium text-foreground">{songTitle}</span>&quot;? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors border border-border"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-error text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

interface Song {
  id: string;
  title: string;
  createdAt: string;
}

interface SongListProps {
  songs: Song[];
  onSongDeleted: () => void;
}

export function SongList({ songs, onSongDeleted }: SongListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; songId: string; songTitle: string }>({
    isOpen: false,
    songId: "",
    songTitle: ""
  });
  const { addToast } = useToast();

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/songs/${deleteDialog.songId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        addToast({
          type: "success",
          message: "Song deleted successfully!",
        });
        onSongDeleted();
      } else {
        const data = await response.json();
        addToast({
          type: "error",
          message: data.error || "Failed to delete song",
        });
      }
    } catch {
      addToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setDeleteDialog({ isOpen: false, songId: "", songTitle: "" });
    }
  };

  const openDeleteDialog = (songId: string, songTitle: string) => {
    setDeleteDialog({ isOpen: true, songId, songTitle });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (songs.length === 0) {
    return (
      <div className="music-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No songs yet
        </h3>
        <p className="text-muted-foreground mb-4">
          Start building your music collection by adding your favorite songs!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="music-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Your Songs ({songs.length})
        </h3>
        
        <div className="mb-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search your songs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card"
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredSongs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No songs found matching &quot;{searchTerm}&quot;</p>
            </div>
          ) : (
            filteredSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{song.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Added on {formatDate(song.createdAt)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => openDeleteDialog(song.id, song.title)}
                  className="p-2 text-muted-foreground hover:text-error transition-colors"
                  title="Delete song"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        songTitle={deleteDialog.songTitle}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, songId: "", songTitle: "" })}
      />
    </div>
  );
}
