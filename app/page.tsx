export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
            Nutrition Meal Planner
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            AI-powered meal planning and nutrition tracking
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md">
            Phase 1 foundation is ready. Authentication and API infrastructure are configured.
          </p>
          
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-white transition-colors hover:bg-blue-700 md:w-[158px]"
              href="/login"
            >
              Login
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-zinc-300 px-6 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-900 md:w-[158px]"
              href="/register"
            >
              Register
            </a>
          </div>
        </div>

        <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center max-w-md">
          <p>Phase 1 Implementation</p>
          <p>User authentication and password reset foundations</p>
        </div>
      </main>
    </div>
  );
}
