export interface MeshyGrabStats {
  users: number;
  downloads: number;
  installations: number;
  updatedAt: string;
}

const STATS_CACHE_TTL_MS = 60 * 60 * 1000;

let cachedStats: MeshyGrabStats | null = null;

export async function getMeshyGrabStats(): Promise<MeshyGrabStats> {
  // Reuse the snapshot while it is within its original freshness window.
  if (cachedStats) {
    const snapshotTime = Date.parse(cachedStats.updatedAt);

    if (
      Number.isFinite(snapshotTime) &&
      Date.now() < snapshotTime + STATS_CACHE_TTL_MS
    ) {
      return cachedStats;
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const version = process.env.NEXT_PUBLIC_API_VERSION || "v3";

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/${version}/stats`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: HTTP ${res.status}`);
  }

  const data: MeshyGrabStats = await res.json();

  if (
    !Number.isSafeInteger(data.users) ||
    !Number.isSafeInteger(data.downloads) ||
    !Number.isSafeInteger(data.installations) ||
    typeof data.updatedAt !== "string" ||
    !Number.isFinite(Date.parse(data.updatedAt))
  ) {
    throw new Error("Invalid stats response");
  }

  cachedStats = data;
  return data;
}
