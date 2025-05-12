import React, { useMemo } from "react";
import styles from "./Awards.module.css";
import {
  FaSchool,
  FaMobileAlt,
  FaCogs,
  FaLaptopCode,
  FaRobot,
  FaShieldAlt,
  FaAward,
  FaMicrophone,
  FaTrophy,
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // animation用

const timelineData = [
  {
    title: "B3 - Blockchain Bootcamp & Business plan Workshop -",
    start: "2024-06-28",
    end: "2024-10-23",
    result: "参加",
    Icon: FaSchool,
    color: "#f39c12",
  },
  {
    title: "九州アプリチャレンジ・キャラバン 2024コンテスト(チャレキャラ)",
    start: "2024-06-29",
    end: "2024-12-14",
    result: "健闘賞",
    Icon: FaMobileAlt,
    color: "#e67e22",
  },
  {
    title: "Engineer Driven Day (EDD) 2024",
    start: "2024-08-02",
    end: "2024-12-19",
    result: "ライブリンクス賞",
    Icon: FaCogs,
    color: "#9b59b6",
  },
  {
    title: "OPEN HACK U 2024 FUKUOKA",
    start: "2024-08-08",
    end: "2024-08-20",
    result: "参加",
    Icon: FaLaptopCode,
    color: "#3498db",
  },
  {
    title: "株式会社B.P.WORKS LINEbotハッカソン",
    start: "2024-09-06",
    end: "2024-09-06",
    result: "優勝",
    Icon: FaRobot,
    color: "#2ecc71",
  },
  {
    title: "MBSD Cybersecurity Challenges 2024",
    start: "2024-10-15",
    end: "2024-12-12",
    result: "最優秀賞",
    Icon: FaShieldAlt,
    color: "#e74c3c",
  },
  {
    title: "FUKUOKA学生ビジコン2024（ブロックチェーン部門）",
    start: "2024-10-26",
    end: "2024-10-26",
    result: "ブロックチェーン特別賞",
    Icon: FaAward,
    color: "#1abc9c",
  },
  {
    title: "ブロックチェーンフォーラム 登壇",
    start: "2024-11-28",
    end: "2024-11-28",
    result: "登壇",
    Icon: FaMicrophone,
    color: "#f1c40f",
  },
  {
    title: "技育博 サイバーエージェント賞",
    start: "2024-12-14",
    end: "2024-12-14",
    result: "サイバーエージェント賞",
    Icon: FaTrophy,
    color: "#34495e",
  },
];

// animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AwardsInfographic = () => {
  const { startDate, totalMs, months } = useMemo(() => {
    const allMs = timelineData.flatMap(({ start, end }) => [
      new Date(start).getTime(),
      new Date(end).getTime(),
    ]);
    const minT = Math.min(...allMs);
    const maxT = Math.max(...allMs);
    const s = new Date(
      new Date(minT).getFullYear(),
      new Date(minT).getMonth(),
      1
    );
    const e = new Date(
      new Date(maxT).getFullYear(),
      new Date(maxT).getMonth() + 1,
      0
    );
    const mList = [];
    for (
      let cur = new Date(s);
      cur <= e;
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1)
    ) {
      mList.push(new Date(cur));
    }
    return { startDate: s, totalMs: e.getTime() - s.getTime(), months: mList };
  }, []);

  const formatMY = (date) =>
    `${String(date.getMonth() + 1).padStart(2, "0")} ${date.getFullYear()}`;

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className={styles.wrapper}>
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={fadeUp}
        className="text-[3rem] mt-[1rem] font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[lightblue] via-[lightblue] to-[lightblue]"
      >
        Awards
      </motion.h1>
      <div className={styles.timeline}>
        <div className={styles.line} />

        {months.map((m, i) => {
          const left = ((m.getTime() - startDate.getTime()) / totalMs) * 100;
          const label = m
            .toLocaleString("default", { month: "short" })
            .toUpperCase();
          return (
            <span
              key={i}
              className={styles.monthLabel}
              style={{ left: `${left}%` }}
            >
              {label}
            </span>
          );
        })}

        {timelineData.map((item, i) => {
          const t0 = new Date(item.start).getTime();
          const rawPct = ((t0 - startDate.getTime()) / totalMs) * 100;
          const offset = -9; // 左に10%ずらす
          const leftPct = Math.min(Math.max(rawPct + offset, 0), 90);
          const posClass = i % 2 === 0 ? styles.above : styles.below;

          return (
            <motion.div
              key={i}
              className={`${styles.card} ${posClass}`}
              style={{ left: `${leftPct}%` }}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              variants={cardVariants}
            >
              <div className={styles.icon} style={{ color: item.color }}>
                <item.Icon />
              </div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.dateRange}>
                {formatMY(new Date(item.start))} –{" "}
                {formatMY(new Date(item.end))}
              </div>
              <div className={styles.badge}>{item.result}</div>
              <div className={styles.connector} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AwardsInfographic;
