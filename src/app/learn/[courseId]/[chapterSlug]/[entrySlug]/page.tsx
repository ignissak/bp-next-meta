import { getCourseAllContent } from "@/actions";
import { auth } from "@/auth";
import LearnPage from "@/components/learn-page";

const LearnEntryPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterSlug: string; entrySlug: string }>;
}) => {
  const courseId = (await params).courseId;
  const chapterSlug = (await params).chapterSlug;
  const entrySlug = (await params).entrySlug;
  const content = await getCourseAllContent(courseId);
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <>
      <LearnPage
        courseId={courseId}
        chapterSlug={chapterSlug}
        entrySlug={entrySlug}
        content={content}
        userId={userId}
      />
    </>
  );
};

export default LearnEntryPage;
