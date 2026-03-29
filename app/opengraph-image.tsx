import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function fileToDataUri(relativePath: string) {
  const file = await readFile(path.join(process.cwd(), relativePath));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function Image() {
  const markSrc = await fileToDataUri("public/brand/cirro-mark-white.png");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(7,18,28,1) 0%, rgba(19,42,63,1) 56%, rgba(30,59,87,1) 100%)",
          color: "#f7fbff",
          padding: "56px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "86px",
              width: "86px",
              borderRadius: "28px",
              background: "linear-gradient(180deg, rgba(17,32,48,1) 0%, rgba(42,73,104,1) 100%)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 26px 60px -28px rgba(4,11,18,0.85)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" height="46" src={markSrc} width="46" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.04em" }}>
              Cirro
            </div>
            <div style={{ fontSize: "20px", color: "#bed5e8" }}>Appstore for drones</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "68px", lineHeight: 1.04, fontWeight: 700, letterSpacing: "-0.05em" }}>
            Deploy custom software to your current drone set-up
          </div>
          <div style={{ fontSize: "28px", lineHeight: 1.35, color: "#d5e4ef" }}>
            No configuration required. Request beta access to explore Cirro.
          </div>
        </div>
      </div>
    ),
    size
  );
}
