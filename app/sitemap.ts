import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://meshygrab.com";
  // const baseUrl = "https://meshygrab.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: "2026-11-16",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/plans`,
      lastModified: "2026-11-16",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: "2026-10-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2026-10-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: "2026-10-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
