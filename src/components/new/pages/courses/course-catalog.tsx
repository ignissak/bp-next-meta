"use client";
import { getCoursesWithChapters } from "@/actions";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@/lib/types";
import {
  observer,
  useMountOnce,
  useObservable,
  useObserveEffect,
} from "@legendapp/state/react";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import CourseCard from "./course-card";

const CourseCatalog = observer(() => {
  const $courses = useObservable([] as Course[]);
  const $search = useObservable("");
  const $filtered = useObservable([] as Course[]);
  const { toast } = useToast();

  const loadCourseCatalog = async () => {
    try {
      $courses.set([]);
      $courses.set(await getCoursesWithChapters());
      $filtered.set($courses.get());
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
