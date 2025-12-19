// app/api/auth/login/route.js
import { loginUser } from '../../../lib/auth'

export async function POST(request) {
  try {
    const { username, password } = await request.json()
    const result = await loginUser(username, password)
    return Response.json(result)
  } catch (error) {
    return Response.json({ success: false, error: 'Login failed' }, { status: 500 })
  }
}


