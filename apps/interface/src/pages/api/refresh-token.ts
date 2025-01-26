import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    const data = await response.json();
    return res.status(200).json({
      accessToken: data.access_token
    });
  } catch (error) {
    console.error("Error refreshing token", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
