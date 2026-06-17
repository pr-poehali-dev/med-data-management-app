interface SparklineProps {
  data: { value: number }[];
  color?: string;
  height?: number;
  showArea?: boolean;
}

const Sparkline = ({ data, color = '175 70% 41%', height = 48, showArea = true }: SparklineProps) => {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 100;
  const h = height;
  const pad = 4;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - pad - ((d.value - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const line = points.map((p, i) => (i === 0 ? `M ${p}` : `L ${p}`)).join(' ');
  const area = `${line} L ${w},${h} L 0,${h} Z`;
  const gid = `g-${color.replace(/\D/g, '')}-${height}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${color})`} stopOpacity="0.35" />
          <stop offset="100%" stopColor={`hsl(${color})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showArea && <path d={area} fill={`url(#${gid})`} />}
      <path d={line} fill="none" stroke={`hsl(${color})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={(1) * w}
        cy={h - pad - ((values[values.length - 1] - min) / range) * (h - pad * 2)}
        r="3.5"
        fill={`hsl(${color})`}
      />
    </svg>
  );
};

export default Sparkline;
