import { motion } from "framer-motion";

export function AmbientLight() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute -top-[28%] -right-[18%] w-[900px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(186,218,245,0.20) 0%, transparent 62%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[22%] -left-[16%] w-[800px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(220,186,100,0.13) 0%, transparent 62%)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
