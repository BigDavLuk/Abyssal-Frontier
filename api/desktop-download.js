import { head } from "@vercel/blob";
const PATH = "desktop-download/v1.03.zip";
export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") { res.setHeader("Allow", "GET, HEAD"); return res.status(405).end("Method not allowed"); }
  try {
    const blob = await head(PATH, { token: process.env.BLOB_READ_WRITE_TOKEN });
    const target = blob.downloadUrl || (blob.url + (blob.url.includes("?") ? "&" : "?") + "download=1");
    res.setHeader("Cache-Control", "public, max-age=300");
    res.setHeader("Location", target);
    return res.status(302).end();
  } catch { res.setHeader("Cache-Control", "no-store"); return res.status(404).json({ error: "Desktop archive has not been uploaded yet.", uploadPage: "/desktop-download/upload" }); }
}
