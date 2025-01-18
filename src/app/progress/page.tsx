import { auth } from "@/auth";
import ProgressPage from "@/components/progress-page";
import { store$ } from "@/lib/store";
import { Course } from "@/lib/types";

export const metadata = {
  title: "Your progress",
  description:
    "Track your course progress and resume on specific parts of the course by clicking on their title.",
};

const page = async () => {
  const courses: Partial<Course>[] = store$.getCourses.get();
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <>
      <ProgressPage courses={courses} />
    </>
  );
};

export default page;
