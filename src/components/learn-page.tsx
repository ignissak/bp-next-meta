"use client";

import { toast } from "@/hooks/use-toast";
import { store$ } from "@/lib/store";
import {
  observer,
  useObservable,
  useObserveEffect,
} from "@legendapp/state/react";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Quiz from "./quiz";
import CourseChapterNav from "./ui/course-chapter-nav";
import { ToastAction } from "./ui/toast";

const LearnPage = observer(
  ({
    courseId,
    chapterSlug,
    entrySlug,
    content,
    userId,
  }: {
    courseId: string;
    chapterSlug: string;
    entrySlug: string;
    content: any;
    userId?: string;
  }) => {
    const router = useRouter();
    try {
      if (content.error?.status === 404) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "We couldn't find this course.",
          action: (
            <ToastAction onClick={() => router.push("/")} altText="Go home">
              Go home
            </ToastAction>
          ),
        });
        return (
          <>
            <main className="container mx-auto min-h-screen">
              <section className="pt-16 md:pt-32 pb-8 text-center">
                <h1 className="font-bold text-3xl text-glow mb-1">404</h1>
                <p>Could not find what you are looking for.</p>
              </section>
            </main>
          </>
        );
      }
    } catch (e) {
      console.error(e);
    }

    console.debug(content);
    const entry = useObservable({} as any);
    entry.set(
      content.data.course_chapters
        .find((chapter: any) => chapter.slug === chapterSlug)
        ?.course_chapter_entries.find((entry: any) => entry.slug === entrySlug)
    );
    console.debug(entry.get());

    const quizesIds: number[] = entry.dynamic
      .get()
      .filter((comp: any) => comp.__component === "shared.quiz")
      .map((comp: any) => comp.id);
    let quizesComplete = useObservable([] as number[]);

    useObserveEffect(quizesComplete, (val) => {
      console.log(val.value, quizesIds.toSorted());
      if (val.value?.values().every((id) => quizesIds.includes(id))) {
        console.log("All quizes complete");
        toast({
          title: "Congratulations!",
          description: "You have completed all quizes in this chapter.",
        });
        // TODO: Add progress
        store$.setProgress(courseId, entry.documentId, userId);
      }
    });

    return (
      <>
        <main className="container relative mx-auto min-h-screen">
          <section className="pt-16 md:pt-32 pb-8 flex flex-col lg:flex-row gap-8">
            <aside className="max-w-80 w-full">
              <h2 className="text-lg font-semibold">{content.data.title}</h2>
              <section id="course-nav" className="hidden lg:block">
                {content.data.course_chapters.map((chapter: any) => (
                  <CourseChapterNav
                    chapterTitle={chapter.title}
                    key={chapter.documentId}
                    chapters={chapter.course_chapter_entries.map(
                      (entry: any) => {
                        return {
                          title: entry.title,
                          type: entry.type,
                          link: `/learn/${courseId}/${chapter.slug}/${entry.slug}`,
                          active: entry.slug === entrySlug,
                        };
                      }
                    )}
                  />
                ))}
              </section>
            </aside>
            <section id="course-content" className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">{entry.title.get()}</h2>
              {entry.dynamic.get().map((comp: any) => {
                if (comp.__component === "shared.rich-text") {
                  return (
                    <div key={comp.id}>
                      <Markdown rehypePlugins={[rehypeHighlight]}>
                        {comp.body}
                      </Markdown>
                    </div>
                  );
                } else if (comp.__component === "shared.media") {
                  if (!comp.file) return <></>;
                  return (
                    <div key={comp.id}>
                      <img
                        src={
                          process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL +
                          comp.file.url
                        }
                      ></img>
                    </div>
                  );
                } else if (comp.__component === "shared.quiz") {
                  return (
                    <div key={comp.id}>
                      <Quiz
                        id={comp.id}
                        title={comp.title}
                        subtitle={comp.subtitle}
                        type={comp.type}
                        options={comp.options}
                        onComplete={() => {
                          quizesComplete.set([
                            ...quizesComplete.get(),
                            comp.id,
                          ]);
                          console.log(quizesComplete.get());
                        }}
                      />
                    </div>
                  );
                }
                return <></>;
              })}
            </section>
          </section>
        </main>
      </>
    );
  }
);

export default LearnPage;
