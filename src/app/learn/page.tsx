import Alert from "@/components/ui/alert";
import CourseChapterNav from "@/components/ui/course-chapter-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconAlignLeft2, IconChecks } from "@tabler/icons-react";

const LearnPage = () => {
  return (
    <main className="container mx-auto min-h-screen">
      <section className="pt-16 md:pt-32 pb-8 flex flex-col lg:flex-row gap-8">
        <aside className="max-w-80 w-full">
          <h2 className="text-lg font-semibold">Introduction to AI</h2>
          <section id="course-nav" className="hidden lg:block">
            <CourseChapterNav
              chapterTitle="Overview"
              chapters={[
                {
                  title: "Introduction to Artificial Intelligence",
                  type: "study",
                  active: true,
                  link: "#",
                },
              ]}
            />
            <CourseChapterNav
              chapterTitle="Introduction to Machine Learning"
              chapters={[
                {
                  title: "What is Machine Learning?",
                  type: "study",
                  active: false,
                  link: "#",
                },
                {
                  title: "Supervised learning",
                  type: "study",
                  active: false,
                  link: "#",
                },
              ]}
            />
            <CourseChapterNav
              chapterTitle="Conclusion"
              chapters={[
                {
                  title: "Test your understanding",
                  type: "quiz",
                  active: false,
                  link: "#",
                },
              ]}
            />
          </section>
          <Sheet>
            <SheetTrigger className="lg:hidden mt-4 flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-200">
              <IconAlignLeft2 />
              <span className="font-medium">Browse content</span>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left">Introduction to AI</SheetTitle>
              </SheetHeader>
              <div>
                <CourseChapterNav
                  chapterTitle="Overview"
                  chapters={[
                    {
                      title: "Introduction to Artificial Intelligence",
                      type: "study",
                      active: true,
                      link: "#",
                    },
                  ]}
                />
                <CourseChapterNav
                  chapterTitle="Introduction to Machine Learning"
                  chapters={[
                    {
                      title: "What is Machine Learning?",
                      type: "study",
                      active: false,
                      link: "#",
                    },
                    {
                      title: "Supervised learning",
                      type: "study",
                      active: false,
                      link: "#",
                    },
                  ]}
                />
                <CourseChapterNav
                  chapterTitle="Conclusion"
                  chapters={[
                    {
                      title: "Test your understanding",
                      type: "quiz",
                      active: false,
                      link: "#",
                    },
                  ]}
                />
              </div>
            </SheetContent>
          </Sheet>
        </aside>
        <section id="course-content" className="">
          <h2 className="text-lg font-semibold mb-4">
            Welcome to Artificial Intelligence
          </h2>
          <p>
            Occaecat reprehenderit ad labore dolor esse proident ea pariatur non
            mollit duis. Commodo qui ipsum cupidatat est esse magna velit.
            Incididunt nisi consectetur consequat nulla. Officia exercitation
            eiusmod quis fugiat eu quis veniam.
            <br />
            Fugiat reprehenderit esse consequat voluptate proident dolore
            proident adipisicing. In duis aute ad commodo. Ea deserunt est
            pariatur sit anim in enim ullamco dolor. Adipisicing aliqua
            exercitation commodo anim eu amet elit voluptate duis voluptate
            occaecat anim incididunt veniam. Ipsum laboris consequat voluptate
            magna est. Incididunt qui consequat commodo officia. Et voluptate in
            nulla culpa cillum non culpa elit sint aute ipsum exercitation minim
            ea.
          </p>
          <Alert type="red">
            <Alert.Title className="flex items-center gap-2">
              <IconChecks size={24} />
              Requirements
            </Alert.Title>
            <Alert.Content>
              <p>
                Lorem ipsum dolor sit amet consectetur. Elit lorem vitae cras
                odio. At varius faucibus vel in orci. Viverra orci luctus
                pellentesque quis dapibus in. Massa cursus elit elit elit id
                iaculis faucibus nibh viverra.
              </p>
            </Alert.Content>
          </Alert>
        </section>
      </section>
    </main>
  );
};

export default LearnPage;
