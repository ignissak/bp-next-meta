"use client";
import { IAPICourse, ICoursePageContent } from "@/lib/types";
import { useObservable } from "@legendapp/state/react";
import CoursePageContent from "./course-content";
import CoursePageNavbar from "./course-navbar";

const CoursePage = ({
  content,
  userId,
  entrySlug,
  courseId,
}: {
  content: { data: IAPICourse };
  userId?: string;
  entrySlug: string;
  courseId: string;
}) => {
  const $entry = useObservable({} as ICoursePageContent);
  const foundEntry = content.data
    .course_chapters!!.flatMap((chapter) => chapter.course_chapter_entries)
    .find((entry) => entry.slug === entrySlug);
  if (!foundEntry) {
    return <></>;
  }
  $entry.set(foundEntry);

  return (
    <main className="mt-6 lg:grid lg:grid-cols-[320px_1fr]">
      <CoursePageNavbar
        content={content}
        courseId={courseId}
        entrySlug={entrySlug}
      ></CoursePageNavbar>
      <CoursePageContent content={$entry.get()}></CoursePageContent>
    </main>
  );
};

export default CoursePage;
