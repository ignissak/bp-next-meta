"use client";
import { getUserProgress } from "@/actions";
import { Observable } from "@legendapp/state";
import { clsx, type ClassValue } from "clsx";
import { motion } from "motion/react";
import { Session } from "next-auth";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { store$ } from "./store";
import { Course, ICoursePageContent } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const snakeCase = (input: string) => {
  return input
    .replace(/\d+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

export const MotionLink = motion.create(Link);

export const isNaNor = (value: any, fallback: any) => {
  return isNaN(value) ? fallback : value;
};

export const getProgress = async (session: Session | null) => {
  if (!session?.user) {
    return store$.progress.get();
  } else {
    if (session.user?.id) {
      return await getUserProgress(session.user.id);
    }
    return null;
  }
};

/**
 * Marks the entries as completed based on the user's progress
 * User progress is fetched dynamically, if the user is logged in, otherwise it's fetched from the local storage
 * @param session User session
 * @param $courses Observable of courses to look through
 * @returns
 */
export const loadUserProgress = async (
  session: Session | null,
  $courses: Observable<Course[]>
) => {
  let progress = await getProgress(session);
  if (!progress) return $courses;
  console.debug("Progress:", progress);
  for (const p of progress) {
    // find entry that matches one from progress, mark it as completed
    const course = $courses.get().find((c) => c.documentId === p.courseId);
    if (!course) continue; // skip if the course is not found in the progress
    const entry = course.course_chapters
      .flatMap((c) => c.course_chapter_entries)
      .find((e) => e.documentId === p.entryId);
    if (!entry) continue; // skip if the entry is not found in the progress
    entry.completed = true;
    console.debug("Marked entry as completed:", entry);
  }
  // check if the courses are completed fully
  for (const c of $courses) {
    // all the entries must be marked as completed
    const entries = c.course_chapters
      .get()
      .flatMap((c) => c.course_chapter_entries);
    const entriesLength = entries.length;
    const countCompleted = entries.filter((e) => e.completed).length;
    c.completed.set(countCompleted === entriesLength && entriesLength > 0);
    c.started.set(countCompleted > 0);

    // generate links
    let firstIncompleteEntry = c.course_chapters
      .get()
      .flatMap((c) => c.course_chapter_entries)
      .find((e) => !e.completed);
    if (!firstIncompleteEntry) {
      firstIncompleteEntry = c.course_chapters
        .get()
        .flatMap((c) => c.course_chapter_entries)[0];
    }
    // find the chapter that contains the first incomplete entry
    const chapter = c.course_chapters
      .get()
      .find((c) =>
        c.course_chapter_entries
          .flatMap((e) => e.documentId)
          .includes(firstIncompleteEntry?.documentId)
      );
    c.link.set(
      `/courses/${c.documentId.get()}/${chapter?.slug}/${
        firstIncompleteEntry?.slug
      }`
    );
  }
  console.debug("Updated courses with progress:", $courses.get());
  return $courses;
};

export const loadUserProgressSingle = async (
  session: Session | null,
  courseContent: ICoursePageContent
) => {
  let progress = await getProgress(session);
  if (!progress) return courseContent;
  console.debug("Progress:", progress);
  const completed = progress.find(
    (p) => p.entryId === courseContent.documentId
  );
  if (completed) {
    courseContent.completed = true;
    console.debug("Marked entry as completed:", courseContent);
  } else {
    courseContent.completed = false;
  }
  return courseContent;
};
