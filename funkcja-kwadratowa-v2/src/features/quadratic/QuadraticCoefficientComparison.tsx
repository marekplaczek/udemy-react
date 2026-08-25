import styles from "./QuadraticCoefficientComparison.module.css";

type Curve = {
  a: number;
  label: string;
  className: string;
};

const WIDTH = 640;
const HEIGHT = 340;
const X_MIN = -3;
const X_MAX = 3;
const Y_MIN = -9;
const Y_MAX = 9;

const curves: Curve[] = [
  { a: 0.5, label: "a = 0,5", className: styles.curveWide },
  { a: 1, label: "a = 1", className: styles.curveBase },
  { a: 2, label: "a = 2", className: styles.curveNarrow },
  { a: -1, label: "a = −1", className: styles.curveNegative },
];

function sx(x: number) {
  return ((x - X_MIN) / (X_MAX - X_MIN)) * WIDTH;
}

function sy(y: number) {
  return HEIGHT - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * HEIGHT;
}

function curvePath(a: number) {
  const points: string[] = [];
  for (let i = 0; i <= 180; i += 1) {
    const x = X_MIN + ((X_MAX - X_MIN) * i) / 180;
    const y = a * x * x;
    points.push(`${i === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return points.join(" ");
}

export default function QuadraticCoefficientComparison() {
  const grid = [-3, -2, -1, 0, 1, 2, 3];
  const yGrid = [-8, -4, 0, 4, 8];

  return (
    <div className={styles.card}>
      <div className={styles.title}>Jak współczynnik a zmienia parabolę?</div>
      <p className={styles.intro}>
        Wszystkie cztery wykresy są narysowane na tej samej skali. Dzięki temu można porównać nie tylko kierunek ramion, ale też szerokość paraboli.
      </p>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className={styles.svg} role="img" aria-label="Porównanie wykresów y=ax² dla a równego 0,5, 1, 2 i minus 1">
        <rect width={WIDTH} height={HEIGHT} className={styles.background} />
        {grid.map((x) => <line key={`gx-${x}`} x1={sx(x)} y1="0" x2={sx(x)} y2={HEIGHT} className={styles.grid} />)}
        {yGrid.map((y) => <line key={`gy-${y}`} x1="0" y1={sy(y)} x2={WIDTH} y2={sy(y)} className={styles.grid} />)}
        <line x1="0" y1={sy(0)} x2={WIDTH} y2={sy(0)} className={styles.axis} />
        <line x1={sx(0)} y1="0" x2={sx(0)} y2={HEIGHT} className={styles.axis} />
        {curves.map((curve) => <path key={curve.label} d={curvePath(curve.a)} className={`${styles.curve} ${curve.className}`} />)}
      </svg>

      <div className={styles.legend}>
        {curves.map((curve) => (
          <div className={styles.legendItem} key={curve.label}>
            <span className={`${styles.legendLine} ${curve.className}`} />
            <span>{curve.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.rules}>
        <div><strong>a &gt; 0</strong> — ramiona są skierowane w górę.</div>
        <div><strong>a &lt; 0</strong> — ramiona są skierowane w dół.</div>
        <div><strong>0 &lt; |a| &lt; 1</strong> — parabola jest szersza.</div>
        <div><strong>|a| &gt; 1</strong> — parabola jest węższa.</div>
      </div>
    </div>
  );
}
