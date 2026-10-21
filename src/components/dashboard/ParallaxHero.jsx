import { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import MountainArt from "../../assets/images/MainPeak.webp";
import { EASE_OUT } from "../../animations/variants";

function seededRandom(seed) {
  let s = seed;

  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeBuildings(seed, minH, maxH, width = 1600) {
  const rnd = seededRandom(seed);
  const list = [];

  for (let x = 0; x < width; ) {
    const w = 28 + rnd() * 52;

    list.push({
      x,
      w,
      h: minH + rnd() * (maxH - minH),
      antenna: rnd() > 0.8,
      crown: rnd() > 0.7,
    });

    x += w + rnd() * 5;
  }

  return list;
}

function Skyline({ id, seed, minH, maxH, color, windows = false, glow = [] }) {
  const buildings = useMemo(
    () => makeBuildings(seed, minH, maxH),
    [seed, minH, maxH],
  );

  const blinking = useMemo(() => {
    const rnd = seededRandom(seed + 7);

    return buildings
      .filter(() => rnd() > 0.72)
      .map((b, i) => ({
        x: b.x + 6 + rnd() * (b.w - 14),
        y: 300 - b.h + 12 + rnd() * (b.h - 30),
        d: (i % 6) * 0.7,
      }));
  }, [buildings, seed]);

  return (
    <svg
      viewBox="0 0 1600 300"
      preserveAspectRatio="xMidYMax slice"
      className="size-full"
      aria-hidden="true">
      {windows && (
        <defs>
          <pattern id={id} width="9" height="12" patternUnits="userSpaceOnUse">
            <rect
              x="2.5"
              y="3"
              width="3"
              height="4.5"
              rx=".6"
              fill="#f6c98d"
              opacity=".55"
            />
          </pattern>
        </defs>
      )}

      <g fill={color}>
        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={300 - b.h} width={b.w} height={b.h + 2} />

            {b.crown && (
              <rect
                x={b.x + b.w * 0.2}
                y={300 - b.h - 10}
                width={b.w * 0.6}
                height="11"
              />
            )}

            {b.antenna && (
              <rect
                x={b.x + b.w / 2 - 0.8}
                y={300 - b.h - 30}
                width="1.6"
                height="30"
              />
            )}
          </g>
        ))}
      </g>

      {windows && (
        <>
          <g fill={`url(#${id})`}>
            {buildings.map((b, i) => (
              <rect
                key={i}
                x={b.x + 3}
                y={300 - b.h + 6}
                width={Math.max(b.w - 6, 0)}
                height={b.h - 8}
              />
            ))}
          </g>

          {blinking.map((w, i) => (
            <rect
              key={i}
              x={w.x}
              y={w.y}
              width="3.4"
              height="5"
              rx=".6"
              fill="#ffe2b0"
              className="animate-pulse"
              style={{
                animationDelay: `${w.d}s`,
                animationDuration: "3.2s",
              }}
            />
          ))}
        </>
      )}

      {glow.length > 0 && (
        <rect
          x="0"
          y="262"
          width="1600"
          height="38"
          fill={glow[0]}
          opacity={glow[1]}
        />
      )}
    </svg>
  );
}

function Layer({ depth, mx, my, progress, reduce, className = "", children }) {
  const x = useTransform(mx, [-0.5, 0.5], [depth * -34, depth * 34]);

  const yMouse = useTransform(my, [-0.5, 0.5], [depth * -12, depth * 12]);

  const yScroll = useTransform(progress, [0, 1], [depth * -70, depth * 70]);

  const y = useTransform([yMouse, yScroll], ([a, b]) => a + b);

  return (
    <motion.div
      style={reduce ? undefined : { x, y }}
      className={`pointer-events-none absolute inset-x-[-6%] inset-y-[-4%] ${className}`}>
      {children}
    </motion.div>
  );
}

const STARS = Array.from({ length: 26 }, (_, i) => {
  const r = seededRandom(i + 11);

  return {
    left: r() * 100,
    top: r() * 34,
    size: 1 + r() * 2,
    delay: r() * 4,
  };
});

