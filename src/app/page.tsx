"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Funky Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Music Notes */}
        <div className="absolute top-20 left-20 text-purple-300/30 animate-bounce delay-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute top-40 right-32 text-blue-300/30 animate-bounce delay-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-32 text-pink-300/30 animate-bounce delay-1000">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 text-indigo-300/30 animate-bounce delay-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <main className="flex flex-col items-center gap-8 max-w-2xl text-center relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 music-gradient rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-foreground bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            MelodyHub
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Discover, collect, and organize your favorite songs. Build your personal music library with ease.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/auth/signin"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all duration-300 text-center font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Sign In
          </Link>
          <button
            onClick={handleDashboardClick}
            className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-center font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Dashboard
          </button>
        </div>
        {/* <div className="mt-8 text-sm text-muted-foreground">
          <p>Ready to start your musical journey? {session ? "Welcome back!" : "Sign in to begin collecting your favorite songs."}</p>
        </div> */}
      </main>
    </div>
  );
}