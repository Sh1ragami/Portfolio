import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { scrollController } from "../hooks/useSectionSnapScroll";

export default function Footer() {
  const goToSkills = () => {
    scrollController.scrollToIndex(0);
  };

  return (
    <footer
      className="min-h-screen bg-gradient-to-br from-black via-[#0a0a23]/10 to-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden"
      data-section="Footer"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false }}
        className="text-center text-[5rem] md:text-6xl font-bold text-[#64ffda] mb-12 drop-shadow-xl"
      >
        Thank you for watching
      </motion.h2>

      {/* トップに戻るボタン（拡大アニメーション付き） */}
      <motion.button
        onClick={goToSkills}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false }}
        className="border-2 border-[#64ffda] text-[#64ffda] bg-transparent rounded-full p-[0.8rem] py-2 px-6 text-[2rem] font-semibold hover:bg-[#64ffda]/10 transition duration-300"
      >
        Back to Top
      </motion.button>

      {/* コピーライト（下からふわっと） */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: false }}
        className="absolute bottom-[10vh] text-sm text-[#8892b0] text-center"
      >
        © {new Date().getFullYear()} Haruhisa Shiragami — All Rights Reserved.
      </motion.div>
    </footer>
  );
}
