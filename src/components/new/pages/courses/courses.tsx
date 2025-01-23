import { auth } from "@/auth";
import PageHeader from "@/components/ui/page-header";
import CourseCatalog from "./course-catalog";

const CoursesPage = async () => {
  const session = await auth();

  return (
    <>
      <PageHeader
        title={"Course catalog"}
        subtitle="Lorem ipsum dolor sit amet consectetur. Dignissim tellus felis nisl duis quis."
      />
      <main className="content-container-lg w-full">
        <CourseCatalog session={session} />
      </main>
    </>
  );
};

export default CoursesPage;
