"use client";
import { Glossary } from "@prisma/client";
import { motion } from "motion/react";
import GlossaryEntry from "./glossary-entry";

const GlossaryLetterSection = ({
  letter,
  terms,
  index,
}: {
  letter: string;
  terms: Glossary[];
  index: number;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <h2 className="text-xl font-semibold mb-4">{letter}</h2>
      <div className="space-y-4 ">
        {terms.map((term, index) => (
          <GlossaryEntry
            key={term.id}
            term={term.term}
            definition={term.definition}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default GlossaryLetterSection;
