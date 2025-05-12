// src/components/SectionCard.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function SectionCard({ title, children }) {
  return (
    <motion.div
      className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-10 w-[80vw] max-w-3xl text-center text-white"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
        {title}
      </h2>
      <div className="text-lg leading-relaxed text-gray-200">{children}</div>
    </motion.div>
  );
}
