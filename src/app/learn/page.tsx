import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CourseChapterEntry from "@/components/ui/course-chapter-entry";

const LearnPage = () => {
  return (
    <main className="container mx-auto min-h-screen">
      <section className="pt-16 md:pt-32 pb-8">
        <aside className="max-w-sm border border-red-500/10">
          <h2 className="text-lg font-semibold mb-4">Introduction to AI</h2>
          <section id="course-nav">
            <Accordion type="single" collapsible defaultValue="item">
              <AccordionItem value="item">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 font-medium pb-2">
                  Overview
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    <CourseChapterEntry
                      title="Introduction to Artificial Intelligence"
                      type="study"
                      active={true}
                      link="#"
                    ></CourseChapterEntry>
                    <CourseChapterEntry
                      title="Quiz: Introduction to Artificial Intelligence"
                      type="quiz"
                      active={false}
                      link="#"
                    ></CourseChapterEntry>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default LearnPage;