export default function ParallaxHero({ badge, title, subtitle, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const mx = useSpring(rawX, {
    stiffness: 60,
    damping: 18,
  });

  const my = useSpring(rawY, {
    stiffness: 60,
    damping: 18,
  });

  const onMove = (event) => {
    const element = ref.current;

    // Elemen mungkin belum tersedia atau sudah dilepas.
    if (!element) return;

    const rect = element.getBoundingClientRect();

    // Jangan hitung posisi apabila elemen belum memiliki ukuran.
    if (!rect.width || !rect.height) return;

    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const shared = {
    mx,
    my,
    progress,
    reduce,
  };

  const textY = useTransform(progress, [0, 1], [30, -30]);

  return (
    <motion.section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="isolate relative bg-primaryForest rounded-[2rem] h-[26rem] sm:h-[30rem] lg:h-[34rem] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,#14302a 0%,#244b3a 38%,#8aa68a 66%,#efcf9f 88%,#f6d9b0 100%)",
        }}
      />

      {STARS.map((star, i) => (
        <motion.span
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={reduce ? undefined : { opacity: [0.15, 0.9, 0.15] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <Layer depth={0.1} {...shared}>
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.85, 1, 0.85],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="top-[34%] right-[22%] absolute rounded-full size-56 sm:size-72"
          style={{
            background:
              "radial-gradient(circle,#ffe3b3 0%,#f4b97a 38%,rgba(244,185,122,0) 70%)",
          }}
        />
      </Layer>

      <Layer depth={0.2} {...shared}>
        {[
          {
            top: "16%",
            w: 300,
            dur: 70,
            from: "-20%",
            to: "110%",
            op: 0.18,
          },
          {
            top: "30%",
            w: 220,
            dur: 95,
            from: "110%",
            to: "-25%",
            op: 0.14,
          },
        ].map((cloud, i) => (
          <motion.div
            key={i}
            className="absolute bg-white blur-2xl rounded-full h-14"
            style={{
              top: cloud.top,
              width: cloud.w,
              opacity: cloud.op,
            }}
            animate={reduce ? undefined : { left: [cloud.from, cloud.to] }}
            transition={{
              duration: cloud.dur,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </Layer>

      <Layer depth={0.45} {...shared}>
        <img
          src={MountainArt}
          alt=""
          fetchPriority="high"
          className="bottom-[10%] absolute inset-x-0 w-full h-[88%] object-[70%_bottom] object-cover"
        />
      </Layer>

      <Layer depth={0.7} {...shared}>
        <div className="bottom-[4%] absolute inset-x-0 opacity-80 h-[34%]">
          <Skyline
            id="win-far"
            seed={42}
            minH={70}
            maxH={170}
            color="#5f8a73"
            glow={["#efcf9f", 0.35]}
          />
        </div>
      </Layer>

      <Layer depth={1.1} {...shared}>
        <div className="-bottom-[2%] absolute inset-x-0 h-[30%]">
          <Skyline
            id="win-near"
            seed={7}
            minH={60}
            maxH={150}
            color="#132a21"
            windows
          />
        </div>
      </Layer>

      <Layer depth={1.5} {...shared}>
        <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-[#0d1f18] to-transparent h-[14%]" />
      </Layer>

      <div className="absolute inset-0 bg-gradient-to-r from-[#10261d]/85 via-[#10261d]/30 to-transparent pointer-events-none" />

      <motion.div
        style={reduce ? undefined : { y: textY }}
        className="z-10 relative flex flex-col justify-center gap-4 p-6 sm:p-10 max-w-xl h-full">
        {badge && (
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: EASE_OUT,
            }}
            className="self-start bg-secondarySage px-3 py-1 rounded-full font-satoshi text-primaryForest text-sm">
            {badge}
          </motion.span>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: EASE_OUT,
          }}
          className="font-switzer font-semibold text-white text-3xl sm:text-5xl leading-[1.05]">
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.55,
            duration: 0.7,
            ease: EASE_OUT,
          }}
          className="max-w-md font-satoshi text-white/90 text-base sm:text-lg">
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.6,
            ease: EASE_OUT,
          }}
          className="flex flex-wrap gap-3 pt-2">
          {children}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
