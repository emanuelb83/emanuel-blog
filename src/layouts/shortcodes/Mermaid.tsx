import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

interface Props {
  chart: string;
}

let mermaidInitialized = false;

export default function Mermaid({ chart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#66e197",
          primaryTextColor: "#ceced0",
          primaryBorderColor: "#2f4050",
          lineColor: "#66e197",
          secondaryColor: "#17212b",
          tertiaryColor: "#1e2d3d",
          background: "#17212b",
          mainBkg: "#1e2d3d",
          nodeBorder: "#2f4050",
          clusterBkg: "#17212b",
          titleColor: "#ffffff",
          edgeLabelBackground: "#17212b",
        },
        securityLevel: "loose",
        fontFamily: "var(--font-primary, sans-serif)",
      });
      mermaidInitialized = true;
    }

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

    mermaid
      .render(id, chart.trim())
      .then(({ svg: renderedSvg }) => {
        setSvg(renderedSvg);
        setError("");
      })
      .catch((err: Error) => {
        setError(err.message ?? "Errore nel rendering del diagramma.");
        setSvg("");
      });
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
        <strong>Mermaid error:</strong> {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram not-prose my-8 flex justify-center overflow-auto rounded border border-border p-6"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
