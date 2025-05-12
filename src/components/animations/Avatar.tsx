import { motion } from "framer-motion";

interface AvatarProps {
  edge?: number;
  className?: string;
  src?: string;
}

const Avatar = ({ className, src, edge }: AvatarProps) => {
  return (
    <motion.div
      className={className ? className : ""}
      style={{
        width: edge || "max(20vw, 30vh)",
        height: edge || "max(20vw, 30vh)",
        padding: edge ? edge / 10 : "max(2vw, 3vh)",
        border: "2px solid #000",
        borderRadius: "100%",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.img
        alt="Avatar"
        draggable={false}
        src={src}
        style={{ borderRadius: "100%" }}
        whileHover={{ scale: 1.25 }}
      />
    </motion.div>
  );
};

export default Avatar;
