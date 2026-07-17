import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a2540 0%, #1e5aa8 100%)",
          color: "#ffffff",
          fontSize: 84,
          letterSpacing: -4,
          lineHeight: 1,
        }}
      >
        D&V
      </div>
    ),
    size,
  );
}
