import GlossaryPage from "@/components/glossary-page";
import prisma from "../../lib/prisma";

export const metadata = {
  title: "Glossary",
  description: "A glossary of terms used in the world of web development.",
};

const Page = async function Page() {
  const glossary = await prisma.glossary.findMany({
    orderBy: {
      term: "asc",
    },
  });
  return (
    <>
      <GlossaryPage glossary={glossary} />
    </>
  );
};

export default Page;
