/**
 * Parse and normalize the comma-separated allowlist of emails from environment variables.
 * - split by comma
 * - trim whitespace
 * - lowercase emails
 * - ignore empty entries
 */
export function getFavLifetimeEmails(): string[] {
  const rawEmails = process.env.NEXT_PUBLIC_FAV_LIFETIME_EMAILS || "";

  return rawEmails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);
}

/**
 * Determine whether a given user email is in the Fav Lifetime allowlist.
 */
export function isFavLifetimeUser(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowlist = getFavLifetimeEmails();
  return allowlist.includes(email.trim().toLowerCase());
}
