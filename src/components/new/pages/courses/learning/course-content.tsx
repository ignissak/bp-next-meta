"use client";

import Note from "@/components/note";
import Quiz from "@/components/quiz";
import { ICoursePageContent, ICoursePageContentComponent } from "@/lib/types";
import Markdown from "react-markdown";

const CoursePageContent = ({ content }: { content: ICoursePageContent }) => {
  return (
    <section
      id="course-content"
      className="lg:grid grid-cols-[1fr_760px_1fr] [&>*]:col-start-2 px-6 mb-4"
    >
      {content.dynamic?.map(
        (component: ICoursePageContentComponent, index: number) => (
          <CoursePageContentComponent key={index} data={component} />
        )
      )}
    </section>
  );
};

const CoursePageContentComponent = ({
  data,
}: {
  data: ICoursePageContentComponent;
}) => {
  console.debug(data);
  if (data.__component === "shared.rich-text") {
    return (
      <div className="md">
        <Markdown>{data.body}</Markdown>
      </div>
    );
  } else if (data.__component === "shared.media") {
    return (
      <div className="!col-start-1 col-span-3 lg:px-16 my-4 flex flex-col gap-1 items-center justify-center xl:!col-start-2 xl:col-span-1">
        <img
          src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + data.file?.url!!}
          className="rounded-lg"
        />
        {data.file?.caption && (
          <p className="text-sm text-neutral-600">{data.file.caption}</p>
        )}
      </div>
    );
  } else if (data.__component === "shared.quiz") {
    return (
      <div>
        <Quiz
          title={data.title!!}
          subtitle={data.subtitle}
          type={data.type as "abcd" | "fill"}
          options={data.options!!}
          onComplete={() => {}}
        />
      </div>
    );
  } else if (data.__component === "shared.note") {
    return (
      <div>
        <Note
          title={data.title!!}
          body={data.body!!}
          type={data.type!!}
          icon={data.icon!!}
        />
      </div>
    );
  }
};

export default CoursePageContent;
