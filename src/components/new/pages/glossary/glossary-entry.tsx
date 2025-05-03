import { motion } from "motion/react";
import Markdown from "react-markdown";

const GlossaryEntry = ({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) => {
  return (
    <motion.div
      key={term}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-base text-neutral-100">{term}</h3>
      {/* <p className="text-neutral-400">{definition}</p> */}
      <div className="md-glossary">
        <Markdown>{definition}</Markdown>
      </div>
    </motion.div>
  );
};

export default GlossaryEntry;
