import { snakeCase } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

const GlossaryEntry = ({
  term,
  definition,
  index,
}: {
  term: string;
  definition: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      className="[&:not(:last-child)]:border-b pb-4 border-muted"
      id={snakeCase(term)}
    >
      { /* TODO: Toast: add to clipboard */ }
      <Link href={"#" + snakeCase(term)} className="text-lg font-medium mb-2">{term}</Link>
      <p className="">{definition}</p>
    </motion.div>
  );
};

export default GlossaryEntry;
