"use client";
import { Input } from "@/components/ui/input";
import {
  observer,
  useObservable,
  useObserveEffect,
} from "@legendapp/state/react";
import { Glossary } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import GlossaryEntry from "./glossary-entry";

const GlossaryCatalog = observer(({ data }: { data: Glossary[] }) => {
  const $search = useObservable("");
  const $filtered = useObservable([] as Glossary[]);
  const $glossary = useObservable(data);

  useObserveEffect($search, () => {
    $filtered.set(
      $glossary
        .get()
        .filter(
          (glossary) =>
            glossary.term.toLowerCase().includes($search.get().toLowerCase()) ||
            glossary.definition
              .toLowerCase()
              .includes($search.get().toLowerCase())
        )
    );
  });
  return (
    <>
      <section className="flex flex-col gap-6 mb-6">
        <div id="catalogSearch" className="relative">
          <Input
            id="search"
            type="text"
            className="w-full pl-9"
            placeholder="Search the glossary..."
            onChange={(e) => {
              $search.set(e.target.value);
            }}
          />
          <IconSearch className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 select-none opacity-50" />
        </div>
        <motion.div id="catalog" className="flex flex-col gap-6">
          <AnimatePresence>
            {$filtered.map((item, index) => (
              <GlossaryEntry
                term={item.term.get()}
                definition={item.definition.get()}
                key={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
});

export default GlossaryCatalog;
