import PageHeader from "@/components/ui/page-header";
import prisma from "@/lib/prisma";
import GlossaryCatalog from "./glossary-catalog";

const GlossaryPage = async () => {
  const glossary = await prisma.glossary.findMany({
    orderBy: {
      term: "asc",
    },
  });

  return (
    <>
      <PageHeader
        title="Glossary"
        subtitle="Explore the terms and definitions in the glossary."
      />
      <main className="content-container-lg w-full">
        <GlossaryCatalog data={glossary} />
      </main>
    </>
  );
};

export default GlossaryPage;
