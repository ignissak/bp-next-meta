import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import CourseChapterEntry from "./course-chapter-entry";

interface CourseChapterNavProps {
  chapterTitle: string;
  chapters: {
    title: string;
    type: "study" | "quiz" | "code";
    active: boolean;
    link: string;
  }[];
}

const CourseChapterNav: React.FC<CourseChapterNavProps> = ({
  chapterTitle,
  chapters,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item"
      className="[&:not(:last-child)]:border-b pb-2 border-muted"
    >
      <AccordionItem value="item">
        <AccordionTrigger className="flex-row-reverse justify-end gap-2 pb-2">
          {chapterTitle}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1">
            {chapters.map((chapter, index) => (
              <CourseChapterEntry
                key={index}
                title={chapter.title}
                type={chapter.type}
                active={chapter.active}
                link={chapter.link}
              ></CourseChapterEntry>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseChapterNav;
