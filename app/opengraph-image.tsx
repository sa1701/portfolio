import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Seif Ali — AI & Big Data engineer, Sydney. Builds AI systems that run where the data lives.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Fetch a Google-Fonts face as raw TTF/OTF for satori. `text` keeps the
 * subset tiny. Returns null on any failure so the card still renders with
 * the default face instead of 500ing the whole route.
 */
async function loadGoogleFont(family: string, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(
      /src: url\((.+?)\) format\('(opentype|truetype)'\)/
    );
    if (!resource) return null;
    const res = await fetch(resource[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const displayText = "Seif Ali";
  const fraunces = await loadGoogleFont(
    "Fraunces:opsz,wght@144,900",
    displayText
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0d0c0a",
          backgroundImage:
            "linear-gradient(#ece7dc14 1px, transparent 1px), linear-gradient(90deg, #ece7dc14 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          color: "#ece7dc",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Signal hairline across the top */}
        <div
          style={{
            height: 6,
            width: "100%",
            backgroundColor: "#ff4d00",
            display: "flex",
          }}
        />

        {/* Corner registration ticks */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 26,
            height: 26,
            borderTop: "3px solid #ff4d00",
            borderLeft: "3px solid #ff4d00",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            width: 26,
            height: 26,
            borderBottom: "3px solid #ff4d00",
            borderRight: "3px solid #ff4d00",
            display: "flex",
          }}
        />

        {/* Sheet annotations */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "44px 72px 0",
            fontSize: 20,
            letterSpacing: "0.2em",
            color: "#97907f",
          }}
        >
          <span>DOC. SA-2026 / REV 07</span>
          <span>SYDNEY, AU — 33.87°S 151.21°E</span>
        </div>

        {/* Main block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 21,
              letterSpacing: "0.18em",
              color: "#97907f",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: "#3dd68c",
                display: "flex",
              }}
            />
            <span>OPEN TO 2027 GRADUATE ROLES &amp; INTERNSHIPS</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 900,
              fontFamily: fraunces ? "Fraunces" : "serif",
              lineHeight: 1,
              marginTop: 18,
              letterSpacing: "-0.02em",
            }}
          >
            {displayText}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 38,
              marginTop: 28,
              color: "#ece7dc",
            }}
          >
            <span>
              Builds AI systems that run{" "}
              <span style={{ color: "#ff4d00", marginLeft: 10 }}>
                where the data lives.
              </span>
            </span>
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #ece7dc47",
            margin: "0 72px",
            padding: "26px 0 40px",
            fontSize: 20,
            letterSpacing: "0.2em",
            color: "#97907f",
          }}
        >
          <span>AI &amp; BIG DATA — UNIVERSITY OF WOLLONGONG</span>
          <span style={{ color: "#ece7dc" }}>
            SEIF<span style={{ color: "#ff4d00" }}>·</span>ALI
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fraunces
        ? [{ name: "Fraunces", data: fraunces, weight: 900 as const, style: "normal" as const }]
        : undefined,
    }
  );
}
