"use client";
import { cn } from "@/lib/utils";
import {
  IconAlignJustified,
  IconCode,
  IconCopyCheckFilled,
} from "@tabler/icons-react";
import Link from "next/link";

const CoursePageNavbar = ({
  content,
  courseId,
  entrySlug,
}: {
  content: any;
  courseId: string;
  entrySlug: string;
}) => {
  return (
    <aside className="hidden lg:block sticky top-[calc(8.5rem)] overflow-y-auto pl-8 h-[calc(100vh-9.5rem)]">
      <h3 className="text-lg font-semibold mb-4">{content.data.title}</h3>
      <section id="course-nav" className="flex flex-col gap-4">
        {content.data.course_chapters.map((chapter: any) => (
          <CoursePageChapterNav
            key={chapter.documentId}
            chapterTitle={chapter.title}
            chapters={chapter.course_chapter_entries.map((entry: any) => {
              return {
                title: entry.title,
                type: entry.type,
                link: `/courses/${courseId}/${chapter.slug}/${entry.slug}`,
                active: entry.slug === entrySlug,
              };
            })}
          />
        ))}
      </section>
    </aside>
  );
};

const CoursePageChapterNav = ({
  chapterTitle,
  chapters,
}: {
  chapterTitle: string;
  chapters: any;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h4 className="text-base font-medium text-neutral-100">
          {chapterTitle}
        </h4>
        {chapters.map((chapter: any, index: number) => (
          <CoursePageChapterNavEntry
            key={index}
            title={chapter.title}
            type={chapter.type}
            active={chapter.active}
            link={chapter.link}
          ></CoursePageChapterNavEntry>
        ))}
      </div>
    </>
  );
};

const CoursePageChapterNavEntry = ({
  title,
  type,
  active,
  link,
  className,
}: {
  title: string;
  type: string;
  active: boolean;
  link: string;
  className?: string;
}) => {
  return (
    <Link
      href={link}
      data-active={active}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-neutral-400 data-[active=true]:bg-neutral-900 data-[active=true]:text-neutral-100 group transition-all hover:text-neutral-100 duration-200",
        className
      )}
    >
      {type === "study" && (
        <IconAlignJustified className="flex-shrink-0 flex-grow-0" size={16} />
      )}
      {type === "code" && (
        <IconCode className="flex-shrink-0 flex-grow-0" size={16} />
      )}
      {type === "quiz" && (
        <IconCopyCheckFilled className="flex-shrink-0 flex-grow-0" size={16} />
      )}
      <span className="text-sm">{title}</span>
    </Link>
  );
};

export default CoursePageNavbar;
