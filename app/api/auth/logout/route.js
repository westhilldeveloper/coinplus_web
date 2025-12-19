// app/api/auth/logout/route.js

import { logoutUser } from '../../../lib/auth'

export async function POST() {
  await logoutUser()
  return Response.json({ success: true })
}