"use client";
import { store$ } from "@/lib/store";
import { Course } from "@/lib/types";
import { observer, useObservable } from "@legendapp/state/react";
import { Progress } from "@prisma/client";
import { useEffect } from "react";
import ProgressDropdown from "./progress/progress-dropdown";
import ProgressHeading from "./progress/progress-heading";
import { Button } from "./ui/button";

const ProgressPage = observer(
  ({
    _courses,
    _progress,
  }: {
    _courses: Partial<Course>[];
    userId?: string;
    _progress?: Partial<Progress>[];
  }) => {
    let courses$ = useObservable(_courses);
    let progress: Partial<Progress>[] = store$.progress.get();
    if (_progress) {
      // DB progress
      progress = _progress;
    }

    useEffect(() => {
      courses$.map((course) => {
        if (!course.chapters) return course;
        course.chapters.map((chapter) => {
          chapter.completed.set(
            progress.some((p) => p.entryId === chapter.documentId.get())
          );
          return chapter;
        });
        console.log(course.chapters.get());
        return course;
      });
    }, [progress]);

    return (
      <main className="container mx-auto min-h-screen">
        <section className="pt-16 md:pt-32 pb-8">
          {/* <Button
            onClick={async () => {
              await store$.setProgress(
                "jenm3vn2xjj22kq88hcf51ov",
                "lq95xqgqoj1nrtbzi9z923dp"
              );
              console.log(store$.progress.get());
            }}
          >
            Insert first progress
          </Button> */}
          <ProgressHeading />
          {courses$.map((course, index) => (
            <ProgressDropdown key={index} index={index} course={course} />
          ))}
        </section>
      </main>
    );
  }
);
export default ProgressPage;
