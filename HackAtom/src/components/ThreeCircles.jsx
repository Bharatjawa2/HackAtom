import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThreeCircles() {
  const circles = [
    { name: "Personal", color: "#4CAF50" },
    { name: "Medical", color: "#2196F3" },
    { name: "Engineer", color: "#FF9800" },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <AnimatePresence>
        {selected === null ? (
          // Show all circles
          <div className="flex gap-8">
            {circles.map((circle) => (
              <motion.div
                key={circle.name}
                onClick={() => setSelected(circle.name)}
                className="w-32 h-32 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer shadow-lg"
                style={{ backgroundColor: circle.color }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {circle.name}
              </motion.div>
            ))}
          </div>
        ) : (
          // Show only selected as a quarter-circle in top-left
          circles
            .filter((c) => c.name === selected)
            .map((circle) => (
              <motion.div
                key={circle.name}
                className="absolute flex items-start justify-start p-4 text-white text-sm font-medium shadow-lg"
                style={{
                  backgroundColor: circle.color,
                  borderBottomRightRadius: "100%",
                  width: "200px",
                  height: "200px",
                  top: 0,
                  left: 0,
                }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 200, height: 200, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {circle.name}
              </motion.div>
            ))
        )}
      </AnimatePresence>
    </div>
  );
}
