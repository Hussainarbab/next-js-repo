import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Gilgit-Baltistan Job Platform</h1>
        <p className="text-lg mb-8">Find and post jobs in Gilgit-Baltistan. Connect employers and job seekers.</p>
        <div className="space-x-4">
          <Link href="/jobs" className="bg-blue-600 text-white px-6 py-2 rounded">Browse Jobs</Link>
          <Link href="/register" className="bg-green-600 text-white px-6 py-2 rounded">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
