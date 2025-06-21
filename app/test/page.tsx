export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">CSS 测试页面</h1>
          <p className="text-gray-600 mb-6">如果您能看到这个页面有样式，说明CSS正常工作。</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">蓝色卡片</h3>
              <p className="text-blue-600">这是一个蓝色主题的卡片</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">绿色卡片</h3>
              <p className="text-green-600">这是一个绿色主题的卡片</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">紫色卡片</h3>
              <p className="text-purple-600">这是一个紫色主题的卡片</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              主要按钮
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 ml-4">
              次要按钮
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 