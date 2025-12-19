// app/lib/auth.js (Server-side)
import { cookies } from 'next/headers'

export async function loginUser(username, password) {
  // Get credentials from environment variables
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User'
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@coinplus.com'
  const SESSION_DAYS = parseInt(process.env.ADMIN_SESSION_DAYS) || 7

  // Validate that environment variables are set
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('Admin credentials are not configured in environment variables')
    return { success: false, error: 'Server configuration error' }
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const userData = {
      username: ADMIN_USERNAME,
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: 'admin'
    }
    
    const cookieStore = await cookies()
    cookieStore.set('admin_user', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * SESSION_DAYS, // Configurable days
      path: '/',
    })
    
    return { success: true, user: userData }
  }
  
  return { success: false, error: 'Invalid credentials' }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_user')
  return { success: true }
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('admin_user')
  
  if (!userCookie?.value) return null
  
  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}

// Optional: Add a function to verify admin access for API routes
export async function verifyAdmin() {
  const user = await getCurrentUser()
  
  if (!user) {
    return { isAuthenticated: false, error: 'Not authenticated' }
  }
  
  if (user.role !== 'admin') {
    return { isAuthenticated: false, error: 'Not authorized' }
  }
  
  return { isAuthenticated: true, user }
}