import { getResources } from "@/actions"
import PageHeader from "@/components/ui/page-header";
import ResourcesCatalog from "./resources-catalog";

const ResourcesPage = async () => {
  const resources = await getResources();

  return (
    <>
      <PageHeader
        title={"Resources"}
        subtitle={
          "Lorem ipsum dolor sit amet consectetur. Dignissim tellus felis nisl duis quis."
        }
      />
      <main className="content-container-lg w-full">
        <ResourcesCatalog data={resources.data} />
      </main>
    </>
  );
}

export default ResourcesPage;