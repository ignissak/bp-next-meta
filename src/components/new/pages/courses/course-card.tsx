"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

const CourseCard = ({ course }: { course: Course }) => {
  const calculatePercentage = () => {
    const entries = course.course_chapters.flatMap(
      (c) => c.course_chapter_entries
    );
    const countCompleted = entries.filter((e) => e.completed).length;
    return Math.round((countCompleted / entries.length) * 100);
  };
  let percentage = calculatePercentage();

  useEffect(() => {
    percentage = calculatePercentage();
  }, [course]);

  return (
    <motion.div
      key={course.documentId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 grow",
        course.completed ? "opacity-50" : ""
      )}
    >
      <div className="">
        <img
          src={course.image}
          alt={course.title}
          className="max-h-32 w-full object-cover aspect-auto rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between gap-2 md:col-span-2">
        <div>
          <h3 className="text-lg font-medium text-neutral-100">
            {course.title}
          </h3>
          <p className="text-sm text-neutral-400">{course.description}</p>
        </div>
        <div className="flex gap-3 w-full">
          {course.course_chapters.length > 0 && (
            <Link href={course.link || ""}>
              {course.completed && <Button>Completed</Button>}
              {course.started && !course.completed && (
                <>
                  <Button className="mr-3">Continue</Button>
                  <span className="text-sm text-neutral-400">
                    {percentage}% complete
                  </span>
                </>
              )}
              {!course.started && !course.completed && (
                <Button>Enroll now</Button>
              )}
            </Link>
          )}
          {course.course_chapters.length === 0 && (
            <Button disabled variant="outline">
              Coming soon...
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
