// app/admin/layout.js
'use client'


import { useAuth } from '../context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      const isAuthPage = pathname === '/admin/login'
      const isProtectedRoute = pathname.startsWith('/admin') && !isAuthPage
      
      if (isProtectedRoute && !user) {
        router.push('/admin/login')
      }
      
      if (isAuthPage && user) {
        router.push('/admin/dashboard')
      }
    }
  }, [user, loading, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything while checking auth
  if (!user && pathname !== '/admin/login') {
    return null
  }

  return <>{children}</>
}