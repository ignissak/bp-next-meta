import { getCoursesWithChapters, getUserProgress } from "@/actions";
import { auth } from "@/auth";
import ProgressPage from "@/components/progress-page";
import { Course } from "@/lib/types";
import { Progress } from "@prisma/client";

export const metadata = {
  title: "Your progress",
  description:
    "Track your course progress and resume on specific parts of the course by clicking on their title.",
};

const page = async () => {
  const courses: Partial<Course>[] = await getCoursesWithChapters();
  const session = await auth();
  const userId = session?.user?.id;
  let progress: Partial<Progress>[] | undefined;
  if (userId) {
    progress = await getUserProgress(userId);
  }
  return (
    <>
      <ProgressPage _courses={courses} userId={userId} _progress={progress} />
    </>
  );
};

export default page;
