"use client";
import { store$ } from "@/lib/store";
import { Course } from "@/lib/types";
import { observer } from "@legendapp/state/react";
import ProgressDropdown from "./progress/progress-dropdown";
import ProgressHeading from "./progress/progress-heading";
import { Button } from "./ui/button";

const ProgressPage = observer(({ courses }: { courses: Partial<Course>[] }) => {
  return (
    <main className="container mx-auto min-h-screen">
      <section className="pt-16 md:pt-32 pb-8">
        <Button onClick={async () => {
          await store$.setProgress("jenm3vn2xjj22kq88hcf51ov", "lq95xqgqoj1nrtbzi9z923dp")
          console.log((await store$.getProgress()).get())
        }}
        >Insert first progress</Button>
        <ProgressHeading />
        {courses.map((course, index) => (
          <ProgressDropdown key={index} index={index} course={course} />
        ))}
      </section>
    </main>
  );
});
export default ProgressPage;
