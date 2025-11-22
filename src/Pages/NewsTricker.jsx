import React from "react";
import { motion } from "framer-motion";

const NewsTicker = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-purple-600 text-white py-3">
      <motion.div
        className="text-lg font-semibold"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        📢 New Arrivals This Week — 30% Off All Fiction • Author Meetup on
        Friday • Explore Our Digital Library • Book Haven — Your Reading
        Companion 📚
      </motion.div>

      
    </div>
  );
};

export default NewsTicker;
