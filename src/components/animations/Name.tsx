import { motion } from "framer-motion";
import React from "react";

interface NameProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

const Name = ({ children, className, style }: NameProps) => {
  const [rotatingIndex, setRotatingIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * children.length);

      setRotatingIndex(randomIndex);

      setTimeout(() => setRotatingIndex(null), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [children]);

  return (
    <div className={`name-container ${className}`} style={style}>
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          animate={rotatingIndex === index ? { rotate: 30 } : { rotate: 0 }}
          className="inline-block"
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default Name;
