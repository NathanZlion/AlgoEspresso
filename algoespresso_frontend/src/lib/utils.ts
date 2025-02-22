import { Clerk } from '@clerk/clerk-js'
import { auth } from '@clerk/nextjs/server'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getAuthToken() {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const { getToken } = await auth()
    return await getToken()
  }

  const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!);
  await clerk.load()
  return await clerk.session?.getToken()
}
