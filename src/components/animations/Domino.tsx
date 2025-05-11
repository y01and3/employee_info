import React from "react";
import { motion } from "framer-motion";

interface DominoProps {
  children?: React.ReactNode;
  className?: string;
}

const Domino = ({ children, className }: DominoProps) => {
  return <motion.div className={className}>{children}</motion.div>;
};
export default Domino;
