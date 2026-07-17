import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 21,
          letterSpacing: -1,
          lineHeight: 1,
        }}
      >
        DV
      </div>
    ),
    size,
  );
}
