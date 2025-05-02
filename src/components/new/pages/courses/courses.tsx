import { auth } from "@/auth";
import PageHeader from "@/components/ui/page-header";
import CourseCatalog from "./course-catalog";

const CoursesPage = async () => {
  const session = await auth();

  return (
    <>
      <PageHeader
        title="Available Courses"
        subtitle="Explore a variety of courses tailored to your needs."
      />
      <main className="content-container-lg w-full">
        <CourseCatalog session={session} />
      </main>
    </>
  );
};

export default CoursesPage;
