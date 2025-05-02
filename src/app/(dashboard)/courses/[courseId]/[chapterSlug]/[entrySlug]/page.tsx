import { getCourseAllContent } from "@/actions";
import { auth } from "@/auth";
import CoursePage from "@/components/new/pages/courses/learning/course-page";
import { IAPICourse } from "@/lib/types";

const Learn = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterSlug: string; entrySlug: string }>;
}) => {
  const courseId = (await params).courseId;
  const chapterSlug = (await params).chapterSlug;
  const entrySlug = (await params).entrySlug;
  const content: { data: IAPICourse } = await getCourseAllContent(courseId);
  const session = await auth();

  return (
    <CoursePage
      content={content}
      session={session}
      entrySlug={entrySlug}
      courseId={courseId}
    />
  );
};

export default Learn;
