import PageHeader from "@/components/ui/page-header";
import CourseCatalog from "./courses/course-catalog";

const CoursesPage = () => {
  return (
    <>
      <PageHeader
        title={"Course catalog"}
        subtitle="Lorem ipsum dolor sit amet consectetur. Dignissim tellus felis nisl duis quis."
      />
      <main className="content-container-lg w-full">
        <CourseCatalog />
      </main>
    </>
  );
};

export default CoursesPage;
