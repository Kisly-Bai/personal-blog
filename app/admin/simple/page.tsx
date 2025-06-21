export default function SimpleAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">简单管理页面</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">测试内容</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">蓝色卡片</h3>
              <p className="text-blue-700 mt-2">这是一个测试卡片</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">绿色卡片</h3>
              <p className="text-green-700 mt-2">这是另一个测试卡片</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900">紫色卡片</h3>
              <p className="text-purple-700 mt-2">第三个测试卡片</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              测试按钮
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 