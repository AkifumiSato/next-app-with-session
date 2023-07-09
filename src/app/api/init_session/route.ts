import { SESSION_COOKIE_NAME } from '@/lib/session'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  cookies().set(SESSION_COOKIE_NAME, nanoid())
  return NextResponse.redirect(new URL("/", request.nextUrl))
}
