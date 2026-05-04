import React from 'react'

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          Developer Tools
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          A comprehensive collection of free online tools for web developers
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Base64 Encoder/Decoder
            </h3>
            <p className="text-gray-600 text-sm mb-4">Encode and decode Base64 strings</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
              Coming Soon
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              JSON Formatter
            </h3>
            <p className="text-gray-600 text-sm mb-4">Format and validate JSON data</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}