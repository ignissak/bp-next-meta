"use client";
import { Course } from "@/lib/types";
import ProgressDropdown from "./progress/progress-dropdown";
import ProgressHeading from "./progress/progress-heading";

const ProgressPage = ({ courses }: { courses: Partial<Course>[] }) => {
  return (
    <main className="container mx-auto min-h-screen">
      <section className="pt-16 md:pt-32 pb-8">
        <ProgressHeading />
        {courses.map((course, index) => (
          <ProgressDropdown key={index} index={index} course={course} />
        ))}
      </section>
    </main>
  );
};
export default ProgressPage;
