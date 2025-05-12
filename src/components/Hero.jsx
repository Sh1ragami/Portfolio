import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { scrollController } from "../hooks/useSectionSnapScroll";

// Motion variants
const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};
const navList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};
const fadeLoop = {
  animate: { opacity: [0.5, 1, 0.5] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

export default function Hero() {
    // eslint-disable-next-line no-unused-vars
    const goToSkills = () => {
      scrollController.scrollToIndex(0); // ひとつ前のセクションへ移動
    };
  return (
    <section className={styles.hero}>
      {/* Navigation */}
      <motion.nav
        className={styles.nav}
        initial="hidden"
        animate="visible"
        variants={navList}
      >
        <div className={styles.logo}>
          <motion.span className={styles.logoLetter} variants={navItem}>
            B
          </motion.span>
        </div>

        <ul className={styles.menu}>
          {[
            { id: "about", label: "About", index: 2 },
            { id: "experience", label: "Skills", index: 4 },
            { id: "work", label: "Projects", index: 6 },
            { id: "contact", label: "Awards", index: 8 },
          ].map((item, i) => (
            <motion.li key={item.id} variants={navItem}>
              <a
                onClick={() => scrollController.scrollToIndex(item.index)}
                className={styles.menuLink}
              >
                <span className={styles.menuIndex}>0{i + 1}.</span> {item.label}
              </a>
            </motion.li>
          ))}
          <motion.li variants={navItem}>
            <button className={styles.resume}>Resume</button>
          </motion.li>
        </ul>
      </motion.nav>

      {/* Content */}
      <div className={styles.content}>
        {[
          { text: "Hi, my name is", className: styles.intro },
          { text: "Sh1ragami.", className: styles.title },
          { text: "I build things for the web.", className: styles.subtitle },
          {
            text: "I'm a software engineer based in Fukuoka, MA specializing in building (and occasionally designing) exceptional, high-quality websites and applications.",
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
        <motion.button
          className={styles.contactBtn}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Get In Touch
        </motion.button>
      </div>

      {/* Social Links */}
      <motion.div
        className={styles.social}
        initial={{ opacity: 0 }}
        animate={fadeLoop.animate}
        transition={fadeLoop.transition}
      >
        {[
          { href: "https://github.com", label: "GitHub" },
          { href: "https://linkedin.com", label: "LinkedIn" },
          { href: "https://codepen.io", label: "CodePen" },
          { href: "https://instagram.com", label: "Instagram" },
          { href: "https://twitter.com", label: "Twitter" },
        ].map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            whileHover={{ scale: 1.2, color: "#64ffda" }}
            className={styles.socialLink}
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Email */}
      <motion.div
        className={styles.email}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.a whileHover={{ x: 5 }}>2301016@s.asojuku.ac.jp</motion.a>
      </motion.div>
    </section>
  );
}
