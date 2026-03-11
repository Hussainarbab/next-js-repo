import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Gilgit-Baltistan Job Platform",
  description: "Find jobs in Gilgit-Baltistan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 antialiased">
        <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 shadow-lg shadow-sky-500/30">
                <span className="text-lg font-bold text-slate-950">GB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-slate-50">
                  GB Jobs
                </span>
                <span className="text-[11px] text-slate-400">
                  Gilgit-Baltistan Talent Network
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3 text-sm font-medium">
              <Link
                href="/jobs"
                className="rounded-full px-3 py-1.5 text-slate-200 hover:bg-slate-800/80 hover:text-white transition"
              >
                Jobs
              </Link>
              <Link
                href="/post-job"
                className="hidden sm:inline-flex items-center gap-1 rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-sm shadow-sky-500/40 hover:bg-sky-400 transition"
              >
                <span>＋</span>
                <span>Post a Job</span>
              </Link>
              <Link
                href="/profile"
                className="rounded-full px-3 py-1.5 text-slate-200 hover:bg-slate-800/80 hover:text-white transition"
              >
                Profile
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-slate-700/80 px-3 py-1.5 text-slate-100 hover:border-sky-500/70 hover:text-sky-200 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-sm shadow-emerald-500/40 hover:bg-emerald-400 transition"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8">
          {children}
        </main>
      </body>
    </html>
  );
}


