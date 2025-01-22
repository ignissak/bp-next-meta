import PageHeader from "@/components/ui/page-header";
import prisma from "@/lib/prisma";
import GlossaryCatalog from "./glossary/glossary-catalog";

const GlossaryPage = async () => {
  const glossary = await prisma.glossary.findMany({
    orderBy: {
      term: "asc",
    },
  });

  return (
    <>
      <PageHeader
        title={"Glossary"}
        subtitle={
          "Lorem ipsum dolor sit amet consectetur. Dignissim tellus felis nisl duis quis."
        }
      />
      <main className="content-container-lg w-full">
        <GlossaryCatalog data={glossary} />
      </main>
    </>
  );
};

export default GlossaryPage;
