"use client";
import { Course } from "@/lib/types";
import { IconCircleCheckFilled, IconCircleDotted } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ProgressDropdown = ({
  course,
  index,
}: {
  course: Partial<Course>;
  index: number;
}) => {
  if (!course.title || !course.chapters) return <></>;

  const completedChapters = course.chapters.filter(
    (chapter) => chapter.completed
  ).length;
  const isCompleted = completedChapters === course.chapters.length;
  const percentage = Math.round(
    (completedChapters / course.chapters.length) * 100
  );

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
        <AccordionItem value={course.title}>
          <AccordionTrigger>
            <div className="flex gap-3 items-center">
              {isCompleted ? (
                <IconCircleCheckFilled size={24} />
              ) : (
                <IconCircleDotted size={24} />
              )}
              {course.title} ({percentage}%)
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col ml-4 md:ml-8 space-y-4">
            {course.chapters.map((chapter, index) => {
              return (
                <Link
                  href="#"
                  key={index}
                  className="flex gap-3 items-center hover:opacity-80 transition-opacity duration-200"
                >
                  {chapter.completed ? (
                    <IconCircleCheckFilled size={20} />
                  ) : (
                    <IconCircleDotted size={20} />
                  )}
                  {chapter.title}
                </Link>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default ProgressDropdown;
