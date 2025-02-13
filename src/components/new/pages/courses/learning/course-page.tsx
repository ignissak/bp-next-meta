"use client";
import { store$ } from "@/lib/store";
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

    const handleCourseComplete = () => {
      console.debug("Marking course as complete...");
      store$.setProgress(courseId, $entry.documentId.get(), session?.user?.id);
      return true;
    };

    useMountOnce(() => {
      loadEntry();
    });

    if ($loading.get()) return <CoursePageLoading />;
    else if (!$entry.get().slug) return null;

    return (
      <main className="mt-6 lg:grid lg:grid-cols-[320px_1fr]">
        <CoursePageNavbar
          content={content}
          courseId={courseId}
          entrySlug={entrySlug}
        />
        <CoursePageContent
          content={$entry.get()}
          onEntryComplete={handleCourseComplete}
        />
      </main>
    );
  }
);

const CoursePageLoading = () => {
  return (
    <main className="mt-6 lg:grid lg:grid-cols-[320px_1fr]">
      <aside className="hidden lg:block pl-8">
        <div className="h-8 w-full mb-4 bg-neutral-800 animate-pulse rounded-lg"></div>
        <section id="course-nav" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-medium text-neutral-100">
              <div className="h-6 w-3/4 bg-neutral-800 animate-pulse rounded-lg"></div>
            </h4>
            <div className="flex flex-col gap-2">
              <div className="h-6 w-full bg-neutral-800 animate-pulse rounded-lg"></div>
              <div className="h-6 w-full bg-neutral-800 animate-pulse rounded-lg"></div>
              <div className="h-6 w-full bg-neutral-800 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </section>
      </aside>
      <article className="lg:grid grid-cols-[1fr_620px_1fr] lg:grid-cols[1fr_740px_1fr] [&>*]:col-start-2 px-6 mb-4">
        <div className="w-1/2 h-8 bg-neutral-800 animate-pulse rounded-lg mb-4"></div>
        <div className="w-full h-48 bg-neutral-800 animate-pulse rounded-lg"></div>
      </article>
    </main>
  );
};

export default CoursePage;
