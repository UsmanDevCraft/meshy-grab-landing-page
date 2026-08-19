import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-page px-6 text-center">
      {/* Subtle background glows — same as hero */}
      <div
        className="pointer-events-none absolute right-[-80px] top-[15%] h-[300px] w-[300px] bg-gradient-radial-lime opacity-50 blur-3xl sm:right-0 sm:h-[400px] sm:w-[400px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[10%] left-[-80px] h-[250px] w-[250px] bg-gradient-radial-pink opacity-40 blur-3xl sm:left-0 sm:h-[320px] sm:w-[320px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(197,249,85,0.03),transparent_60%)]"
        aria-hidden="true"
      />

      {/* Large logo image */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-3xl bg-lime/10 blur-2xl" />
        <Image
          src="/apple-touch-icon.png"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>

      {/* 404 */}
      <h1 className="text-7xl font-extrabold tracking-tighter sm:text-8xl md:text-9xl">
        <span className="bg-[linear-gradient(90deg,#C5F955_0%,#FF3E8F_100%)] bg-clip-text text-transparent">
          404
        </span>
      </h1>

      {/* Message */}
      <p className="mt-4 text-xl font-semibold text-text-secondary sm:text-2xl">
        Page not found.
      </p>
      <p className="mt-2 max-w-md text-sm text-text-muted sm:text-base">
        The page you are looking for does not exist. It might have been moved,
        deleted, or you followed a broken link.
      </p>

      {/* CTA */}
      <div className="mt-10">
        <Link
          href="/"
          className="btn btn-primary group inline-flex items-center gap-2"
        >
          Back to MeshyGrab
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
