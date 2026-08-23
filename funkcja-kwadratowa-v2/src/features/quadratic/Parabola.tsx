type ParabolaProps = {
  a: number;
  b: number;
  c: number;
  width?: number;
  height?: number;
};

function fmt(value: number) {
  const rounded = Number(value.toFixed(2));
  return Object.is(rounded, -0) ? "0" : String(rounded).replace("-", "−");
}

export function formatQuadratic(a: number, b: number, c: number) {
  const parts: string[] = [];

  if (a === 1) parts.push("x²");
  else if (a === -1) parts.push("−x²");
  else parts.push(`${fmt(a)}x²`);

  if (b !== 0) {
    const sign = b > 0 ? "+" : "−";
    const abs = Math.abs(b);
    parts.push(`${sign} ${abs === 1 ? "" : fmt(abs)}x`);
  }

  if (c !== 0) {
    const sign = c > 0 ? "+" : "−";
    parts.push(`${sign} ${fmt(Math.abs(c))}`);
  }

  return parts.join(" ");
}

export default function Parabola({ a, b, c, width = 640, height = 360 }: ParabolaProps) {
  const p = -b / (2 * a);
  const q = a * p * p + b * p + c;
  const xmin = p - 4.5;
  const xmax = p + 4.5;

  const samples: Array<[number, number]> = [];
  for (let i = 0; i <= 160; i += 1) {
    const x = xmin + ((xmax - xmin) * i) / 160;
    samples.push([x, a * x * x + b * x + c]);
  }

  let ymin = Math.min(...samples.map(([, y]) => y));
  let ymax = Math.max(...samples.map(([, y]) => y));
  const padding = (ymax - ymin) * 0.12 + 1;
  ymin -= padding;
  ymax += padding;

  const sx = (x: number) => ((x - xmin) / (xmax - xmin)) * width;
  const sy = (y: number) => height - ((y - ymin) / (ymax - ymin)) * height;
  const path = samples
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
    .join(" ");

  const delta = b * b - 4 * a * c;
  const roots = delta >= 0
    ? [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)]
    : [];

  const xGrid: number[] = [];
  for (let x = Math.ceil(xmin); x <= Math.floor(xmax); x += 1) xGrid.push(x);

  const yStep = Math.max(1, Math.ceil((ymax - ymin) / 8));
  const yGrid: number[] = [];
  for (let y = Math.ceil(ymin / yStep) * yStep; y <= ymax; y += yStep) yGrid.push(y);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="parabola-svg"
      role="img"
      aria-label={`Wykres funkcji f(x) = ${formatQuadratic(a, b, c)}`}
    >
      <rect x="0" y="0" width={width} height={height} className="parabola-bg" />

      {xGrid.map((x) => (
        <line key={`gx-${x}`} x1={sx(x)} y1="0" x2={sx(x)} y2={height} className="parabola-grid" />
      ))}
      {yGrid.map((y) => (
        <line key={`gy-${y}`} x1="0" y1={sy(y)} x2={width} y2={sy(y)} className="parabola-grid" />
      ))}

      {ymin < 0 && ymax > 0 ? (
        <line x1="0" y1={sy(0)} x2={width} y2={sy(0)} className="parabola-axis" />
      ) : null}
      {xmin < 0 && xmax > 0 ? (
        <line x1={sx(0)} y1="0" x2={sx(0)} y2={height} className="parabola-axis" />
      ) : null}

      <path d={path} className="parabola-curve" />

      {roots.map((root, index) => root >= xmin && root <= xmax ? (
        <g key={`root-${index}`}>
          <circle cx={sx(root)} cy={sy(0)} r="5" className="parabola-root" />
          <text x={sx(root)} y={sy(0) - 10} textAnchor="middle" className="parabola-label">{fmt(root)}</text>
        </g>
      ) : null)}

      <circle cx={sx(p)} cy={sy(q)} r="6" className="parabola-vertex" />
      <text
        x={sx(p) + 11}
        y={sy(q) + (a > 0 ? 19 : -11)}
        className="parabola-vertex-label"
      >
        W({fmt(p)}, {fmt(q)})
      </text>
    </svg>
  );
}
