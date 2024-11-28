import { Metadata } from "next";
import CourseList from "./homepage/course-list";
import { HeroHomepage } from "./homepage/hero";

export const metadata: Metadata = {
  title: "Learn AI",
};

export default function HomePage() {
  return (
    <main className="scroll-smooth">
      <HeroHomepage />
      <CourseList />
    </main>
  );
}
