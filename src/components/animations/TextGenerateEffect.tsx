import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

interface TextGenerateEffectProps {
  words: string;
  style?: React.CSSProperties;
  className?: string;
  filter?: boolean;
  duration?: number;
}

const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  style,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      },
    );
  }, [animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className={className}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={"font-bold " + (className ?? "")} style={style}>
      <div className="mt-4">
        <div className=" dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
