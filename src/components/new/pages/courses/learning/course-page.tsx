"use client";
import { IAPICourse, ICoursePageContent } from "@/lib/types";
import { loadUserProgressSingle } from "@/lib/utils";
import { observer, useMountOnce, useObservable } from "@legendapp/state/react";
import { Session } from "next-auth";
import CoursePageContent from "./course-content";
import CoursePageNavbar from "./course-navbar";

const CoursePage = observer(
  ({
    content,
    session,
    entrySlug,
    courseId,
  }: {
    content: { data: IAPICourse };
    session: Session | null;
    entrySlug: string;
    courseId: string;
  }) => {
    const $entry = useObservable({} as ICoursePageContent);
    const $loading = useObservable(true);

    const loadEntry = async () => {
      content.data.course_chapters
        ?.flatMap((chapter) => chapter.course_chapter_entries)
        .forEach((entry) => {
          if (entry.slug === entrySlug) {
            entry.completed = false;
            const progress = loadProgress(entry);
            $entry.set(progress);
            $loading.set(false);
          }
        });
    };

    const loadProgress = async (entry: ICoursePageContent) => {
      const progress = await loadUserProgressSingle(session, entry);
      if (progress) return progress;
      return entry;
    };

    useMountOnce(() => {
      loadEntry();
    });

    // TODO: Skeleton loader
    if ($loading.get()) return <p>Loading</p>; 
    else if (!$entry.get().slug) return null;

    return (
      <main className="mt-6 lg:grid lg:grid-cols-[320px_1fr]">
        <CoursePageNavbar
          content={content}
          courseId={courseId}
          entrySlug={entrySlug}
        />
        <CoursePageContent content={$entry.get()} />
      </main>
    );
  }
);

export default CoursePage;
