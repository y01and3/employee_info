import { motion } from "framer-motion";
import React from "react";

interface NameProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

const Name = ({ children, className, style }: NameProps) => {
  const [rotatingIndex, setRotatingIndex] = React.useState<number | null>(null);
  const chars = React.useMemo(() => Array.from(children), [children]);

  React.useEffect(() => {
    if (chars.length === 0) {
      return;
    }
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * chars.length);

      setRotatingIndex(randomIndex);

      timeoutId = setTimeout(() => setRotatingIndex(null), 1000);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [chars]);

  return (
    <div className={`name-container ${className ?? ""}`} style={style}>
      {chars.map((char, index) => (
        <motion.span
          key={char + index}
          animate={rotatingIndex === index ? { rotate: 30 } : { rotate: 0 }}
          className="inline-block"
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default Name;
