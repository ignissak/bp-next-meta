"use client";
import { Course } from "@/lib/types";
import { isNaNor } from "@/lib/utils";
import { Observable } from "@legendapp/state";
import { observer, useObservable, useObserve } from "@legendapp/state/react";
import { IconCircleCheckFilled, IconCircleDotted } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ProgressDropdown = observer(
  ({
    course,
    index,
  }: {
    course: Observable<Partial<Course>>;
    index: number;
  }) => {
    if (!course.title || !course.chapters) return <></>;

    let completedEntries = useObservable(0);
    let isCompleted = useObservable(false);
    let percentage = useObservable(0);
    useObserve(() => {
      let entries = 0;
      course.chapters.forEach((chapter) => {
        chapter.course_chapter_entries.forEach((entry) => {
          if (entry.completed.get()) entries++;
        });
      });
      completedEntries.set(entries);
      let totalEntries = course.chapters.reduce(
        (acc, chapter) => acc + chapter.course_chapter_entries.length,
        0
      );
      percentage.set(isNaNor((completedEntries.get() / totalEntries) * 100, 0));
      isCompleted.set(percentage.get() >= 100);
    });

    // TODO: Links

    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <Accordion
          type="single"
          collapsible
          className="w-full bg-card px-4 rounded-lg"
        >
          <AccordionItem value={course.title.get()!!}>
            <AccordionTrigger>
              <div className="flex gap-3 items-center">
                {isCompleted.get() ? (
                  <IconCircleCheckFilled size={24} />
                ) : (
                  <IconCircleDotted size={24} />
                )}
                {course.title.get()} ({percentage.get()}%)
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ml-4 md:ml-8 space-y-4">
              {course.chapters.map((chapter, index) => {
                return (
                  <section key={index} className="flex flex-col space-y-2">
                    <h3 className="font-medium ml-1">{chapter.title.get()}</h3>
                    <section className="ml-2 md:ml-4 flex flex-col space-y-4">
                      {chapter.course_chapter_entries.map((entry, index) => {
                        return (
                          <Link
                            href="#"
                            key={index}
                            className="flex gap-3 items-center hover:opacity-80 transition-opacity duration-200"
                          >
                            {entry.completed.get() ? (
                              <IconCircleCheckFilled size={20} />
                            ) : (
                              <IconCircleDotted size={20} />
                            )}
                            {entry.title.get()}
                          </Link>
                        );
                      })}
                    </section>
                  </section>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    );
  }
);

export default ProgressDropdown;
