"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 music-gradient rounded-full animate-pulse"></div>
          <div className="text-lg text-muted-foreground">Loading your music...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 music-gradient rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground">MelodyHub</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            Sign Out
          </button>
        </div>

        <div className="music-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Welcome back, {session.user?.name || session.user?.email}! 🎵
          </h2>
          <p className="text-muted-foreground">
            Your personal music collection awaits. Start adding your favorite songs and create the perfect playlist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="music-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                My Collection
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              View and manage your saved songs and albums.
            </p>
            <button className="text-primary hover:underline font-medium">
              <Link href="/songs">Browse Collection →</Link>
            </button>
          </div>

          {/* <div className="music-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Playlists
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Create and organize custom playlists for different moods.
            </p>
            <button className="text-accent hover:underline font-medium">
              Create Playlist →
            </button>
          </div> */}

          {/* <div className="music-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Favorites
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Quick access to your most loved tracks and artists.
            </p>
            <button className="text-success hover:underline font-medium">
              View Favorites →
            </button>
          </div> */}
        </div>

        {/* <div className="music-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Account Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="font-medium text-foreground">Email:</span>
              <span className="text-muted-foreground">{session.user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="font-medium text-foreground">Name:</span>
              <span className="text-muted-foreground">
                {session.user?.name || "Not provided"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-foreground">Member since:</span>
              <span className="text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}


