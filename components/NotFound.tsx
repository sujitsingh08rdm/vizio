import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-indigo-500">404</p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-3 text-gray-500">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
