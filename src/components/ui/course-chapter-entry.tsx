import { cn } from "@/lib/utils";
import {
  IconAlignJustified,
  IconCode,
  IconCopyCheckFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface CourseChapterEntryProps {
  title: string;
  type: "study" | "quiz" | "code";
  active: boolean;
  link: string;
  className?: string;
}

const CourseChapterEntry: React.FC<CourseChapterEntryProps> = ({
  title,
  type,
  active,
  link,
  className,
}) => {
  return (
    <Link href={link}>
      <div
        data-active={active}
        className={cn(
          "inline-flex items-center gap-2 py-1 pl-6 pr-8 data-[active=true]:bg-border/40 rounded-tr-lg rounded-br-lg group transition-opacity",
          className
        )}
      >
        {type === "study" && (
          <IconAlignJustified
            className="group-hover:opacity-80 transition-opacity"
            size={16}
          />
        )}
        {type === "code" && (
          <IconCode
            className="group-hover:opacity-80 transition-opacity"
            size={16}
          />
        )}
        {type === "quiz" && (
          <IconCopyCheckFilled
            className="group-hover:opacity-80 transition-opacity"
            size={16}
          />
        )}
        <p className="group-hover:opacity-80 transition-opacity">{title}</p>
      </div>
    </Link>
  );
};

export default CourseChapterEntry;
