import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaVuejs,
  FaWordpress,
  FaPython,
  FaLinux,
  FaGitAlt,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiJquery,
  SiDjango,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiNginx,
  SiVim,
} from "react-icons/si";

const frontEndData = [
  { subject: "HTML/CSS", A: 3 },
  { subject: "JavaScript", A: 2 },
  { subject: "jQuery", A: 1 },
  { subject: "Vue.js/Vue CLI", A: 1 },
  { subject: "CSS FW", A: 1 },
  { subject: "WordPress", A: 2 },
];
const backEndData = [
  { subject: "Python", A: 1 },
  { subject: "Django", A: 1 },
  { subject: "Go", A: 1 },
  { subject: "PostgreSQL", A: 1 },
  { subject: "MySQL", A: 1 },
  { subject: "Nginx", A: 1 },
];
const devOpsData = [
  { subject: "Linux", A: 3 },
  { subject: "Git/GitHub", A: 2 },
  { subject: "Docker", A: 2 },
  { subject: "Docker Compose", A: 1 },
  { subject: "Vim", A: 1 },
  { subject: "AWS", A: 2 },
];

const frontEndIcons = {
  "HTML/CSS": FaHtml5,
  JavaScript: FaJs,
  jQuery: SiJquery,
  "Vue.js/Vue CLI": FaVuejs,
  "CSS FW": FaCss3Alt,
  WordPress: FaWordpress,
};
const backEndIcons = {
  Python: FaPython,
  Django: SiDjango,
  Go: SiGo,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Nginx: SiNginx,
};
const devOpsIcons = {
  Linux: FaLinux,
  "Git/GitHub": FaGitAlt,
  Docker: FaDocker,
  "Docker Compose": FaDocker,
  Vim: SiVim,
  AWS: FaAws,
};

// アニメーション定義
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function SkillsRadarChart() {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center px-8 py-16 bg-[black]/50 overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 1.2 }}
    >
      {/* 背景グラデーション */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-white/5 via-cyan-300/10 to-transparent opacity-20 blur-3xl" />
      </div>

      {/* タイトル */}
      <motion.h2
        className="relative z-10 text-[3rem] font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-[lightblue] via-[lightblue] to-[lightblue]"
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={controls}
      >
        MY Skills
      </motion.h2>

      <div className="grid grid-cols-3 gap-12 w-full max-w-6xl mx-auto relative z-10">
        {[
          {
            title: "Front-end",
            data: frontEndData,
            color: "#f472b6",
            icons: frontEndIcons,
          },
          {
            title: "Back-end",
            data: backEndData,
            color: "#14b8a6",
            icons: backEndIcons,
          },
          {
            title: "DevOps",
            data: devOpsData,
            color: "#fb923c",
            icons: devOpsIcons,
          },
        ].map((block, idx) => (
          <motion.div
            key={block.title}
            className="flex flex-col items-center"
            variants={fadeUp}
            custom={idx + 1}
            initial="hidden"
            animate={controls}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: block.color }}
            >
              {block.title}
            </h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={block.data}>
                  <PolarGrid stroke={block.color} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: block.color, fontSize: 16 }}
                  />
                  <PolarRadiusAxis
                    domain={[0, 5]}
                    stroke={block.color}
                    tick={false}
                  />
                  <Radar
                    dataKey="A"
                    stroke={block.color}
                    fill={block.color}
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {block.data.map((item, i) => {
                const Icon = block.icons[item.subject];
                return (
                  <motion.li
                    key={item.subject}
                    className="flex items-center gap-2"
                    variants={fadeUp}
                    custom={i + 1}
                    initial="hidden"
                    animate={controls}
                  >
                    {Icon && <Icon size={25} color={block.color} />}
                    <span>　</span>
                    <span>
                      {item.subject}: {item.A}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
