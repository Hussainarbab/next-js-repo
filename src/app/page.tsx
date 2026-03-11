import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/gilgit-baltistan-bg.jpg')" }}>
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col justify-center items-center text-white">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to Gilgit-Baltistan Job Platform</h1>
          <p className="text-xl mb-8">Find skilled workers or post jobs in the beautiful region of Gilgit-Baltistan. Connect employers and job seekers.</p>
          <div className="space-x-4">
            <Link href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300">Browse Jobs</Link>
            <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300">Join as Worker</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🚛</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Driver</h3>
            <p className="text-gray-600 mb-4">Professional drivers with valid licenses for safe transportation.</p>
            <Link href="/register?role=driver" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition duration-300">Hire a Driver</Link>
          </div>

          <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🔨</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Carpenter</h3>
            <p className="text-gray-600 mb-4">Skilled carpenters for woodwork and construction projects.</p>
            <Link href="/register?role=carpenter" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition duration-300">Hire a Carpenter</Link>
          </div>

          <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Painter</h3>
            <p className="text-gray-600 mb-4">Expert painters for interior and exterior painting services.</p>
            <Link href="/register?role=painter" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition duration-300">Hire a Painter</Link>
          </div>

          <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🏗️</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Laborer</h3>
            <p className="text-gray-600 mb-4">Reliable laborers for construction and general work.</p>
            <Link href="/register?role=laborer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition duration-300">Hire a Laborer</Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">✅</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Verified Workers</h4>
              <p className="text-gray-600">All workers are verified with CNIC and relevant licenses.</p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Secure Platform</h4>
              <p className="text-gray-600">Safe and secure transactions with trusted payment methods.</p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">📍</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Local Focus</h4>
              <p className="text-gray-600">Connecting local employers with skilled workers in Gilgit-Baltistan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
