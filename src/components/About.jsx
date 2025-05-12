import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./About.module.css"; // CSSのスタイルをそのまま使う場合

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section className={styles.hero}>
      <div
        className={`${styles.content} flex flex-col items-center justify-center min-h-screen text-center`}
      >
        {[
          { text: "ABOUT ME", className: styles.intro },
          { text: "Shiragami Haruhi", className: styles.title },
          {
            text: "Aso College of Information Business, Class of 2027",
            className: styles.subtitle,
          },
          {
            text: "Currently living in Fukuoka.Certified in both Fundamental and Applied Information Technology Engineer Examinations.I enjoy reading and have a strong interest in future technologies. I'm passionate about the fusion of design and technology.",
            className: styles.description,
          },
        ].map((block, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={contentVariants}
            className={block.className}
          >
            {block.text}
          </motion.div>
        ))}

        <motion.a
          href="https://github.com/Sh1ragami"
          target="_blank"
          className={styles.contactBtn}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          GitHubを見てみる
        </motion.a>
      </div>
    </section>
  );
}


