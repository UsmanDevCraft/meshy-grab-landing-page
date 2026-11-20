import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://meshygrab.com";
  // const baseUrl = "https://meshygrab.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/checkout", "/thanks"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
