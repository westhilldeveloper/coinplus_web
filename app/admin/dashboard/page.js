// app/admin/dashboard/page.js
'use client'


import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         

          <Link href="/admin/chits" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chits</h2>
            <p className="text-gray-600"> manage chits</p>
          </Link>
           <Link href="/admin/media/news" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">News</h2>
            <p className="text-gray-600">Manage News</p>
          </Link>
           <Link href="/admin/media/events" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Events</h2>
            <p className="text-gray-600">Manage Events</p>
          </Link>
           <Link href="/admin/media/gallery" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-gray-600">Manage Gallery</p>
          </Link>
           <Link href="/admin/media/blog" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Blog</h2>
            <p className="text-gray-600">Manage Blog</p>
          </Link>
           <Link href="/admin/branches" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Branches</h2>
            <p className="text-gray-600">Manage Branches</p>
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Logged in as:</p>
                <p className="font-medium">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}