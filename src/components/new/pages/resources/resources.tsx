import { getResources } from "@/actions";
import PageHeader from "@/components/ui/page-header";
import ResourcesCatalog from "./resources-catalog";

const ResourcesPage = async () => {
  const resources = await getResources();

  return (
    <>
      <PageHeader
        title="Resources"
        subtitle="Explore a curated list of resources to help you stay in the loop or learn something new."
      />
      <main className="content-container-lg w-full">
        <ResourcesCatalog data={resources.data} />
      </main>
    </>
  );
};

export default ResourcesPage;
