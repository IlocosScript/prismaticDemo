export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          PostCSS Configuration Test
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see this page with proper styling, PostCSS is working correctly!
        </p>
        <div className="space-y-2">
          <div className="bg-blue-500 text-white p-3 rounded">Tailwind CSS is working</div>
          <div className="bg-green-500 text-white p-3 rounded">Autoprefixer is working</div>
          <div className="bg-purple-500 text-white p-3 rounded">PostCSS is working</div>
        </div>
      </div>
    </div>
  )
}
