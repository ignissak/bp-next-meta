"use client";
import { getCoursesWithChapters, getUserProgress } from "@/actions";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { store$ } from "@/lib/store";
import { Course } from "@/lib/types";
import {
  observer,
  useMountOnce,
  useObservable,
  useObserveEffect,
} from "@legendapp/state/react";
import { Progress } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { Session } from "next-auth";
import CourseCard from "./course-card";

const CourseCatalog = observer(({ session }: { session: Session | null }) => {
  const $courses = useObservable([] as Course[]);
  const $search = useObservable("");
  const $filtered = useObservable([] as Course[]);
  const { toast } = useToast();

  const loadCourseCatalog = async () => {
    try {
      $courses.set([]);
      $courses.set(await getCoursesWithChapters());
      console.debug("Loaded course catalog", $courses.get());
    } catch (e) {
      console.error(e);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "We couldn't load the course catalog.",
        action: (
          <ToastAction onClick={loadCourseCatalog} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  const loadProgress = async () => {
    // TODO: Implement
    let progress: Partial<Progress>[] = [];
    if (!session?.user) {
      console.debug("No user detected, loading local progress...");
      progress = store$.progress.get();
    } else {
      console.debug("User detected, loading progress from database...");
      progress = await getUserProgress(session.user!!.id!!);
    }
    console.debug("Progress:", progress);
    for (const p of progress) {
      // find entry that matches one from progress, mark it as completed
      const course = $courses.get().find((c) => c.documentId === p.courseId);
      if (!course) continue;
      const entry = course.chapters
        .flatMap((c) => c.course_chapter_entries)
        .find((e) => e.documentId === p.entryId);
      if (!entry) continue;
      entry.completed = true;
      console.debug("Marked entry as completed:", entry);
    }
    // check if the courses are completed fully
    for (const c of $courses) {
      // all the entries must be marked as completed
      const entries = c.chapters.get().flatMap((c) => c.course_chapter_entries);
      const countCompleted = entries.filter((e) => e.completed).length;
      c.completed.set(countCompleted === entries.length && entries.length > 0);
      c.started.set(countCompleted > 0);

      // generate links
      let firstIncompleteEntry = c.chapters
        .get()
        .flatMap((c) => c.course_chapter_entries)
        .find((e) => !e.completed);
      if (!firstIncompleteEntry) {
        firstIncompleteEntry = c.chapters
          .get()
          .flatMap((c) => c.course_chapter_entries)[0];
      }
      // find the chapter that contains the first incomplete entry
      const chapter = c.chapters
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

    $filtered.set($courses.get());
  };

  useObserveEffect($search, () => {
    $filtered.set(
      $courses
        .get()
        .filter(
          (course) =>
            course.title.toLowerCase().includes($search.get().toLowerCase()) ||
            course.description
              .toLowerCase()
              .includes($search.get().toLowerCase())
        )
    );
  });

  useMountOnce(() => {
    loadCourseCatalog();
    loadProgress();
  });

  return (
    <>
      <section className="flex flex-col gap-6 mb-6">
        <div id="catalogSearch" className="relative">
          <Input
            id="search"
            type="text"
            className="w-full pl-9"
            placeholder="Search the catalog..."
            onChange={(e) => {
              $search.set(e.target.value);
            }}
          />
          <IconSearch className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 select-none opacity-50" />
        </div>
        <motion.div id="catalog" className="flex flex-col gap-6">
          <AnimatePresence>
            {$filtered.map((course, index) => (
              <CourseCard course={course.get()} key={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
});

export default CourseCatalog;
