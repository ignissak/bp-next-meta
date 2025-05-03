import { getGlossary } from "@/actions";
import PageHeader from "@/components/ui/page-header";
import { IGlossaryItem } from "@/lib/types";
import GlossaryCatalog from "./glossary-catalog";

const GlossaryPage = async () => {
  const glossary: { data: IGlossaryItem[] } = await getGlossary();

  return (
    <>
      <PageHeader
        title="Glossary"
        subtitle="Explore the terms and definitions in the glossary."
      />
      <main className="content-container-lg w-full">
        <GlossaryCatalog data={glossary.data} />
      </main>
    </>
  );
};

export default GlossaryPage;
