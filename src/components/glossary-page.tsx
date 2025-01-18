"use client";
import { Glossary } from "@prisma/client";
import { motion } from "motion/react";
import GlossaryLetterSection from "./glossary/glossary-letter-section";

const glossaryPage = function Page({ glossary }: { glossary: Glossary[] }) {
  // we got glossary with term, group them all by starting letter
  const groupedGlossary = glossary.reduce(
    (acc: { [key: string]: Glossary[] }, item) => {
      const letter = item.term[0].toUpperCase();
      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(item);
      return acc;
    },
    {}
  );

  return (
    <main className="container mx-auto min-h-screen">
      <section className="pt-16 md:pt-32 pb-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-bold text-lg mb-1">Glossary</h1>
          <p className="">
            On this page you can review all important AI and Machine Learning
            terms.
          </p>
        </motion.div>
        {Object.entries(groupedGlossary).map(([letter, terms], index) => (
          <GlossaryLetterSection
            key={letter}
            letter={letter}
            terms={terms}
            index={index}
          />
        ))}
      </section>
    </main>
  );
};

export default glossaryPage;
