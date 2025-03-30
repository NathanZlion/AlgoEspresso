'use client'

import { useUser } from "@clerk/nextjs"

export default function Page() {
  const { user } = useUser()

  return (
    <div className="h-full flex flex-col">
      <header className="min-h-fit h-1/4 bg-gradient-to-bl to-foreground via-accent-foreground dark:via-accent dark:to-background from-[#6b27a8] to-90% p-6 shadow-md text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex flex-col h-full">
            <h1 className="text-6xl font-bold">
              Welcome Back,
              <div>
                {user?.firstName}
              </div>
            </h1>

            <p className="text-sm text-gray-300 mt-1">
              Grab a cup of coffee and start learning!
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center">
        Coming soon...
      </div>
    </div>
  )
}
