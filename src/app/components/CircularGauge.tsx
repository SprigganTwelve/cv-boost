import { getScoreColor, getScoreLabel } from "../lib/helpers";

const CircularGauge = ({ score, size = 180 }: { score: number; size?: number }) => {
     const r = (size - 20) / 2;
     const circ = 2 * Math.PI * r;
     const dash = (score / 100) * circ;
     const color = getScoreColor(score);
     return (
          <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
               <svg width={size} height={size} aria-hidden="true">
                    <circle
                         cx={size / 2}
                         cy={size / 2}
                         r={r}
                         fill="none"
                         stroke="var(--gauge-track)"
                         strokeWidth="14"
                         className="text-gray-300 dark:text-zinc-600"
                    />
                    <circle
                         cx={size / 2}
                         cy={size / 2}
                         r={r}
                         fill="none"
                         stroke={color}
                         strokeWidth="14"
                         strokeLinecap="square"
                         strokeDasharray={`${dash} ${circ - dash}`}
                    />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-black leading-none" style={{ fontSize: size * 0.27, color }}>
                         {score}
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color }}>
                         {getScoreLabel(score)}
                    </span>
               </div>
          </div>
     );
};

export default CircularGauge;
