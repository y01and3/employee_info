import { motion } from "framer-motion";

interface AvatarProps {
  className?: string;
  src?: string;
}

const Avatar = ({ className, src }: AvatarProps) => {
  return (
    <motion.div
      className={className ? className : ""}
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
